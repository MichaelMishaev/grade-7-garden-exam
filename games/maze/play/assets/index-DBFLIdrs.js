(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Ku(n){const e=new Set(["1,1","15,1","4,9","13,11","4,5","11,5","12,9","3,3","7,1","9,3","1,7","5,11","9,11","15,7","1,7","2,7","3,7","19,3","20,3","21,3","19,7","21,11","15,15","17,11","21,3","9,15","19,11","10,5","12,5","13,5","11,9","13,9","14,9","15,9"]);function t(i){const r=n.map(u=>[...u]),s=[];let a=i;const o=()=>(a=a*1664525+1013904223>>>0,a/4294967296);for(let u=1;u<r.length-1;u++)for(let h=1;h<r[0].length-1;h++)s.push({x:h,y:u,rank:o()});s.sort((u,h)=>u.rank-h.rank);const l=({x:u,y:h})=>[[u-1,h],[u+1,h],[u,h-1],[u,h+1]].filter(([_,M])=>{var m;return((m=r[M])==null?void 0:m[_])&&r[M][_]!=="#"});let c=0;for(const u of s)c<14&&r[u.y][u.x]==="#"&&l(u).length>=2&&(r[u.y][u.x]=".",c++);const f=()=>{const u=[{x:1,y:1}],h=new Set(["1,1"]);for(let _=0;_<u.length;_++)for(const[M,m]of l(u[_]))h.has(`${M},${m}`)||(h.add(`${M},${m}`),u.push({x:M,y:m}));return r.flat().filter(_=>_!=="#").length===h.size};let d=0;for(const{x:u,y:h}of s)d<14&&r[h][u]==="."&&!e.has(`${u},${h}`)&&(r[h][u]="#",f()?d++:r[h][u]=".");return r.map(u=>u.join(""))}return[{id:"classic",title:"מבוך הצללים",tiles:n},{id:"moon",title:"מבוך אור הירח",tiles:t(2718)},{id:"ember",title:"מבוך הגחלים",tiles:t(6283)}]}const Rn=[{id:"scout",kind:"human",name:"אורי · סייר השבילים",title:"סייר השבילים",actionLabel:"לדבר עם אורי",x:3,y:7,path:[{x:3,y:7},{x:2,y:7},{x:1,y:7},{x:2,y:7}]},{id:"keeper",kind:"human",name:"מיה · שומרת הגן",title:"שומרת הגן",actionLabel:"לדבר עם מיה",x:19,y:3,path:[{x:19,y:3},{x:20,y:3},{x:21,y:3},{x:20,y:3}]},{id:"fox",kind:"fox",name:"שועל הגן",title:"שועל הגן",actionLabel:"להתקרב לשועל",x:19,y:7},{id:"rabbit",kind:"rabbit",name:"ארנב בין השיחים",title:"ארנב בין השיחים",actionLabel:"להתקרב בשקט",x:21,y:11},{id:"owl",kind:"owl",name:"ינשוף החורבות",title:"ינשוף החורבות",actionLabel:"להביט בינשוף",x:15,y:15},{id:"pump",kind:"pump",name:"משאבת הגן",title:"משאבת הגן",actionLabel:"למלא את קערת המים",x:17,y:11},{id:"lamp",kind:"lamp",name:"פנס הגן",title:"פנס הגן",actionLabel:"להדליק את הפנס",x:21,y:3},{id:"bench",kind:"bench",name:"ספסל בין החורבות",title:"ספסל בין החורבות",actionLabel:"לנוח לרגע",x:9,y:15}],Gr={x:19,y:11},ql=["scoutGuided","lightsOn","waterFilled","foxFollowing","foxDrinking","rabbitCalm","rabbitFed","rabbitFollowing","owlObserved","benchRested","playerResting"],Ho=(n,e)=>n.x===e.x&&n.y===e.y,cs=n=>n&&Number.isInteger(n.x)&&Number.isInteger(n.y)&&n.x>=1&&n.x<=21&&n.y>=1&&n.y<=15,Zu=n=>JSON.parse(JSON.stringify(n));function Hr(){return{version:1,...Object.fromEntries(ql.map(n=>[n,!1])),interactions:{},dialogue:null,fox:{x:19,y:7,previous:{x:19,y:7},startedMs:0},foxMoveMs:0,rabbit:{x:21,y:11,previous:{x:21,y:11},startedMs:0},rabbitMoveMs:0}}function Ju(n,e=()=>!0,t=1/0){var r;const i=Hr();if(!n||n.version!==1)return i;for(const s of ql)i[s]=n[s]===!0;for(const s of Rn)((r=n.interactions)==null?void 0:r[s.id])===1&&(i.interactions[s.id]=1);return cs(n.fox)&&e(n.fox.x,n.fox.y)&&(i.fox={x:n.fox.x,y:n.fox.y,previous:cs(n.fox.previous)&&e(n.fox.previous.x,n.fox.previous.y)&&Math.abs(n.fox.previous.x-n.fox.x)+Math.abs(n.fox.previous.y-n.fox.y)<=1?{...n.fox.previous}:{x:n.fox.x,y:n.fox.y},startedMs:Number.isFinite(n.fox.startedMs)&&n.fox.startedMs>=0&&n.fox.startedMs<1e12&&n.fox.startedMs<=t?n.fox.startedMs:0}),i.foxMoveMs=Number.isFinite(n.foxMoveMs)&&n.foxMoveMs>=0&&n.foxMoveMs<1e12&&n.foxMoveMs<=t?n.foxMoveMs:0,cs(n.rabbit)&&e(n.rabbit.x,n.rabbit.y)&&(i.rabbit={x:n.rabbit.x,y:n.rabbit.y,previous:cs(n.rabbit.previous)&&e(n.rabbit.previous.x,n.rabbit.previous.y)&&Math.abs(n.rabbit.previous.x-n.rabbit.x)+Math.abs(n.rabbit.previous.y-n.rabbit.y)<=1?{...n.rabbit.previous}:{x:n.rabbit.x,y:n.rabbit.y},startedMs:Number.isFinite(n.rabbit.startedMs)&&n.rabbit.startedMs>=0&&n.rabbit.startedMs<1e12&&n.rabbit.startedMs<=t?n.rabbit.startedMs:0}),i.rabbitMoveMs=Number.isFinite(n.rabbitMoveMs)&&n.rabbitMoveMs>=0&&n.rabbitMoveMs<1e12&&n.rabbitMoveMs<=t?n.rabbitMoveMs:0,i.rabbitFollowing=i.rabbitFollowing&&i.rabbitFed,i.rabbitCalm=i.rabbitCalm||i.rabbitFed,i.foxFollowing=i.foxFollowing&&i.waterFilled,i.foxDrinking=i.waterFilled&&!i.foxFollowing&&Ho(i.fox,Gr),i}function Ai(n,e=0,t=Hr()){var i;if(n.id==="fox"||n.id==="rabbit"){const r=t[n.id]||Hr()[n.id],s=r.previous||r,a=Math.max(0,Math.min(1,(e-r.startedMs)/(n.id==="rabbit"?420:550)));return{x:s.x+(r.x-s.x)*a,y:s.y+(r.y-s.y)*a,heading:Math.atan2(r.x-s.x,r.y-s.y),moving:a<1&&!Ho(s,r)}}if((i=n.path)!=null&&i.length){const r=Math.floor(e/2400)%n.path.length,s=n.path[r],a=n.path[(r+1)%n.path.length],o=e%2400/2400;return{x:s.x+(a.x-s.x)*o,y:s.y+(a.y-s.y)*o,heading:Math.atan2(a.x-s.x,a.y-s.y),moving:!0}}return{x:n.x,y:n.y,heading:0,moving:!1}}function Wo(n,e,t=0){var i;return!n||!Number.isFinite(n.x)||!Number.isFinite(n.y)?null:((i=Rn.map(r=>({entity:r,position:Ai(r,t,e)})).map(r=>({...r,distance:Math.abs(r.position.x-n.x)+Math.abs(r.position.y-n.y)})).filter(r=>r.distance<=1.5).sort((r,s)=>r.distance-s.distance)[0])==null?void 0:i.entity)||null}function Qu(n,e,t,i=0,r="approach"){if(r!=="approach"&&!(r==="feed"&&e==="rabbit"))return null;const s=Rn.find(c=>c.id===e);if(!s||!t||!Number.isFinite(t.x)||!Number.isFinite(t.y))return null;const a=Ai(s,i,n);if(Math.abs(a.x-t.x)+Math.abs(a.y-t.y)>1.5)return null;const o=Zu(n);o.interactions[s.id]=1;let l;return s.id==="scout"?(o.scoutGuided=!0,l="שלושה חותמים, ומלכודות קצרות של עד שלוש שאלות. שביל הגן מתחבר לחורבות מדרום — אפשר להקיף ולחזור. סימנתי את הדרך ביומן שלכם."):s.id==="keeper"?(o.lightsOn=!0,l="טוב שהגעתם. הדלקתי בשבילכם את פנסי הגן. ליד החורבות יש משאבה וקערת מים — השועל יעריך את זה."):s.id==="pump"?(o.waterFilled=!0,l="המשאבה זורמת וקערת המים התמלאה. השועל מתקדם אליה בשבילי הגן."):s.id==="fox"?o.waterFilled?(o.foxFollowing=!0,o.foxDrinking=!1,l="השועל מזהה שעזרתם למלא מים, ומתקרב כדי ללכת אתכם. הוא יישאר על השבילים, במרחק בטוח."):l="השועל מרחרח את האוויר ומביט לכיוון המשאבה. נראה שהוא מחפש מים.":s.id==="rabbit"?(o.rabbitCalm=!0,r==="feed"?(o.rabbitFed=!0,o.rabbitFollowing=!0,l="הארנב מכרסם את הגזר. עכשיו יש לכם חבר לדרך — הוא ילך אחריכם בשביל!"):l=o.rabbitFed?"הארנב מזהה אתכם ומזיז את האוזניים. הוא ממשיך ללוות אתכם בשביל.":"הארנב מתקרב ומרים את האוזניים. לתת לו גזר?"):s.id==="owl"?(o.owlObserved=!0,l="הינשוף מסובב את ראשו אל המעבר הצפוני של החורבות. הדרך חוזרת למבוך — זו אינה דרך ללא מוצא."):s.id==="lamp"?(o.lightsOn=!0,l="הפנס נדלק, ואור חם מתפשט לאורך שבילי הגן."):(o.benchRested=!0,o.playerResting=!0,l="רגע שקט בין החורבות. שום התקדמות לא אבדה. אפשר לקום ולהמשיך בכל רגע."),o.dialogue={entityId:s.id,title:s.name,text:l},{world:o,notice:l,entity:s}}function ed(n,e,t){if(!n||!e)return n;if(e.type==="move")return n.playerResting?{...n,playerResting:!1}:n;if(e.type!=="tick"||!Number.isFinite(e.elapsedMs)||typeof t!="function")return n;const i=n.foxFollowing?e.player:n.waterFilled?Gr:null;if(!i)return n;const r={x:n.fox.x,y:n.fox.y},s=t(r,i);if(!s)return n;const a=n.foxFollowing?1:0;if(s.length<=a){const l=n.waterFilled&&!n.foxFollowing&&Ho(r,Gr);return l===n.foxDrinking?n:{...n,foxDrinking:l}}if(e.elapsedMs-n.foxMoveMs<650)return n;const o=s[0];return{...n,foxDrinking:!1,foxMoveMs:e.elapsedMs,fox:{...o,previous:r,startedMs:e.elapsedMs}}}function Rc(n,e,t){const i=ed(n,e,t);if(!i||(e==null?void 0:e.type)!=="tick"||!Number.isFinite(e.elapsedMs)||typeof t!="function"||!i.rabbitFollowing||!i.rabbitFed||!e.player)return i;const r=i.rabbit||Hr().rabbit,s={x:r.x,y:r.y},a=t(s,e.player);return!a||a.length<=1||e.elapsedMs-(i.rabbitMoveMs||0)<480?i:{...i,rabbitMoveMs:e.elapsedMs,rabbit:{...a[0],previous:s,startedMs:e.elapsedMs}}}const td=["#######################","#S..#.....#....X#.....#","#.#.#.###.#.###.#.###.#","#.#...#...#...........#","#.#####.#####.#.#.#.#.#","#...A...#..B..#.#.#...#","###.#.###.#.###.#.###.#","#...#.....#...........#","#.#######.#####.#.#.#.#","#...C...#...G...#.#...#","#.###.#.###.#.#.#.###.#","#.....#.....#T........#","###.#####.#####.#.###.#","#.....#.....#.........#","#.###.#.###.#.#####.#.#","#.....................#","#######################"],ci=Ku(td);let Lt=ci[0].tiles,$l="classic";function Or(n="classic"){const e=ci.find(t=>t.id===n);if(!e)throw new Error("Unknown maze layout");return Lt=e.tiles,$l=e.id,e}const sn={x:1,y:1},rr={x:15,y:1},Ga={x:4,y:9},Ha={x:13,y:11},ui=[{id:"floor",x:4,y:5,kind:"floor",title:"רצפת הסודות"},{id:"cage",x:11,y:5,kind:"cage",title:"כלוב הצללים"},{id:"guardian",x:12,y:9,kind:"guardian",title:"שומר החותם"}],nd=[{id:"embers",x:3,y:3,kind:"floor",title:"גשר הגחלים"},{id:"echo",x:7,y:1,kind:"cage",title:"מסדרון ההד"},{id:"whisper",x:9,y:3,kind:"guardian",title:"שער הלחישות"},{id:"runes",x:1,y:7,kind:"floor",title:"אבני הרונות"},{id:"well",x:5,y:11,kind:"cage",title:"באר הצללים"},{id:"arch",x:9,y:11,kind:"guardian",title:"קשת הסודות"},{id:"vault",x:15,y:7,kind:"cage",title:"חדר הכספת"}],Xo=[...ui,...nd];function wi(n){return Xo.slice(0,Math.max(3,Math.ceil(n.length/3)))}function Yl(n){const e=wi(n);return Object.fromEntries(e.map((t,i)=>[t.id,n.filter((r,s)=>Math.min(e.length-1,Math.floor(s*e.length/n.length))===i)]))}const qo=[{id:"prowler",kind:"shadow",encounter:"cage",path:[{x:10,y:5},{x:11,y:5},{x:12,y:5},{x:13,y:5}]},{id:"warden",kind:"guardian",encounter:"guardian",path:[{x:11,y:9},{x:12,y:9},{x:13,y:9},{x:14,y:9},{x:15,y:9}]}],jl=n=>n.id==="warden"?1900:1600;function Kl(n,e=0){var r;if(!((r=n==null?void 0:n.path)!=null&&r.length))return null;const t=n.path.length;if(t===1)return{...n.path[0]};const i=Math.floor(Math.max(0,e)/jl(n))%(t*2-2);return{...n.path[i<t?i:t*2-2-i]}}const id=new Set(["explore","question","feedback","capture","review","review-feedback","complete"]),Zl=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}],Jl=n=>JSON.parse(JSON.stringify(n)),Ji=(n,e)=>n.x===e.x&&n.y===e.y,Cc=(n,e)=>Math.abs(n.x-e.x)+Math.abs(n.y-e.y),hr=(n,e)=>Object.hasOwn(n.answers,e),Ql=n=>JSON.stringify(n.map(e=>[e.id,e.prompt,e.choices,e.correct,e.difficulty,e.explanation,e.ref])),Pc=(n,e)=>{const t=[...n];for(let i=t.length-1;i>0;i--){const r=Math.floor(e()*(i+1));[t[i],t[r]]=[t[r],t[i]]}return t},ln=(n,e)=>{var t;return Number.isInteger(n)&&Number.isInteger(e)&&!!((t=Lt[e])!=null&&t[n])&&Lt[e][n]!=="#"};function Bs(n,e){if(!n||!e||!ln(n.x,n.y)||!ln(e.x,e.y))return null;const t=[{...n,path:[]}],i=new Set([`${n.x},${n.y}`]);for(let r=0;r<t.length;r++){const s=t[r];if(Ji(s,e))return s.path;for(const a of Zl){const o={x:s.x+a.x,y:s.y+a.y},l=`${o.x},${o.y}`;ln(o.x,o.y)&&!i.has(l)&&(i.add(l),t.push({...o,path:[...s.path,o]}))}}return null}function eu(n){if(!Array.isArray(n)||n.length<1||n.length>30||new Set(n.map(e=>e.id)).size!==n.length||n.some(e=>typeof e.id!="string"||!Array.isArray(e.choices)||e.choices.length<2||!Number.isInteger(e.correct)||e.correct<0||e.correct>=e.choices.length))throw new Error("Invalid maze question content")}const js=(n,e)=>n.assignments[e]||[],$o=n=>js(n,n.activeEncounter).find(e=>!hr(n,e)),Ks=(n,e)=>js(n,e).every(t=>hr(n,t));function Yo(n){n.resolved=Xo.filter(e=>Object.hasOwn(n.assignments,e.id)&&Ks(n,e.id)).map(e=>e.id),n.sealProofs||(n.sealProofs={});for(const e of ui)n.resolved.includes(e.id)&&!Object.hasOwn(n.sealProofs,e.id)&&(n.sealProofs[e.id]=[...js(n,e.id)]);n.seals=ui.filter(e=>n.seals.includes(e.id)||n.resolved.includes(e.id)).map(e=>e.id)}function rd(n,e){var o;const t=Object.fromEntries(ui.map((l,c)=>[l.id,n.order.filter((f,d)=>Math.min(2,Math.floor(d*3/n.order.length))===c)])),i=(l,c)=>Array.isArray(l)&&l.length===c.length&&l.every((f,d)=>f===c[d]),r=l=>e.assignments&&Object.keys(e.assignments).length===Object.keys(l).length&&Object.entries(l).every(([c,f])=>i(e.assignments[c],f)),s=r(t),a=r(n.assignments);n.seals=[],n.sealProofs={};for(const l of ui){if(!Array.isArray(e.seals)||!e.seals.includes(l.id))continue;const c=(o=e.sealProofs)==null?void 0:o[l.id],f=t[l.id],d=js(n,l.id);let u=null;i(c,f)||i(c,d)?u=c:s?u=f:a&&(u=d),u&&u.every(h=>hr(n,h))&&(n.seals.push(l.id),n.sealProofs[l.id]=[...u])}}function sd(n,e){const t=new Set([...Xo,...qo.flatMap(o=>o.path)].map(o=>`${o.x},${o.y}`)),i=o=>o&&ln(o.x,o.y)&&!t.has(`${o.x},${o.y}`),r=n&&ln(n.x,n.y)?n:e,s=r?[{...r}]:[],a=new Set;for(let o=0;o<s.length;o++){const l=s[o],c=`${l.x},${l.y}`;if(!a.has(c)){if(a.add(c),i(l))return l;for(const f of Zl){const d={x:l.x+f.x,y:l.y+f.y};ln(d.x,d.y)&&!a.has(`${d.x},${d.y}`)&&s.push(d)}}}if(i(e))return{...e};throw new Error("No reachable recovery tile")}function ls(n,e){Ks(n,e.id)||(n.activeEncounter=e.id,n.phase="question",n.notice=null)}function Lc(n,e=n.elapsedMs,t=n.elapsedMs){if(n.phase!=="explore"||n.graceMs>t-e)return null;const i=e+n.graceMs;let r=null;for(const s of qo){const a=ui.find(l=>l.id===s.encounter);if(Ks(n,a.id))continue;const o=jl(s);for(let l=Math.floor(i/o);l<=Math.floor(t/o);l++){const c=Math.max(i,l*o);Ji(n.player,Kl(s,c))&&(!r||c<r.time)&&(r={room:a,time:c})}}return r}function Wa(n,e){const t=n.order.filter(r=>{var s;return((s=n.answers[r])==null?void 0:s.correct)===!1&&e.some(a=>a.id===r)}),i=t.length?[t.at(-1),t.length>1?t.at(-2):t[0]]:[];n.review={ids:i,index:0,wrong:0,hint:0,correct:null,guided:i.length===0},n.phase="review"}function ad(n){n.hearts=3,n.player=sd(n.capturePosition||n.player,n.checkpoint),n.checkpoint={...n.player},n.graceMs=5e3,n.phase="explore",n.activeEncounter=null,n.review=null,n.captureMs=0,n.notice="הצלחתם להשתחרר! ההתקדמות נשמרה. אפשר להמשיך מאותה מלכודת."}function Jr(n,e=Math.random){eu(n);const t=Pc(n.map(s=>s.id),e),i=Yl(t),r={version:1,layoutId:$l,giftsSeen:[],contentKey:Ql(n),order:t,choiceOrders:Object.fromEntries(n.map(s=>[s.id,Pc(s.choices.map((a,o)=>o),e)])),assignments:i,world:Hr(),phase:"explore",paused:!1,player:{...sn},checkpoint:{...sn},hearts:3,coins:0,seals:[],sealProofs:{},resolved:[],answers:{},activeEncounter:null,lastAnswer:null,review:null,capturePosition:null,captureMs:0,captureCount:0,graceMs:0,elapsedMs:0,clues:[],treasureCollected:!1,visited:[`${sn.x},${sn.y}`],notice:null};return Yo(r),r}function wn(n,e){var r,s;const t=n.phase==="review"||n.phase==="review-feedback"?(r=n.review)==null?void 0:r.ids[n.review.index]:n.phase==="feedback"?(s=n.lastAnswer)==null?void 0:s.id:$o(n),i=e.find(a=>a.id===t);return i?{...i,options:(n.choiceOrders[t]||i.choices.map((a,o)=>o)).map(a=>({text:i.choices[a],original:a}))}:null}function sr(n,e){const t={easy:1,medium:1.5,hard:2},i=e.reduce((a,o)=>a+(t[o.difficulty]||1.5),0),r=e.reduce((a,o)=>{var l;return a+((l=n.answers[o.id])!=null&&l.correct?t[o.difficulty]||1.5:0)},0),s=e.filter(a=>hr(n,a.id)).length;return{answered:s,total:e.length,trapsResolved:wi(e).filter(a=>n.resolved.includes(a.id)).length,trapsTotal:wi(e).length,correct:e.filter(a=>{var o;return(o=n.answers[a.id])==null?void 0:o.correct}).length,score:i?Math.round(r/i*100):0,complete:s===e.length&&n.seals.length===3}}function tu(n,e,t){var r;if(!n||!e||typeof e.type!="string")return n;if(e.type==="pause")return n.paused||n.phase==="complete"?n:{...n,paused:!0};if(e.type==="collect-gift"){const s=e.id;return n.resolved.includes(s)&&!n.giftsSeen.includes(s)?{...n,giftsSeen:[...n.giftsSeen,s]}:n}if(e.type==="resume")return n.paused?{...n,paused:!1}:n;if(n.paused||n.phase==="complete")return n;const i=Jl(n);if(e.type==="world-interact"&&i.phase==="explore"){const s=Qu(i.world,e.entityId,i.player,i.elapsedMs,e.intent);return s?(i.world=s.world,i.notice=s.notice,i):n}if(e.type==="tick"){if(!Number.isFinite(e.ms)||e.ms<=0)return n;const s=Math.min(e.ms,6e4);if(i.phase==="explore"){const a=e.moving===!0?null:Lc(i,i.elapsedMs,i.elapsedMs+s);i.elapsedMs=a?a.time:i.elapsedMs+s,i.graceMs=a?0:Math.max(0,i.graceMs-s),i.world=Rc(i.world,{type:"tick",elapsedMs:i.elapsedMs,player:i.player},Bs),a&&ls(i,a.room)}else if(i.phase==="capture")i.captureMs+=s,i.captureMs>=3e3&&Wa(i,t);else return n;return i}if(e.type==="skip-capture"&&i.phase==="capture")return Wa(i,t),i;if(e.type==="move"&&i.phase==="explore"){if(!Number.isInteger(e.dx)||!Number.isInteger(e.dy)||Math.abs(e.dx)+Math.abs(e.dy)!==1)return n;const s={x:i.player.x+e.dx,y:i.player.y+e.dy};if(!ln(s.x,s.y))return n;i.checkpoint={...i.player},i.player=s,i.notice=null,i.world=Rc(i.world,{type:"move",player:i.player},Bs);const a=`${s.x},${s.y}`;i.visited.includes(a)||i.visited.push(a),Ji(s,Ga)&&!i.clues.includes("route")&&(i.clues.push("route"),i.notice="חריטה על הקיר: שלושה חותמים והשלמת המלכודות פותחים את השער. גם אחרי טעות, הדרך נשארת פתוחה."),Ji(s,Ha)&&!i.treasureCollected&&(i.treasureCollected=!0,i.notice="מצאתם חדר אוצר סודי! התיבה שומרת אור לדרך חזרה.");const o=wi(t).find(l=>Ji(l,s));if(o&&ls(i,o),i.phase==="explore"&&i.graceMs===0){const l=Lc(i);l&&ls(i,l.room)}return Ji(s,rr)&&(sr(i,t).complete?i.phase="complete":i.notice="כדי לפתוח את השער, אספו את שלושת החותמים והשלימו את המלכודות. לא צריך לענות נכון על הכול."),i}if(e.type==="interact"&&i.phase==="explore"){const s=wi(t).find(a=>Cc(a,i.player)<=1&&!Ks(i,a.id));return s?(ls(i,s),i):Cc(i.player,rr)<=1?(sr(i,t).complete?i.phase="complete":i.notice="השער מחכה לשלושת החותמים ולהשלמת המלכודות. אפשר לטעות ולהמשיך.",i):n}if(e.type==="answer"&&i.phase==="question"){const s=wn(i,t);if(!s||hr(i,s.id)||!Number.isInteger(e.choice)||e.choice<0||e.choice>=s.choices.length)return n;const a=e.choice===s.correct;return i.answers[s.id]={choice:e.choice,correct:a},i.lastAnswer={id:s.id,choice:e.choice,correct:a},a?i.coins+=10:i.hearts=Math.max(0,i.hearts-1),Yo(i),i.hearts===0?(i.phase="capture",i.capturePosition={...i.player},i.captureMs=0,i.captureCount+=1):i.phase="feedback",i}if(e.type==="continue"&&i.phase==="feedback")return $o(i)?i.phase="question":(i.phase="explore",i.activeEncounter=null,i.notice="החותם שלכם. הדרך פתוחה — ממשיכים לחקור!"),i;if(e.type==="review-answer"&&i.phase==="review"){const s=wn(i,t);return!s||i.review.guided||!Number.isInteger(e.choice)||e.choice<0||e.choice>=s.choices.length?n:(i.review.correct=e.choice===s.correct,i.review.correct||(i.review.wrong+=1,i.review.hint=Math.min(2,i.review.wrong)),i.phase="review-feedback",i)}return(e.type==="continue"||e.type==="guided-continue")&&(i.phase==="review-feedback"||i.phase==="review"&&((r=i.review)!=null&&r.guided))?(i.review.guided||i.review.correct||i.review.wrong>=2?i.review.guided||i.review.index===1?ad(i):(i.review.index+=1,i.review.wrong=0,i.review.hint=0,i.review.correct=null,i.phase="review"):(i.review.correct=null,i.phase="review"),i):n}function nu(n,e){var t;try{eu(e);const i=typeof n=="string"?JSON.parse(n):Jl(n);if(!i||i.version!==1||i.contentKey!==Ql(e)||!Array.isArray(i.order)||i.order.length!==e.length||new Set(i.order).size!==e.length||i.order.some(a=>!e.some(o=>o.id===a)))return null;Or(i.layoutId||"classic");const r=Jr(e,()=>.999999);Number.isInteger(i.completionArt)&&i.completionArt>=0&&i.completionArt<3&&(r.completionArt=i.completionArt),r.order=i.order,r.assignments=Yl(r.order),r.choiceOrders={};for(const a of e){const o=(t=i.choiceOrders)==null?void 0:t[a.id];r.choiceOrders[a.id]=Array.isArray(o)&&o.length===a.choices.length&&new Set(o).size===o.length&&o.every(l=>Number.isInteger(l)&&l>=0&&l<o.length)?o:a.choices.map((l,c)=>c)}if(!i.answers||typeof i.answers!="object"||Array.isArray(i.answers))return null;r.answers={};for(const[a,o]of Object.entries(i.answers)){const l=e.find(c=>c.id===a);if(!l||!Number.isInteger(o==null?void 0:o.choice)||o.choice<0||o.choice>=l.choices.length)return null;r.answers[a]={choice:o.choice,correct:o.choice===l.correct}}const s=a=>a&&ln(a.x,a.y);if(r.player=s(i.player)?i.player:s(i.checkpoint)?i.checkpoint:{...sn},r.checkpoint=s(i.checkpoint)?i.checkpoint:{...sn},r.hearts=Number.isInteger(i.hearts)?Math.min(3,Math.max(0,i.hearts)):3,r.coins=Object.values(r.answers).filter(a=>a.correct).length*10,r.clues=Array.isArray(i.clues)&&i.clues.includes("route")?["route"]:[],r.treasureCollected=i.treasureCollected===!0,r.visited=Array.isArray(i.visited)?[...new Set(i.visited.filter(a=>typeof a=="string"&&/^\d+,\d+$/.test(a)&&ln(...a.split(",").map(Number))))]:[],r.visited.includes(`${r.player.x},${r.player.y}`)||r.visited.push(`${r.player.x},${r.player.y}`),r.elapsedMs=Number.isFinite(i.elapsedMs)&&i.elapsedMs>=0&&i.elapsedMs<=Number.MAX_SAFE_INTEGER?i.elapsedMs:0,r.world=Ju(i.world,ln,r.elapsedMs),r.graceMs=Number.isFinite(i.graceMs)?Math.max(0,Math.min(5e3,i.graceMs)):0,r.captureCount=Number.isInteger(i.captureCount)&&i.captureCount>=0?i.captureCount:0,r.capturePosition=s(i.capturePosition)?i.capturePosition:{...r.player},r.captureMs=Number.isFinite(i.captureMs)?Math.max(0,Math.min(3e3,i.captureMs)):0,r.phase=id.has(i.phase)?i.phase:"explore",r.paused=i.paused===!0,r.activeEncounter=wi(e).some(a=>a.id===i.activeEncounter)?i.activeEncounter:null,r.lastAnswer=i.lastAnswer&&hr(r,i.lastAnswer.id)?{id:i.lastAnswer.id,...r.answers[i.lastAnswer.id]}:null,rd(r,i),Yo(r),r.giftsSeen=Array.isArray(i.giftsSeen)?[...new Set(i.giftsSeen.filter(a=>r.resolved.includes(a)))]:[...r.resolved],r.phase==="complete"&&!sr(r,e).complete&&(r.phase="explore"),r.phase==="question"&&!$o(r)&&(r.phase="explore",r.activeEncounter=null),r.phase==="feedback"&&!r.lastAnswer&&(r.phase="explore",r.activeEncounter=null),(r.phase==="capture"||r.phase==="review"||r.phase==="review-feedback"||r.hearts===0&&r.phase!=="complete")&&r.phase!=="capture"){Wa(r,e);const a=i.review;Array.isArray(a==null?void 0:a.ids)&&a.ids.length===2&&a.ids.every(l=>{var c;return((c=r.answers[l])==null?void 0:c.correct)===!1})&&(r.review.ids=a.ids,r.review.index=a.index===1?1:0,r.review.wrong=Number.isInteger(a.wrong)?Math.max(0,Math.min(2,a.wrong)):0,r.review.hint=r.review.wrong,r.review.correct=a.correct===!0?!0:a.correct===!1?!1:null,i.phase==="review-feedback"&&r.review.correct!==null&&(r.phase="review-feedback"))}return r}catch{return null}}const Zs={quizzes:[{id:"facts",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"עובדה או דעה?",description:"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"facts-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"„בפעילות השתתפו שלוש כיתות.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק כמה כיתות השתתפו בפעילות.",en:"The number of participating classes can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.",en:"“More interesting” is a personal judgment, so this is an opinion."},ref:{id:"garden-passage",part:"פסקה 3"}},{id:"facts-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק אילו צמחים נשתלו בגינה.",en:"The plants in the garden can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.",en:"“The best” is a personal evaluation, not a defined measurable fact here."},ref:{id:"garden-passage",part:null}},{id:"facts-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק את לוח ההשקיה של הכיתות.",en:"The class watering schedule can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"„לדעתי, הפעילות בגינה נהדרת.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.",en:"The word “in my opinion” clearly signals an opinion."},ref:{id:"garden-passage",part:null}}]},{id:"questions",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"מילות שאלה",description:"בוחרים את מילת השאלה המתאימה למידע שמחפשים.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"questions-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?",choices:["מתי","מי","כמה"],correct:0,explanation:{he:"„מתי” מבקשת זמן או מועד.",en:"“When” asks about a time or date."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?",choices:["כיצד","כמה","היכן"],correct:1,explanation:{he:"„כמה” מבקשת מספר או כמות.",en:"“How many” asks for a number or quantity."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?",choices:["מדוע","מתי","מי"],correct:0,explanation:{he:"„מדוע” מבקשת סיבה: למה עשו זאת?",en:"“Why” asks for the reason something happened."},ref:{id:"garden-passage",part:"פסקה 2"}},{id:"questions-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?",choices:["כמה","היכן","כיצד"],correct:1,explanation:{he:"„היכן” מבקשת מקום.",en:"“Where” asks about a place."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?",choices:["כיצד","מתי","מי"],correct:0,explanation:{he:"„כיצד” מבקשת דרך או אופן פעולה.",en:"“How” asks about the way something was done."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?",choices:["היכן","מי","מדוע"],correct:1,explanation:{he:"„מי” מבקשת לזהות אדם.",en:"“Who” asks which person did something."},ref:{id:"garden-passage",part:"פסקה 3"}}]},{id:"instructions",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"מבינים הוראות",description:"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"instructions-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?",choices:["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],correct:0,explanation:{he:"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.",en:"“Copy” means use the wording from the passage."},ref:{id:"garden-passage",part:null}},{id:"instructions-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?",choices:["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],correct:1,explanation:{he:"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.",en:"“Justify” asks for a reason or evidence."},ref:{id:"garden-passage",part:null}},{id:"instructions-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?",choices:["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],correct:0,explanation:{he:"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.",en:"“State” usually asks for the requested detail briefly."},ref:{id:"garden-passage",part:null}},{id:"instructions-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „הסבירו”. מה צריך לעשות?",choices:["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],correct:1,explanation:{he:"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.",en:"“Explain” asks for details about how or why."},ref:{id:"garden-passage",part:null}},{id:"instructions-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?",choices:["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],correct:1,explanation:{he:"שאלה מלאה כוללת מילת שאלה ומשפט שלם.",en:"A full question includes a question word and a complete sentence."},ref:{id:"garden-passage",part:null}},{id:"instructions-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?",choices:["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],correct:1,explanation:{he:"צריך לציין מה חושבים ולתת סיבה אחת לפחות.",en:"State your view and give at least one supporting reason."},ref:{id:"garden-passage",part:null}}]},{id:"physics-basics",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מדידה ושיטות מדידה",description:"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-basics-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"מה חייבים לציין בתוצאת מדידה?",choices:["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],correct:0,explanation:{he:"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?",choices:["ישירה","עקיפה","לא מדידה"],correct:0,explanation:{he:"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?",choices:["ישירה","עקיפה","הערכה ללא מדידה"],correct:1,explanation:{he:"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איך מחשבים עובי ממוצע של דף בערימה?",choices:["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],correct:0,explanation:{he:"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?",choices:["0.1 מ״מ","1 מ״מ","10 מ״מ"],correct:0,explanation:{he:"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"למה כדאי למדוד ערימה של דפים מאותו סוג?",choices:["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],correct:0,explanation:{he:"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"מהי מדידה?",choices:["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],correct:0,explanation:{he:"מדידה משווה גודל ליחידת מידה מוסכמת.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"מה מתאים לתיאור אורך עיפרון?",choices:["14 ס״מ","14 בלבד","ס״מ בלבד"],correct:0,explanation:{he:"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"איזו פעולה היא מדידה עקיפה?",choices:["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],correct:0,explanation:{he:"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?",choices:["0.1 מ״מ","10 מ״מ","1 מ״מ"],correct:0,explanation:{he:"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"למה מודדים ערימת דפים בלי הכריכה?",choices:["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],correct:0,explanation:{he:"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}}]},{id:"physics-units",subject_id:"physics",exam_id:"physics-v1-assessment",title:"המרת יחידות אורך",description:"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-units-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים יש במטר אחד?",choices:["10","100","1,000"],correct:1,explanation:{he:"מטר אחד שווה ל־100 סנטימטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"כמה מילימטרים יש בסנטימטר אחד?",choices:["10","100","1,000"],correct:0,explanation:{he:"סנטימטר אחד שווה ל־10 מילימטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"כמה מטרים יש ב־2 קילומטרים?",choices:["200","2,000","20,000"],correct:1,explanation:{he:"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים הם 2.4 מטרים?",choices:["24","240","2,400"],correct:1,explanation:{he:"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"כמה מטרים הם 350 סנטימטרים?",choices:["3.5","35","0.35"],correct:0,explanation:{he:"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"כמה הם מטר אחד ועוד 25 ס״מ?",choices:["1.25 מטרים","26 מטרים","1.025 מטרים"],correct:0,explanation:{he:"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"כמה מילימטרים הם 3 ס״מ?",choices:["30 מ״מ","3 מ״מ","300 מ״מ"],correct:0,explanation:{he:"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים הם 12 מ״מ?",choices:["1.2 ס״מ","12 ס״מ","120 ס״מ"],correct:0,explanation:{he:"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"כמה קילומטרים הם 1,500 מטרים?",choices:["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],correct:0,explanation:{he:"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"מה ארוך יותר: 90 ס״מ או מטר אחד?",choices:["מטר אחד","90 ס״מ","הם שווים"],correct:0,explanation:{he:"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?",choices:["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],correct:0,explanation:{he:"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}}]},{id:"physics-precision",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מודדים נכון",description:"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-precision-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"מאיזו נקודה בסרגל מתחילים למדוד אורך?",choices:["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],correct:0,explanation:{he:"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?",choices:["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],correct:0,explanation:{he:"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?",choices:["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],correct:0,explanation:{he:"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזה כלי מתאים יותר למדידת אורך של חדר?",choices:["סרט מדידה","סרגל קצר בלבד","שעון"],correct:0,explanation:{he:"סרט מדידה מתאים יותר לאורכו של חדר.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"מה מאפשרות שנתות קטנות יותר על כלי מדידה?",choices:["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],correct:0,explanation:{he:"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"מדוע חוזרים על מדידה?",choices:["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],correct:0,explanation:{he:"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?",choices:["6 ס״מ","9 ס״מ","12 ס״מ"],correct:0,explanation:{he:"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"למה לא תמיד מתחילים למדוד מקצה הסרגל?",choices:["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],correct:0,explanation:{he:"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"איזה כלי מתאים למדידת אורך של עיפרון?",choices:["סרגל עם שנתות קטנות","שעון עצר","מדחום"],correct:0,explanation:{he:"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"מה חזרה על מדידה אינה מתקנת בהכרח?",choices:["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],correct:0,explanation:{he:"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"מה כדאי לבדוק לפני שרושמים תוצאה?",choices:["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],correct:0,explanation:{he:"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}}]},{id:"physics-pole",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מודדים גובה של עמוד",description:"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-pole-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?",choices:["45°","90°","180°"],correct:0,explanation:{he:"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"מה שווה למרחק האופקי לעמוד בשיטת 45°?",choices:["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],correct:0,explanation:{he:"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?",choices:["7.4 מטרים","6 מטרים","4.6 מטרים"],correct:0,explanation:{he:"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזה מרחק מודדים לצורך החישוב?",choices:["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],correct:0,explanation:{he:"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"איזה גובה מוסיפים למרחק האופקי?",choices:["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],correct:0,explanation:{he:"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"איזה תנאי נדרש לשיטה המתוארת?",choices:["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],correct:0,explanation:{he:"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?",choices:["5.5 מטרים","4 מטרים","2.5 מטרים"],correct:0,explanation:{he:"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?",choices:["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],correct:0,explanation:{he:"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"מהו תפקיד המשולש בעל זווית 45°?",choices:["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],correct:0,explanation:{he:"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?",choices:["5 מטרים","10 מטרים","2.5 מטרים"],correct:0,explanation:{he:"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"למה זו מדידה עקיפה?",choices:["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],correct:0,explanation:{he:"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}}]}]},zs="facts",Wr=Zs.quizzes.map(({id:n,title:e,subject_id:t,questions:i})=>({id:n,title:e,subjectId:t,count:i.length})),Dc={easy:1,medium:1.5,hard:2},Ic=n=>typeof n=="string"&&/^[a-z0-9-]+$/.test(n);function od(n){var t;if(typeof n!="string"||!n.trim())throw new Error("Invalid reference URL");const e=new URL(n,`${((t=globalThis.location)==null?void 0:t.origin)||"https://prepx.invalid"}/`);if(!["https:","http:"].includes(e.protocol))throw new Error("Invalid reference URL");return e.href}function ks(n,{source:e=(n==null?void 0:n.source)||"snapshot",pinned:t=!1}={}){const i=Wr.find(c=>c.id===(n==null?void 0:n.id));if(!i||typeof n.title!="string"||!n.title.trim()||!Array.isArray(n.questions)||(t?n.questions.length<1||n.questions.length>30:n.questions.length!==i.count)||!Array.isArray(n.references))throw new Error("Invalid maze content");const r=n.references.map(c=>{if(!Ic(c.id)||typeof c.title!="string")throw new Error("Invalid question reference");return{...c,url:od(c.url)}});if(new Set(r.map(c=>c.id)).size!==r.length)throw new Error("Duplicate reference");const s=n.questions.map(c=>{var u,h;const f=r.find(_=>{var M;return _.id===((M=c.ref)==null?void 0:M.id)});if(!Ic(c.id)||c.type!=="mcq"||typeof c.prompt!="string"||!c.prompt.trim()||!Array.isArray(c.choices)||c.choices.length<2||c.choices.length>8||c.choices.some(_=>typeof _!="string"||!_.trim())||!Number.isInteger(c.correct)||c.correct<0||c.correct>=c.choices.length||typeof((u=c.explanation)==null?void 0:u.he)!="string"||!c.explanation.he.trim()||!f||!(c.ref.part===null||typeof c.ref.part=="string"))throw new Error("Invalid practice question");if(c.ref.part&&!((h=f.parts)!=null&&h.some(_=>_.part===c.ref.part)))throw new Error("Unknown reference part");const d=Object.hasOwn(Dc,c.difficulty)?c.difficulty:"medium";return{id:c.id,type:"mcq",prompt:c.prompt,choices:[...c.choices],correct:c.correct,difficulty:d,weight:Dc[d],topic:c.topic||null,explanation:{he:c.explanation.he,en:typeof c.explanation.en=="string"?c.explanation.en:""},ref:{id:c.ref.id,part:c.ref.part},reference:{id:f.id,title:f.title,url:f.url,part:c.ref.part}}});if(new Set(s.map(c=>c.id)).size!==s.length)throw new Error("Duplicate question");const a={id:n.id,title:n.title,description:typeof n.description=="string"?n.description:"",subjectId:n.subject_id||n.subjectId||i.subjectId,questions:s,references:r,source:e==="live"?"live":"snapshot",offline:e!=="live"};let o=2166136261;const l=JSON.stringify(s.map(({id:c,prompt:f,choices:d,correct:u,difficulty:h,explanation:_,ref:M})=>({id:c,prompt:f,choices:d,correct:u,difficulty:h,explanation:_,ref:M})));for(const c of l)o=Math.imul(o^c.charCodeAt(0),16777619);return{...a,version:`maze-v1-${(o>>>0).toString(16)}`}}async function Js({quizId:n=zs,fetchImpl:e=globalThis.fetch}={}){const t=Zs.quizzes.find(s=>s.id===n);if(!t)throw new Error("Unknown maze quiz");const i=new AbortController;let r;try{const s=new Promise((l,c)=>{r=setTimeout(()=>{i.abort(),c(new Error("Content timeout"))},2500)}),a=await Promise.race([Promise.resolve().then(()=>{var l;return e(new URL(`/api/quizzes/${encodeURIComponent(n)}`,`${((l=globalThis.location)==null?void 0:l.origin)||"https://prepx.invalid"}/`).href,{signal:i.signal,credentials:"omit"})}),s]);if(!a.ok)throw new Error("Content unavailable");const o=await Promise.race([a.json(),s]);if((o==null?void 0:o.id)!==n)throw new Error("Content mismatch");return ks(o,{source:"live"})}catch{return ks(t,{source:"snapshot"})}finally{clearTimeout(r)}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jo="181",cd=0,Uc=1,ld=2,iu=1,ud=2,Vn=3,di=0,tn=1,Gn=2,Wn=0,er=1,Nc=2,Fc=3,Oc=4,dd=5,Si=100,fd=101,hd=102,pd=103,md=104,xd=200,gd=201,_d=202,vd=203,Xa=204,qa=205,Md=206,bd=207,yd=208,Sd=209,Ed=210,Td=211,Ad=212,wd=213,Rd=214,$a=0,Ya=1,ja=2,ar=3,Ka=4,Za=5,Ja=6,Qa=7,ru=0,Cd=1,Pd=2,li=0,Ld=1,Dd=2,Id=3,su=4,Ud=5,Nd=6,Fd=7,au=300,or=301,cr=302,eo=303,to=304,Qs=306,no=1e3,Hn=1001,io=1002,un=1003,Od=1004,us=1005,hn=1006,ca=1007,Ti=1008,Cn=1009,ou=1010,cu=1011,Xr=1012,Ko=1013,Ri=1014,En=1015,pr=1016,Zo=1017,Jo=1018,qr=1020,lu=35902,uu=35899,du=1021,fu=1022,vn=1023,$r=1026,Yr=1027,Qo=1028,ec=1029,tc=1030,nc=1031,ic=1033,Ds=33776,Is=33777,Us=33778,Ns=33779,ro=35840,so=35841,ao=35842,oo=35843,co=36196,lo=37492,uo=37496,fo=37808,ho=37809,po=37810,mo=37811,xo=37812,go=37813,_o=37814,vo=37815,Mo=37816,bo=37817,yo=37818,So=37819,Eo=37820,To=37821,Ao=36492,wo=36494,Ro=36495,Co=36283,Po=36284,Lo=36285,Do=36286,Bd=3200,zd=3201,hu=0,kd=1,ai="",an="srgb",lr="srgb-linear",Vs="linear",mt="srgb",Ni=7680,Bc=519,Vd=512,Gd=513,Hd=514,pu=515,Wd=516,Xd=517,qd=518,$d=519,zc=35044,kc="300 es",Tn=2e3,Gs=2001;function mu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Hs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Yd(){const n=Hs("canvas");return n.style.display="block",n}const Vc={};function Gc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ve(...n){const e="THREE."+n.shift();console.warn(e,...n)}function Et(...n){const e="THREE."+n.shift();console.error(e,...n)}function jr(...n){const e=n.join(" ");e in Vc||(Vc[e]=!0,Ve(...n))}function jd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}class mr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hc=1234567;const Br=Math.PI/180,ur=180/Math.PI;function xr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function Je(n,e,t){return Math.max(e,Math.min(t,n))}function rc(n,e){return(n%e+e)%e}function Kd(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Zd(n,e,t){return n!==e?(t-n)/(e-n):0}function zr(n,e,t){return(1-t)*n+t*e}function Jd(n,e,t,i){return zr(n,e,1-Math.exp(-t*i))}function Qd(n,e=1){return e-Math.abs(rc(n,e*2)-e)}function ef(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function tf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function nf(n,e){return n+Math.floor(Math.random()*(e-n+1))}function rf(n,e){return n+Math.random()*(e-n)}function sf(n){return n*(.5-Math.random())}function af(n){n!==void 0&&(Hc=n);let e=Hc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function of(n){return n*Br}function cf(n){return n*ur}function lf(n){return(n&n-1)===0&&n!==0}function uf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function df(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ff(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),f=a((e+i)/2),d=s((e-i)/2),u=a((e-i)/2),h=s((i-e)/2),_=a((i-e)/2);switch(r){case"XYX":n.set(o*f,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*f,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*f,o*c);break;case"XZX":n.set(o*f,l*_,l*h,o*c);break;case"YXY":n.set(l*h,o*f,l*_,o*c);break;case"ZYZ":n.set(l*_,l*h,o*f,o*c);break;default:Ve("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Zi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function jt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ds={DEG2RAD:Br,RAD2DEG:ur,generateUUID:xr,clamp:Je,euclideanModulo:rc,mapLinear:Kd,inverseLerp:Zd,lerp:zr,damp:Jd,pingpong:Qd,smoothstep:ef,smootherstep:tf,randInt:nf,randFloat:rf,randFloatSpread:sf,seededRandom:af,degToRad:of,radToDeg:cf,isPowerOfTwo:lf,ceilPowerOfTwo:uf,floorPowerOfTwo:df,setQuaternionFromProperEuler:ff,normalize:jt,denormalize:Zi};class Ye{constructor(e=0,t=0){Ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],d=i[r+3],u=s[a+0],h=s[a+1],_=s[a+2],M=s[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=f,e[t+3]=d;return}if(o>=1){e[t+0]=u,e[t+1]=h,e[t+2]=_,e[t+3]=M;return}if(d!==M||l!==u||c!==h||f!==_){let m=l*u+c*h+f*_+d*M;m<0&&(u=-u,h=-h,_=-_,M=-M,m=-m);let p=1-o;if(m<.9995){const y=Math.acos(m),E=Math.sin(y);p=Math.sin(p*y)/E,o=Math.sin(o*y)/E,l=l*p+u*o,c=c*p+h*o,f=f*p+_*o,d=d*p+M*o}else{l=l*p+u*o,c=c*p+h*o,f=f*p+_*o,d=d*p+M*o;const y=1/Math.sqrt(l*l+c*c+f*f+d*d);l*=y,c*=y,f*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=f,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],d=s[a],u=s[a+1],h=s[a+2],_=s[a+3];return e[t]=o*_+f*d+l*h-c*u,e[t+1]=l*_+f*u+c*d-o*h,e[t+2]=c*_+f*h+o*u-l*d,e[t+3]=f*_-o*d-l*u-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),d=o(s/2),u=l(i/2),h=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=u*f*d+c*h*_,this._y=c*h*d-u*f*_,this._z=c*f*_+u*h*d,this._w=c*f*d-u*h*_;break;case"YXZ":this._x=u*f*d+c*h*_,this._y=c*h*d-u*f*_,this._z=c*f*_-u*h*d,this._w=c*f*d+u*h*_;break;case"ZXY":this._x=u*f*d-c*h*_,this._y=c*h*d+u*f*_,this._z=c*f*_+u*h*d,this._w=c*f*d-u*h*_;break;case"ZYX":this._x=u*f*d-c*h*_,this._y=c*h*d+u*f*_,this._z=c*f*_-u*h*d,this._w=c*f*d+u*h*_;break;case"YZX":this._x=u*f*d+c*h*_,this._y=c*h*d+u*f*_,this._z=c*f*_-u*h*d,this._w=c*f*d-u*h*_;break;case"XZY":this._x=u*f*d-c*h*_,this._y=c*h*d-u*f*_,this._z=c*f*_+u*h*d,this._w=c*f*d+u*h*_;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],f=t[6],d=t[10],u=i+o+d;if(u>0){const h=.5/Math.sqrt(u+1);this._w=.25/h,this._x=(f-l)*h,this._y=(s-c)*h,this._z=(a-r)*h}else if(i>o&&i>d){const h=2*Math.sqrt(1+i-o-d);this._w=(f-l)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-i-d);this._w=(s-c)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(l+f)/h}else{const h=2*Math.sqrt(1+d-i-o);this._w=(a-r)/h,this._x=(s+c)/h,this._y=(l+f)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,f=t._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,t=Math.sin(t*c)/f,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,i=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+l*c+a*d-o*f,this.y=i+l*f+o*c-s*d,this.z=r+l*d+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return la.copy(this).projectOnVector(e),this.sub(la)}reflect(e){return this.sub(la.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const la=new k,Wc=new Qr;class He{constructor(e,t,i,r,s,a,o,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=t,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],d=i[7],u=i[2],h=i[5],_=i[8],M=r[0],m=r[3],p=r[6],y=r[1],E=r[4],T=r[7],C=r[2],S=r[5],D=r[8];return s[0]=a*M+o*y+l*C,s[3]=a*m+o*E+l*S,s[6]=a*p+o*T+l*D,s[1]=c*M+f*y+d*C,s[4]=c*m+f*E+d*S,s[7]=c*p+f*T+d*D,s[2]=u*M+h*y+_*C,s[5]=u*m+h*E+_*S,s[8]=u*p+h*T+_*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return t*a*f-t*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],d=f*a-o*c,u=o*l-f*s,h=c*s-a*l,_=t*d+i*u+r*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return e[0]=d*M,e[1]=(r*c-f*i)*M,e[2]=(o*i-r*a)*M,e[3]=u*M,e[4]=(f*t-r*l)*M,e[5]=(r*s-o*t)*M,e[6]=h*M,e[7]=(i*l-c*t)*M,e[8]=(a*t-i*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ua.makeScale(e,t)),this}rotate(e){return this.premultiply(ua.makeRotation(-e)),this}translate(e,t){return this.premultiply(ua.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ua=new He,Xc=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qc=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hf(){const n={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===mt&&(r.r=Xn(r.r),r.g=Xn(r.g),r.b=Xn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(r.r=tr(r.r),r.g=tr(r.g),r.b=tr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ai?Vs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return jr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return jr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[lr]:{primaries:e,whitePoint:i,transfer:Vs,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:i,transfer:mt,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),n}const st=hf();function Xn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function tr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Fi;class pf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Fi===void 0&&(Fi=Hs("canvas")),Fi.width=e.width,Fi.height=e.height;const r=Fi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Fi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Xn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Xn(t[i]/255)*255):t[i]=Xn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mf=0;class sc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=xr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(da(r[a].image)):s.push(da(r[a]))}else s=da(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function da(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?pf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let xf=0;const fa=new k;class Zt extends mr{constructor(e=Zt.DEFAULT_IMAGE,t=Zt.DEFAULT_MAPPING,i=Hn,r=Hn,s=hn,a=Ti,o=vn,l=Cn,c=Zt.DEFAULT_ANISOTROPY,f=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=xr(),this.name="",this.source=new sc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fa).x}get height(){return this.source.getSize(fa).y}get depth(){return this.source.getSize(fa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==au)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case no:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case io:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case no:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case io:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=au;Zt.DEFAULT_ANISOTROPY=1;class xt{constructor(e=0,t=0,i=0,r=1){xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],f=l[4],d=l[8],u=l[1],h=l[5],_=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(f-u)<.01&&Math.abs(d-M)<.01&&Math.abs(_-m)<.01){if(Math.abs(f+u)<.1&&Math.abs(d+M)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,T=(h+1)/2,C=(p+1)/2,S=(f+u)/4,D=(d+M)/4,z=(_+m)/4;return E>T&&E>C?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=S/i,s=D/i):T>C?T<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),i=S/r,s=z/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=D/s,r=z/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-_)*(m-_)+(d-M)*(d-M)+(u-f)*(u-f));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(d-M)/y,this.z=(u-f)/y,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gf extends mr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Zt(r);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new sc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ci extends gf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class xu extends Zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=un,this.minFilter=un,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _f extends Zt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=un,this.minFilter=un,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pi{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(s,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),fs.copy(i.boundingBox)),fs.applyMatrix4(e.matrixWorld),this.union(fs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),hs.subVectors(this.max,Tr),Oi.subVectors(e.a,Tr),Bi.subVectors(e.b,Tr),zi.subVectors(e.c,Tr),Jn.subVectors(Bi,Oi),Qn.subVectors(zi,Bi),gi.subVectors(Oi,zi);let t=[0,-Jn.z,Jn.y,0,-Qn.z,Qn.y,0,-gi.z,gi.y,Jn.z,0,-Jn.x,Qn.z,0,-Qn.x,gi.z,0,-gi.x,-Jn.y,Jn.x,0,-Qn.y,Qn.x,0,-gi.y,gi.x,0];return!ha(t,Oi,Bi,zi,hs)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,Oi,Bi,zi,hs))?!1:(ps.crossVectors(Jn,Qn),t=[ps.x,ps.y,ps.z],ha(t,Oi,Bi,zi,hs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Nn=[new k,new k,new k,new k,new k,new k,new k,new k],mn=new k,fs=new Pi,Oi=new k,Bi=new k,zi=new k,Jn=new k,Qn=new k,gi=new k,Tr=new k,hs=new k,ps=new k,_i=new k;function ha(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){_i.fromArray(n,s);const o=r.x*Math.abs(_i.x)+r.y*Math.abs(_i.y)+r.z*Math.abs(_i.z),l=e.dot(_i),c=t.dot(_i),f=i.dot(_i);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const vf=new Pi,Ar=new k,pa=new k;class es{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):vf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);const t=Ar.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ar,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(pa)),this.expandByPoint(Ar.copy(e.center).sub(pa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Fn=new k,ma=new k,ms=new k,ei=new k,xa=new k,xs=new k,ga=new k;class gu{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ma.copy(e).add(t).multiplyScalar(.5),ms.copy(t).sub(e).normalize(),ei.copy(this.origin).sub(ma);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ms),o=ei.dot(this.direction),l=-ei.dot(ms),c=ei.lengthSq(),f=Math.abs(1-a*a);let d,u,h,_;if(f>0)if(d=a*l-o,u=a*o-l,_=s*f,d>=0)if(u>=-_)if(u<=_){const M=1/f;d*=M,u*=M,h=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),h=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),h=-d*d+u*(u+2*l)+c;else u<=-_?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+u*(u+2*l)+c):u<=_?(d=0,u=Math.min(Math.max(-s,-l),s),h=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),h=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(ma).addScaledVector(ms,u),h}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const i=Fn.dot(this.direction),r=Fn.dot(Fn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),f>=0?(s=(e.min.y-u.y)*f,a=(e.max.y-u.y)*f):(s=(e.max.y-u.y)*f,a=(e.min.y-u.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,r,s){xa.subVectors(t,e),xs.subVectors(i,e),ga.crossVectors(xa,xs);let a=this.direction.dot(ga),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ei.subVectors(this.origin,e);const l=o*this.direction.dot(xs.crossVectors(ei,xs));if(l<0)return null;const c=o*this.direction.dot(xa.cross(ei));if(c<0||l+c>a)return null;const f=-o*ei.dot(ga);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,i,r,s,a,o,l,c,f,d,u,h,_,M,m){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,f,d,u,h,_,M,m)}set(e,t,i,r,s,a,o,l,c,f,d,u,h,_,M,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=f,p[10]=d,p[14]=u,p[3]=h,p[7]=_,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ki.setFromMatrixColumn(e,0).length(),s=1/ki.setFromMatrixColumn(e,1).length(),a=1/ki.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*f,h=a*d,_=o*f,M=o*d;t[0]=l*f,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=u-M*c,t[9]=-o*l,t[2]=M-u*c,t[6]=_+h*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*f,h=l*d,_=c*f,M=c*d;t[0]=u+M*o,t[4]=_*o-h,t[8]=a*c,t[1]=a*d,t[5]=a*f,t[9]=-o,t[2]=h*o-_,t[6]=M+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*f,h=l*d,_=c*f,M=c*d;t[0]=u-M*o,t[4]=-a*d,t[8]=_+h*o,t[1]=h+_*o,t[5]=a*f,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*f,h=a*d,_=o*f,M=o*d;t[0]=l*f,t[4]=_*c-h,t[8]=u*c+M,t[1]=l*d,t[5]=M*c+u,t[9]=h*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,h=a*c,_=o*l,M=o*c;t[0]=l*f,t[4]=M-u*d,t[8]=_*d+h,t[1]=d,t[5]=a*f,t[9]=-o*f,t[2]=-c*f,t[6]=h*d+_,t[10]=u-M*d}else if(e.order==="XZY"){const u=a*l,h=a*c,_=o*l,M=o*c;t[0]=l*f,t[4]=-d,t[8]=c*f,t[1]=u*d+M,t[5]=a*f,t[9]=h*d-_,t[2]=_*d-h,t[6]=o*f,t[10]=M*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mf,e,bf)}lookAt(e,t,i){const r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ti.crossVectors(i,nn),ti.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ti.crossVectors(i,nn)),ti.normalize(),gs.crossVectors(nn,ti),r[0]=ti.x,r[4]=gs.x,r[8]=nn.x,r[1]=ti.y,r[5]=gs.y,r[9]=nn.y,r[2]=ti.z,r[6]=gs.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],d=i[5],u=i[9],h=i[13],_=i[2],M=i[6],m=i[10],p=i[14],y=i[3],E=i[7],T=i[11],C=i[15],S=r[0],D=r[4],z=r[8],b=r[12],g=r[1],R=r[5],N=r[9],w=r[13],X=r[2],K=r[6],$=r[10],ce=r[14],q=r[3],se=r[7],fe=r[11],De=r[15];return s[0]=a*S+o*g+l*X+c*q,s[4]=a*D+o*R+l*K+c*se,s[8]=a*z+o*N+l*$+c*fe,s[12]=a*b+o*w+l*ce+c*De,s[1]=f*S+d*g+u*X+h*q,s[5]=f*D+d*R+u*K+h*se,s[9]=f*z+d*N+u*$+h*fe,s[13]=f*b+d*w+u*ce+h*De,s[2]=_*S+M*g+m*X+p*q,s[6]=_*D+M*R+m*K+p*se,s[10]=_*z+M*N+m*$+p*fe,s[14]=_*b+M*w+m*ce+p*De,s[3]=y*S+E*g+T*X+C*q,s[7]=y*D+E*R+T*K+C*se,s[11]=y*z+E*N+T*$+C*fe,s[15]=y*b+E*w+T*ce+C*De,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],d=e[6],u=e[10],h=e[14],_=e[3],M=e[7],m=e[11],p=e[15];return _*(+s*l*d-r*c*d-s*o*u+i*c*u+r*o*h-i*l*h)+M*(+t*l*h-t*c*u+s*a*u-r*a*h+r*c*f-s*l*f)+m*(+t*c*d-t*o*h-s*a*d+i*a*h+s*o*f-i*c*f)+p*(-r*o*f-t*l*d+t*o*u+r*a*d-i*a*u+i*l*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],d=e[9],u=e[10],h=e[11],_=e[12],M=e[13],m=e[14],p=e[15],y=d*m*c-M*u*c+M*l*h-o*m*h-d*l*p+o*u*p,E=_*u*c-f*m*c-_*l*h+a*m*h+f*l*p-a*u*p,T=f*M*c-_*d*c+_*o*h-a*M*h-f*o*p+a*d*p,C=_*d*l-f*M*l-_*o*u+a*M*u+f*o*m-a*d*m,S=t*y+i*E+r*T+s*C;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/S;return e[0]=y*D,e[1]=(M*u*s-d*m*s-M*r*h+i*m*h+d*r*p-i*u*p)*D,e[2]=(o*m*s-M*l*s+M*r*c-i*m*c-o*r*p+i*l*p)*D,e[3]=(d*l*s-o*u*s-d*r*c+i*u*c+o*r*h-i*l*h)*D,e[4]=E*D,e[5]=(f*m*s-_*u*s+_*r*h-t*m*h-f*r*p+t*u*p)*D,e[6]=(_*l*s-a*m*s-_*r*c+t*m*c+a*r*p-t*l*p)*D,e[7]=(a*u*s-f*l*s+f*r*c-t*u*c-a*r*h+t*l*h)*D,e[8]=T*D,e[9]=(_*d*s-f*M*s-_*i*h+t*M*h+f*i*p-t*d*p)*D,e[10]=(a*M*s-_*o*s+_*i*c-t*M*c-a*i*p+t*o*p)*D,e[11]=(f*o*s-a*d*s-f*i*c+t*d*c+a*i*h-t*o*h)*D,e[12]=C*D,e[13]=(f*M*r-_*d*r+_*i*u-t*M*u-f*i*m+t*d*m)*D,e[14]=(_*o*r-a*M*r-_*i*l+t*M*l+a*i*m-t*o*m)*D,e[15]=(a*d*r-f*o*r+f*i*l-t*d*l-a*i*u+t*o*u)*D,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,f=a+a,d=o+o,u=s*c,h=s*f,_=s*d,M=a*f,m=a*d,p=o*d,y=l*c,E=l*f,T=l*d,C=i.x,S=i.y,D=i.z;return r[0]=(1-(M+p))*C,r[1]=(h+T)*C,r[2]=(_-E)*C,r[3]=0,r[4]=(h-T)*S,r[5]=(1-(u+p))*S,r[6]=(m+y)*S,r[7]=0,r[8]=(_+E)*D,r[9]=(m-y)*D,r[10]=(1-(u+M))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ki.set(r[0],r[1],r[2]).length();const a=ki.set(r[4],r[5],r[6]).length(),o=ki.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],xn.copy(this);const c=1/s,f=1/a,d=1/o;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=f,xn.elements[5]*=f,xn.elements[6]*=f,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,t.setFromRotationMatrix(xn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Tn,l=!1){const c=this.elements,f=2*s/(t-e),d=2*s/(i-r),u=(t+e)/(t-e),h=(i+r)/(i-r);let _,M;if(l)_=s/(a-s),M=a*s/(a-s);else if(o===Tn)_=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===Gs)_=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Tn,l=!1){const c=this.elements,f=2/(t-e),d=2/(i-r),u=-(t+e)/(t-e),h=-(i+r)/(i-r);let _,M;if(l)_=1/(a-s),M=a/(a-s);else if(o===Tn)_=-2/(a-s),M=-(a+s)/(a-s);else if(o===Gs)_=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ki=new k,xn=new vt,Mf=new k(0,0,0),bf=new k(1,1,1),ti=new k,gs=new k,nn=new k,$c=new vt,Yc=new Qr;class Pn{constructor(e=0,t=0,i=0,r=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],d=r[2],u=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,h),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return $c.makeRotationFromQuaternion(e),this.setFromRotationMatrix($c,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yc.setFromEuler(this),this.setFromQuaternion(Yc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class ac{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yf=0;const jc=new k,Vi=new Qr,On=new vt,_s=new k,wr=new k,Sf=new k,Ef=new Qr,Kc=new k(1,0,0),Zc=new k(0,1,0),Jc=new k(0,0,1),Qc={type:"added"},Tf={type:"removed"},Gi={type:"childadded",child:null},_a={type:"childremoved",child:null};class Ut extends mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new k,t=new Pn,i=new Qr,r=new k(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new He}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ac,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Kc,e)}rotateY(e){return this.rotateOnAxis(Zc,e)}rotateZ(e){return this.rotateOnAxis(Jc,e)}translateOnAxis(e,t){return jc.copy(e).applyQuaternion(this.quaternion),this.position.add(jc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kc,e)}translateY(e){return this.translateOnAxis(Zc,e)}translateZ(e){return this.translateOnAxis(Jc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_s.copy(e):_s.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(wr,_s,this.up):On.lookAt(_s,wr,this.up),this.quaternion.setFromRotationMatrix(On),r&&(On.extractRotation(r.matrixWorld),Vi.setFromRotationMatrix(On),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qc),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null):Et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tf),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),On.multiply(e.parent.matrixWorld)),e.applyMatrix4(On),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qc),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wr,e,Sf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wr,Ef,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),d=a(e.shapes),u=a(e.skeletons),h=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),h.length>0&&(i.animations=h),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ut.DEFAULT_UP=new k(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new k,Bn=new k,va=new k,zn=new k,Hi=new k,Wi=new k,el=new k,Ma=new k,ba=new k,ya=new k,Sa=new xt,Ea=new xt,Ta=new xt;class _n{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),gn.subVectors(e,t),r.cross(gn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){gn.subVectors(r,t),Bn.subVectors(i,t),va.subVectors(e,t);const a=gn.dot(gn),o=gn.dot(Bn),l=gn.dot(va),c=Bn.dot(Bn),f=Bn.dot(va),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,h=(c*l-o*f)*u,_=(a*f-o*l)*u;return s.set(1-h-_,_,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,zn.x),l.addScaledVector(a,zn.y),l.addScaledVector(o,zn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Sa.setScalar(0),Ea.setScalar(0),Ta.setScalar(0),Sa.fromBufferAttribute(e,t),Ea.fromBufferAttribute(e,i),Ta.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Sa,s.x),a.addScaledVector(Ea,s.y),a.addScaledVector(Ta,s.z),a}static isFrontFacing(e,t,i,r){return gn.subVectors(i,t),Bn.subVectors(e,t),gn.cross(Bn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),gn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return _n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return _n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Hi.subVectors(r,i),Wi.subVectors(s,i),Ma.subVectors(e,i);const l=Hi.dot(Ma),c=Wi.dot(Ma);if(l<=0&&c<=0)return t.copy(i);ba.subVectors(e,r);const f=Hi.dot(ba),d=Wi.dot(ba);if(f>=0&&d<=f)return t.copy(r);const u=l*d-f*c;if(u<=0&&l>=0&&f<=0)return a=l/(l-f),t.copy(i).addScaledVector(Hi,a);ya.subVectors(e,s);const h=Hi.dot(ya),_=Wi.dot(ya);if(_>=0&&h<=_)return t.copy(s);const M=h*c-l*_;if(M<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(Wi,o);const m=f*_-h*d;if(m<=0&&d-f>=0&&h-_>=0)return el.subVectors(s,r),o=(d-f)/(d-f+(h-_)),t.copy(r).addScaledVector(el,o);const p=1/(m+M+u);return a=M*p,o=u*p,t.copy(i).addScaledVector(Hi,a).addScaledVector(Wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _u={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},vs={h:0,s:0,l:0};function Aa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=rc(e,1),t=Je(t,0,1),i=Je(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Aa(a,s,e+1/3),this.g=Aa(a,s,e),this.b=Aa(a,s,e-1/3)}return st.colorSpaceToWorking(this,r),this}setStyle(e,t=an){function i(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){const i=_u[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return st.workingToColorSpace(qt.copy(this),e),Math.round(Je(qt.r*255,0,255))*65536+Math.round(Je(qt.g*255,0,255))*256+Math.round(Je(qt.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(qt.copy(this),t);const i=qt.r,r=qt.g,s=qt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=f<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=an){st.workingToColorSpace(qt.copy(this),e);const t=qt.r,i=qt.g,r=qt.b;return e!==an?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ni),this.setHSL(ni.h+e,ni.s+t,ni.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ni),e.getHSL(vs);const i=zr(ni.h,vs.h,t),r=zr(ni.s,vs.s,t),s=zr(ni.l,vs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new Qe;Qe.NAMES=_u;let Af=0;class ts extends mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=er,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xa,this.blendDst=qa,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==di&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xa&&(i.blendSrc=this.blendSrc),this.blendDst!==qa&&(i.blendDst=this.blendDst),this.blendEquation!==Si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ar&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class vu extends ts{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=ru,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new k,Ms=new Ye;let wf=0;class bn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=zc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ms.fromBufferAttribute(this,t),Ms.applyMatrix3(e),this.setXY(t,Ms.x,Ms.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=jt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array),r=jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),i=jt(i,this.array),r=jt(r,this.array),s=jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zc&&(e.usage=this.usage),e}}class Mu extends bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class bu extends bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class gt extends bn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Rf=0;const dn=new vt,wa=new Ut,Xi=new k,rn=new Pi,Rr=new Pi,zt=new k;class Jt extends mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mu(e)?bu:Mu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,i){return dn.makeTranslation(e,t,i),this.applyMatrix4(dn),this}scale(e,t,i){return dn.makeScale(e,t,i),this.applyMatrix4(dn),this}lookAt(e){return wa.lookAt(e),wa.updateMatrix(),this.applyMatrix4(wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new gt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new es);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Rr.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(rn.min,Rr.min),rn.expandByPoint(zt),zt.addVectors(rn.max,Rr.max),rn.expandByPoint(zt)):(rn.expandByPoint(Rr.min),rn.expandByPoint(Rr.max))}rn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(zt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)zt.fromBufferAttribute(o,c),l&&(Xi.fromBufferAttribute(e,c),zt.add(Xi)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let z=0;z<i.count;z++)o[z]=new k,l[z]=new k;const c=new k,f=new k,d=new k,u=new Ye,h=new Ye,_=new Ye,M=new k,m=new k;function p(z,b,g){c.fromBufferAttribute(i,z),f.fromBufferAttribute(i,b),d.fromBufferAttribute(i,g),u.fromBufferAttribute(s,z),h.fromBufferAttribute(s,b),_.fromBufferAttribute(s,g),f.sub(c),d.sub(c),h.sub(u),_.sub(u);const R=1/(h.x*_.y-_.x*h.y);isFinite(R)&&(M.copy(f).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(R),m.copy(d).multiplyScalar(h.x).addScaledVector(f,-_.x).multiplyScalar(R),o[z].add(M),o[b].add(M),o[g].add(M),l[z].add(m),l[b].add(m),l[g].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let z=0,b=y.length;z<b;++z){const g=y[z],R=g.start,N=g.count;for(let w=R,X=R+N;w<X;w+=3)p(e.getX(w+0),e.getX(w+1),e.getX(w+2))}const E=new k,T=new k,C=new k,S=new k;function D(z){C.fromBufferAttribute(r,z),S.copy(C);const b=o[z];E.copy(b),E.sub(C.multiplyScalar(C.dot(b))).normalize(),T.crossVectors(S,b);const R=T.dot(l[z])<0?-1:1;a.setXYZW(z,E.x,E.y,E.z,R)}for(let z=0,b=y.length;z<b;++z){const g=y[z],R=g.start,N=g.count;for(let w=R,X=R+N;w<X;w+=3)D(e.getX(w+0)),D(e.getX(w+1)),D(e.getX(w+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,h=i.count;u<h;u++)i.setXYZ(u,0,0,0);const r=new k,s=new k,a=new k,o=new k,l=new k,c=new k,f=new k,d=new k;if(e)for(let u=0,h=e.count;u<h;u+=3){const _=e.getX(u+0),M=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),f.subVectors(a,s),d.subVectors(r,s),f.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(f),l.add(f),c.add(f),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,h=t.count;u<h;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),f.subVectors(a,s),d.subVectors(r,s),f.cross(d),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,d=o.normalized,u=new c.constructor(l.length*f);let h=0,_=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?h=l[M]*o.data.stride+o.offset:h=l[M]*f;for(let p=0;p<f;p++)u[_++]=c[h++]}return new bn(u,f,d)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,d=c.length;f<d;f++){const u=c[f],h=e(u,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let d=0,u=c.length;d<u;d++){const h=c[d];f.push(h.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(t))}const s=e.morphAttributes;for(const c in s){const f=[],d=s[c];for(let u=0,h=d.length;u<h;u++)f.push(d[u].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tl=new vt,vi=new gu,bs=new es,nl=new k,ys=new k,Ss=new k,Es=new k,Ra=new k,Ts=new k,il=new k,As=new k;class yn extends Ut{constructor(e=new Jt,t=new vu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ts.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],d=s[l];f!==0&&(Ra.fromBufferAttribute(d,e),a?Ts.addScaledVector(Ra,f):Ts.addScaledVector(Ra.sub(t),f))}t.add(Ts)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),bs.copy(i.boundingSphere),bs.applyMatrix4(s),vi.copy(e.ray).recast(e.near),!(bs.containsPoint(vi.origin)===!1&&(vi.intersectSphere(bs,nl)===null||vi.origin.distanceToSquared(nl)>(e.far-e.near)**2))&&(tl.copy(s).invert(),vi.copy(e.ray).applyMatrix4(tl),!(i.boundingBox!==null&&vi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,vi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,d=s.attributes.normal,u=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=u.length;_<M;_++){const m=u[_],p=a[m.materialIndex],y=Math.max(m.start,h.start),E=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let T=y,C=E;T<C;T+=3){const S=o.getX(T),D=o.getX(T+1),z=o.getX(T+2);r=ws(this,p,e,i,c,f,d,S,D,z),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,h.start),M=Math.min(o.count,h.start+h.count);for(let m=_,p=M;m<p;m+=3){const y=o.getX(m),E=o.getX(m+1),T=o.getX(m+2);r=ws(this,a,e,i,c,f,d,y,E,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,M=u.length;_<M;_++){const m=u[_],p=a[m.materialIndex],y=Math.max(m.start,h.start),E=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let T=y,C=E;T<C;T+=3){const S=T,D=T+1,z=T+2;r=ws(this,p,e,i,c,f,d,S,D,z),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,h.start),M=Math.min(l.count,h.start+h.count);for(let m=_,p=M;m<p;m+=3){const y=m,E=m+1,T=m+2;r=ws(this,a,e,i,c,f,d,y,E,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Cf(n,e,t,i,r,s,a,o){let l;if(e.side===tn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===di,o),l===null)return null;As.copy(o),As.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(As);return c<t.near||c>t.far?null:{distance:c,point:As.clone(),object:n}}function ws(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ys),n.getVertexPosition(l,Ss),n.getVertexPosition(c,Es);const f=Cf(n,e,t,i,ys,Ss,Es,il);if(f){const d=new k;_n.getBarycoord(il,ys,Ss,Es,d),r&&(f.uv=_n.getInterpolatedAttribute(r,o,l,c,d,new Ye)),s&&(f.uv1=_n.getInterpolatedAttribute(s,o,l,c,d,new Ye)),a&&(f.normal=_n.getInterpolatedAttribute(a,o,l,c,d,new k),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new k,materialIndex:0};_n.getNormal(ys,Ss,Es,u.normal),f.face=u,f.barycoord=d}return f}class gr extends Jt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],d=[];let u=0,h=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(d,2));function _(M,m,p,y,E,T,C,S,D,z,b){const g=T/D,R=C/z,N=T/2,w=C/2,X=S/2,K=D+1,$=z+1;let ce=0,q=0;const se=new k;for(let fe=0;fe<$;fe++){const De=fe*R-w;for(let je=0;je<K;je++){const ot=je*g-N;se[M]=ot*y,se[m]=De*E,se[p]=X,c.push(se.x,se.y,se.z),se[M]=0,se[m]=0,se[p]=S>0?1:-1,f.push(se.x,se.y,se.z),d.push(je/D),d.push(1-fe/z),ce+=1}}for(let fe=0;fe<z;fe++)for(let De=0;De<D;De++){const je=u+De+K*fe,ot=u+De+K*(fe+1),nt=u+(De+1)+K*(fe+1),ht=u+(De+1)+K*fe;l.push(je,ot,ht),l.push(ot,nt,ht),q+=6}o.addGroup(h,q,b),h+=q,u+=ce}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=dr(n[t]);for(const r in i)e[r]=i[r]}return e}function Pf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function yu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const Lf={clone:dr,merge:Kt};var Df=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,If=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends ts{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Df,this.fragmentShader=If,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=Pf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Su extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ii=new k,rl=new Ye,sl=new Ye;class en extends Su{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ur*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ur*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ii.x,ii.y).multiplyScalar(-e/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ii.x,ii.y).multiplyScalar(-e/ii.z)}getViewSize(e,t){return this.getViewBounds(e,rl,sl),t.subVectors(sl,rl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Br*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const qi=-90,$i=1;class Uf extends Ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new en(qi,$i,e,t);r.layers=this.layers,this.add(r);const s=new en(qi,$i,e,t);s.layers=this.layers,this.add(s);const a=new en(qi,$i,e,t);a.layers=this.layers,this.add(a);const o=new en(qi,$i,e,t);o.layers=this.layers,this.add(o);const l=new en(qi,$i,e,t);l.layers=this.layers,this.add(l);const c=new en(qi,$i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),e.render(t,f),e.setRenderTarget(d,u,h),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Eu extends Zt{constructor(e=[],t=or,i,r,s,a,o,l,c,f){super(e,t,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Nf extends Ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Eu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new gr(5,5,5),s=new $n({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:Wn});s.uniforms.tEquirect.value=t;const a=new yn(r,s),o=t.minFilter;return t.minFilter===Ti&&(t.minFilter=hn),new Uf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}class rt extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ff={type:"move"};class Ca{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,i),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=f.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&u>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ff)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new rt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Ws{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Qe(e),this.near=t,this.far=i}clone(){return new Ws(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class al extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Tu extends Zt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=un,f=un,d,u){super(null,a,o,l,c,f,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ol extends bn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Yi=new vt,cl=new vt,Rs=[],ll=new Pi,Of=new vt,Cr=new yn,Pr=new es;class Pa extends yn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ol(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Of)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Yi),ll.copy(e.boundingBox).applyMatrix4(Yi),this.boundingBox.union(ll)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new es),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Yi),Pr.copy(e.boundingSphere).applyMatrix4(Yi),this.boundingSphere.union(Pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Cr.geometry=this.geometry,Cr.material=this.material,Cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pr.copy(this.boundingSphere),Pr.applyMatrix4(i),e.ray.intersectsSphere(Pr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Yi),cl.multiplyMatrices(i,Yi),Cr.matrixWorld=cl,Cr.raycast(e,Rs);for(let a=0,o=Rs.length;a<o;a++){const l=Rs[a];l.instanceId=s,l.object=this,t.push(l)}Rs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ol(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Tu(new Float32Array(r*this.count),r,this.count,Qo,En));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const La=new k,Bf=new k,zf=new He;class ri{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=La.subVectors(i,t).cross(Bf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(La),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||zf.getNormalMatrix(e),r=this.coplanarPoint(La).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new es,kf=new Ye(.5,.5),Cs=new k;class oc{constructor(e=new ri,t=new ri,i=new ri,r=new ri,s=new ri,a=new ri){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Tn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],d=s[5],u=s[6],h=s[7],_=s[8],M=s[9],m=s[10],p=s[11],y=s[12],E=s[13],T=s[14],C=s[15];if(r[0].setComponents(c-a,h-f,p-_,C-y).normalize(),r[1].setComponents(c+a,h+f,p+_,C+y).normalize(),r[2].setComponents(c+o,h+d,p+M,C+E).normalize(),r[3].setComponents(c-o,h-d,p-M,C-E).normalize(),i)r[4].setComponents(l,u,m,T).normalize(),r[5].setComponents(c-l,h-u,p-m,C-T).normalize();else if(r[4].setComponents(c-l,h-u,p-m,C-T).normalize(),t===Tn)r[5].setComponents(c+l,h+u,p+m,C+T).normalize();else if(t===Gs)r[5].setComponents(l,u,m,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){Mi.center.set(0,0,0);const t=kf.distanceTo(e.center);return Mi.radius=.7071067811865476+t,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Cs.x=r.normal.x>0?e.max.x:e.min.x,Cs.y=r.normal.y>0?e.max.y:e.min.y,Cs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Cs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Au extends Zt{constructor(e,t,i=Ri,r,s,a,o=un,l=un,c,f=$r,d=1){if(f!==$r&&f!==Yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class wu extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class cc extends Jt{constructor(e=1,t=1,i=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:r,heightSegments:s},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],f=t/2,d=Math.PI/2*e,u=t,h=2*d+u,_=i*2+s,M=r+1,m=new k,p=new k;for(let y=0;y<=_;y++){let E=0,T=0,C=0,S=0;if(y<=i){const b=y/i,g=b*Math.PI/2;T=-f-e*Math.cos(g),C=e*Math.sin(g),S=-e*Math.cos(g),E=b*d}else if(y<=i+s){const b=(y-i)/s;T=-f+b*t,C=e,S=0,E=d+b*u}else{const b=(y-i-s)/i,g=b*Math.PI/2;T=f+e*Math.sin(g),C=e*Math.cos(g),S=e*Math.sin(g),E=d+u+b*d}const D=Math.max(0,Math.min(1,E/h));let z=0;y===0?z=.5/r:y===_&&(z=-.5/r);for(let b=0;b<=r;b++){const g=b/r,R=g*Math.PI*2,N=Math.sin(R),w=Math.cos(R);p.x=-C*w,p.y=T,p.z=C*N,o.push(p.x,p.y,p.z),m.set(-C*w,S,C*N),m.normalize(),l.push(m.x,m.y,m.z),c.push(g+z,D)}if(y>0){const b=(y-1)*M;for(let g=0;g<r;g++){const R=b+g,N=b+g+1,w=y*M+g,X=y*M+g+1;a.push(R,N,w),a.push(N,X,w)}}}this.setIndex(a),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cc(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Xs extends Jt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new k,f=new Ye;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const h=i+d/t*r;c.x=e*Math.cos(h),c.y=e*Math.sin(h),a.push(c.x,c.y,c.z),o.push(0,0,1),f.x=(a[u]/e+1)/2,f.y=(a[u+1]/e+1)/2,l.push(f.x,f.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(o,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ct extends Jt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const f=[],d=[],u=[],h=[];let _=0;const M=[],m=i/2;let p=0;y(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(f),this.setAttribute("position",new gt(d,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(h,2));function y(){const T=new k,C=new k;let S=0;const D=(t-e)/i;for(let z=0;z<=s;z++){const b=[],g=z/s,R=g*(t-e)+e;for(let N=0;N<=r;N++){const w=N/r,X=w*l+o,K=Math.sin(X),$=Math.cos(X);C.x=R*K,C.y=-g*i+m,C.z=R*$,d.push(C.x,C.y,C.z),T.set(K,D,$).normalize(),u.push(T.x,T.y,T.z),h.push(w,1-g),b.push(_++)}M.push(b)}for(let z=0;z<r;z++)for(let b=0;b<s;b++){const g=M[b][z],R=M[b+1][z],N=M[b+1][z+1],w=M[b][z+1];(e>0||b!==0)&&(f.push(g,R,w),S+=3),(t>0||b!==s-1)&&(f.push(R,N,w),S+=3)}c.addGroup(p,S,0),p+=S}function E(T){const C=_,S=new Ye,D=new k;let z=0;const b=T===!0?e:t,g=T===!0?1:-1;for(let N=1;N<=r;N++)d.push(0,m*g,0),u.push(0,g,0),h.push(.5,.5),_++;const R=_;for(let N=0;N<=r;N++){const X=N/r*l+o,K=Math.cos(X),$=Math.sin(X);D.x=b*$,D.y=m*g,D.z=b*K,d.push(D.x,D.y,D.z),u.push(0,g,0),S.x=K*.5+.5,S.y=$*.5*g+.5,h.push(S.x,S.y),_++}for(let N=0;N<r;N++){const w=C+N,X=R+N;T===!0?f.push(X,X+1,w):f.push(X+1,X,w),z+=3}c.addGroup(p,z,T===!0?1:2),p+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ct(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fn extends Ct{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new fn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class lc extends Jt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),c(i),f(),this.setAttribute("position",new gt(s,3)),this.setAttribute("normal",new gt(s.slice(),3)),this.setAttribute("uv",new gt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const E=new k,T=new k,C=new k;for(let S=0;S<t.length;S+=3)h(t[S+0],E),h(t[S+1],T),h(t[S+2],C),l(E,T,C,y)}function l(y,E,T,C){const S=C+1,D=[];for(let z=0;z<=S;z++){D[z]=[];const b=y.clone().lerp(T,z/S),g=E.clone().lerp(T,z/S),R=S-z;for(let N=0;N<=R;N++)N===0&&z===S?D[z][N]=b:D[z][N]=b.clone().lerp(g,N/R)}for(let z=0;z<S;z++)for(let b=0;b<2*(S-z)-1;b++){const g=Math.floor(b/2);b%2===0?(u(D[z][g+1]),u(D[z+1][g]),u(D[z][g])):(u(D[z][g+1]),u(D[z+1][g+1]),u(D[z+1][g]))}}function c(y){const E=new k;for(let T=0;T<s.length;T+=3)E.x=s[T+0],E.y=s[T+1],E.z=s[T+2],E.normalize().multiplyScalar(y),s[T+0]=E.x,s[T+1]=E.y,s[T+2]=E.z}function f(){const y=new k;for(let E=0;E<s.length;E+=3){y.x=s[E+0],y.y=s[E+1],y.z=s[E+2];const T=m(y)/2/Math.PI+.5,C=p(y)/Math.PI+.5;a.push(T,1-C)}_(),d()}function d(){for(let y=0;y<a.length;y+=6){const E=a[y+0],T=a[y+2],C=a[y+4],S=Math.max(E,T,C),D=Math.min(E,T,C);S>.9&&D<.1&&(E<.2&&(a[y+0]+=1),T<.2&&(a[y+2]+=1),C<.2&&(a[y+4]+=1))}}function u(y){s.push(y.x,y.y,y.z)}function h(y,E){const T=y*3;E.x=e[T+0],E.y=e[T+1],E.z=e[T+2]}function _(){const y=new k,E=new k,T=new k,C=new k,S=new Ye,D=new Ye,z=new Ye;for(let b=0,g=0;b<s.length;b+=9,g+=6){y.set(s[b+0],s[b+1],s[b+2]),E.set(s[b+3],s[b+4],s[b+5]),T.set(s[b+6],s[b+7],s[b+8]),S.set(a[g+0],a[g+1]),D.set(a[g+2],a[g+3]),z.set(a[g+4],a[g+5]),C.copy(y).add(E).add(T).divideScalar(3);const R=m(C);M(S,g+0,y,R),M(D,g+2,E,R),M(z,g+4,T,R)}}function M(y,E,T,C){C<0&&y.x===1&&(a[E]=y.x-1),T.x===0&&T.z===0&&(a[E]=C/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lc(e.vertices,e.indices,e.radius,e.details)}}class kr extends lc{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new kr(e.radius,e.detail)}}class ea extends Jt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,d=e/o,u=t/l,h=[],_=[],M=[],m=[];for(let p=0;p<f;p++){const y=p*u-a;for(let E=0;E<c;E++){const T=E*d-s;_.push(T,-y,0),M.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const E=y+c*p,T=y+c*(p+1),C=y+1+c*(p+1),S=y+1+c*p;h.push(E,T,S),h.push(T,C,S)}this.setIndex(h),this.setAttribute("position",new gt(_,3)),this.setAttribute("normal",new gt(M,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.width,e.height,e.widthSegments,e.heightSegments)}}class uc extends Jt{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],f=[];let d=e;const u=(t-e)/r,h=new k,_=new Ye;for(let M=0;M<=r;M++){for(let m=0;m<=i;m++){const p=s+m/i*a;h.x=d*Math.cos(p),h.y=d*Math.sin(p),l.push(h.x,h.y,h.z),c.push(0,0,1),_.x=(h.x/t+1)/2,_.y=(h.y/t+1)/2,f.push(_.x,_.y)}d+=u}for(let M=0;M<r;M++){const m=M*(i+1);for(let p=0;p<i;p++){const y=p+m,E=y,T=y+i+1,C=y+i+2,S=y+1;o.push(E,T,S),o.push(T,C,S)}}this.setIndex(o),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class dc extends Jt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const f=[],d=new k,u=new k,h=[],_=[],M=[],m=[];for(let p=0;p<=i;p++){const y=[],E=p/i;let T=0;p===0&&a===0?T=.5/t:p===i&&l===Math.PI&&(T=-.5/t);for(let C=0;C<=t;C++){const S=C/t;d.x=-e*Math.cos(r+S*s)*Math.sin(a+E*o),d.y=e*Math.cos(a+E*o),d.z=e*Math.sin(r+S*s)*Math.sin(a+E*o),_.push(d.x,d.y,d.z),u.copy(d).normalize(),M.push(u.x,u.y,u.z),m.push(S+T,1-E),y.push(c++)}f.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const E=f[p][y+1],T=f[p][y],C=f[p+1][y],S=f[p+1][y+1];(p!==0||a>0)&&h.push(E,T,S),(p!==i-1||l<Math.PI)&&h.push(T,C,S)}this.setIndex(h),this.setAttribute("position",new gt(_,3)),this.setAttribute("normal",new gt(M,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class si extends Jt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],l=[],c=[],f=new k,d=new k,u=new k;for(let h=0;h<=i;h++)for(let _=0;_<=r;_++){const M=_/r*s,m=h/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(M),d.y=(e+t*Math.cos(m))*Math.sin(M),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),f.x=e*Math.cos(M),f.y=e*Math.sin(M),u.subVectors(d,f).normalize(),l.push(u.x,u.y,u.z),c.push(_/r),c.push(h/i)}for(let h=1;h<=i;h++)for(let _=1;_<=r;_++){const M=(r+1)*h+_-1,m=(r+1)*(h-1)+_-1,p=(r+1)*(h-1)+_,y=(r+1)*h+_;a.push(M,m,y),a.push(m,p,y)}this.setIndex(a),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Vf extends ts{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hu,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Gf extends ts{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hf extends ts{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ta extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ul extends ta{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Da=new vt,dl=new k,fl=new k;class fc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.mapType=Cn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oc,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;dl.setFromMatrixPosition(e.matrixWorld),t.position.copy(dl),fl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fl),t.updateMatrixWorld(),Da.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Da)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Wf extends fc{constructor(){super(new en(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=ur*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Xf extends ta{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Wf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const hl=new vt,Lr=new k,Ia=new k;class qf extends fc{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ye(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Lr.setFromMatrixPosition(e.matrixWorld),i.position.copy(Lr),Ia.copy(i.position),Ia.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ia),i.updateMatrixWorld(),r.makeTranslation(-Lr.x,-Lr.y,-Lr.z),hl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hl,i.coordinateSystem,i.reversedDepth)}}class Dr extends ta{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new qf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class hc extends Su{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $f extends fc{constructor(){super(new hc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ua extends ta{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new $f}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Yf extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const pl=new vt;class jf{constructor(e,t,i=0,r=1/0){this.ray=new gu(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new ac,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Et("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pl),this}intersectObject(e,t=!0,i=[]){return Io(e,this,i,t),i.sort(ml),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Io(e[r],this,i,t);return i.sort(ml),i}}function ml(n,e){return n.distance-e.distance}function Io(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)Io(s[a],e,t,!0)}}function xl(n,e,t,i){const r=Kf(i);switch(t){case du:return n*e;case Qo:return n*e/r.components*r.byteLength;case ec:return n*e/r.components*r.byteLength;case tc:return n*e*2/r.components*r.byteLength;case nc:return n*e*2/r.components*r.byteLength;case fu:return n*e*3/r.components*r.byteLength;case vn:return n*e*4/r.components*r.byteLength;case ic:return n*e*4/r.components*r.byteLength;case Ds:case Is:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Us:case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case so:case oo:return Math.max(n,16)*Math.max(e,8)/4;case ro:case ao:return Math.max(n,8)*Math.max(e,8)/2;case co:case lo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ho:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case po:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case mo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case xo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case go:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case _o:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case vo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Mo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case bo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case yo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case So:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case To:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ao:case wo:case Ro:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Co:case Po:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Lo:case Do:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Kf(n){switch(n){case Cn:case ou:return{byteLength:1,components:1};case Xr:case cu:case pr:return{byteLength:2,components:1};case Zo:case Jo:return{byteLength:2,components:4};case Ri:case Ko:case En:return{byteLength:4,components:1};case lu:case uu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jo}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ru(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Zf(n){const e=new WeakMap;function t(o,l){const c=o.array,f=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,f),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const f=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,f);else{d.sort((h,_)=>h.start-_.start);let u=0;for(let h=1;h<d.length;h++){const _=d[u],M=d[h];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++u,d[u]=M)}d.length=u+1;for(let h=0,_=d.length;h<_;h++){const M=d[h];n.bufferSubData(c,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qf=`#ifdef USE_ALPHAHASH
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
#endif`,eh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,th=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ih=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rh=`#ifdef USE_AOMAP
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
#endif`,sh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ah=`#ifdef USE_BATCHING
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
#endif`,oh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ch=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dh=`#ifdef USE_IRIDESCENCE
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
#endif`,fh=`#ifdef USE_BUMPMAP
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
#endif`,hh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ph=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Mh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,bh=`#define PI 3.141592653589793
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
} // validated`,yh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sh=`vec3 transformedNormal = objectNormal;
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
#endif`,Eh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Th=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ah=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ch=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ph=`#ifdef USE_ENVMAP
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
#endif`,Lh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Dh=`#ifdef USE_ENVMAP
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
#endif`,Ih=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Uh=`#ifdef USE_ENVMAP
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
#endif`,Nh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Oh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zh=`#ifdef USE_GRADIENTMAP
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
}`,kh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hh=`uniform bool receiveShadow;
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
#endif`,Wh=`#ifdef USE_ENVMAP
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
#endif`,Xh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$h=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jh=`PhysicalMaterial material;
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
#endif`,Kh=`uniform sampler2D dfgLUT;
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
}`,Zh=`
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
#endif`,Jh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ip=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ap=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,op=`#if defined( USE_POINTS_UV )
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
#endif`,cp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,up=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`#ifdef USE_MORPHTARGETS
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
#endif`,pp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Mp=`#ifdef USE_NORMALMAP
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
#endif`,bp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ep=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ap=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Fp=`float getShadowMask() {
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
}`,Op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bp=`#ifdef USE_SKINNING
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
#endif`,zp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kp=`#ifdef USE_SKINNING
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
#endif`,Vp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xp=`#ifdef USE_TRANSMISSION
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
#endif`,qp=`#ifdef USE_TRANSMISSION
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
#endif`,$p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jp=`uniform sampler2D t2D;
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
}`,Qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,t0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i0=`#include <common>
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
}`,r0=`#if DEPTH_PACKING == 3200
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
}`,s0=`#define DISTANCE
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
}`,a0=`#define DISTANCE
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
}`,o0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,c0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l0=`uniform float scale;
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
}`,u0=`uniform vec3 diffuse;
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
}`,d0=`#include <common>
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
}`,f0=`uniform vec3 diffuse;
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
}`,h0=`#define LAMBERT
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
}`,p0=`#define LAMBERT
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
}`,m0=`#define MATCAP
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
}`,x0=`#define MATCAP
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
}`,g0=`#define NORMAL
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
}`,_0=`#define NORMAL
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
}`,v0=`#define PHONG
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
}`,M0=`#define PHONG
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
}`,b0=`#define STANDARD
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
}`,y0=`#define STANDARD
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
}`,S0=`#define TOON
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
}`,E0=`#define TOON
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
}`,T0=`uniform float size;
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
}`,A0=`uniform vec3 diffuse;
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
}`,w0=`#include <common>
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
}`,R0=`uniform vec3 color;
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
}`,C0=`uniform float rotation;
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
}`,P0=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Jf,alphahash_pars_fragment:Qf,alphamap_fragment:eh,alphamap_pars_fragment:th,alphatest_fragment:nh,alphatest_pars_fragment:ih,aomap_fragment:rh,aomap_pars_fragment:sh,batching_pars_vertex:ah,batching_vertex:oh,begin_vertex:ch,beginnormal_vertex:lh,bsdfs:uh,iridescence_fragment:dh,bumpmap_pars_fragment:fh,clipping_planes_fragment:hh,clipping_planes_pars_fragment:ph,clipping_planes_pars_vertex:mh,clipping_planes_vertex:xh,color_fragment:gh,color_pars_fragment:_h,color_pars_vertex:vh,color_vertex:Mh,common:bh,cube_uv_reflection_fragment:yh,defaultnormal_vertex:Sh,displacementmap_pars_vertex:Eh,displacementmap_vertex:Th,emissivemap_fragment:Ah,emissivemap_pars_fragment:wh,colorspace_fragment:Rh,colorspace_pars_fragment:Ch,envmap_fragment:Ph,envmap_common_pars_fragment:Lh,envmap_pars_fragment:Dh,envmap_pars_vertex:Ih,envmap_physical_pars_fragment:Wh,envmap_vertex:Uh,fog_vertex:Nh,fog_pars_vertex:Fh,fog_fragment:Oh,fog_pars_fragment:Bh,gradientmap_pars_fragment:zh,lightmap_pars_fragment:kh,lights_lambert_fragment:Vh,lights_lambert_pars_fragment:Gh,lights_pars_begin:Hh,lights_toon_fragment:Xh,lights_toon_pars_fragment:qh,lights_phong_fragment:$h,lights_phong_pars_fragment:Yh,lights_physical_fragment:jh,lights_physical_pars_fragment:Kh,lights_fragment_begin:Zh,lights_fragment_maps:Jh,lights_fragment_end:Qh,logdepthbuf_fragment:ep,logdepthbuf_pars_fragment:tp,logdepthbuf_pars_vertex:np,logdepthbuf_vertex:ip,map_fragment:rp,map_pars_fragment:sp,map_particle_fragment:ap,map_particle_pars_fragment:op,metalnessmap_fragment:cp,metalnessmap_pars_fragment:lp,morphinstance_vertex:up,morphcolor_vertex:dp,morphnormal_vertex:fp,morphtarget_pars_vertex:hp,morphtarget_vertex:pp,normal_fragment_begin:mp,normal_fragment_maps:xp,normal_pars_fragment:gp,normal_pars_vertex:_p,normal_vertex:vp,normalmap_pars_fragment:Mp,clearcoat_normal_fragment_begin:bp,clearcoat_normal_fragment_maps:yp,clearcoat_pars_fragment:Sp,iridescence_pars_fragment:Ep,opaque_fragment:Tp,packing:Ap,premultiplied_alpha_fragment:wp,project_vertex:Rp,dithering_fragment:Cp,dithering_pars_fragment:Pp,roughnessmap_fragment:Lp,roughnessmap_pars_fragment:Dp,shadowmap_pars_fragment:Ip,shadowmap_pars_vertex:Up,shadowmap_vertex:Np,shadowmask_pars_fragment:Fp,skinbase_vertex:Op,skinning_pars_vertex:Bp,skinning_vertex:zp,skinnormal_vertex:kp,specularmap_fragment:Vp,specularmap_pars_fragment:Gp,tonemapping_fragment:Hp,tonemapping_pars_fragment:Wp,transmission_fragment:Xp,transmission_pars_fragment:qp,uv_pars_fragment:$p,uv_pars_vertex:Yp,uv_vertex:jp,worldpos_vertex:Kp,background_vert:Zp,background_frag:Jp,backgroundCube_vert:Qp,backgroundCube_frag:e0,cube_vert:t0,cube_frag:n0,depth_vert:i0,depth_frag:r0,distanceRGBA_vert:s0,distanceRGBA_frag:a0,equirect_vert:o0,equirect_frag:c0,linedashed_vert:l0,linedashed_frag:u0,meshbasic_vert:d0,meshbasic_frag:f0,meshlambert_vert:h0,meshlambert_frag:p0,meshmatcap_vert:m0,meshmatcap_frag:x0,meshnormal_vert:g0,meshnormal_frag:_0,meshphong_vert:v0,meshphong_frag:M0,meshphysical_vert:b0,meshphysical_frag:y0,meshtoon_vert:S0,meshtoon_frag:E0,points_vert:T0,points_frag:A0,shadow_vert:w0,shadow_frag:R0,sprite_vert:C0,sprite_frag:P0},_e={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Sn={basic:{uniforms:Kt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Kt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Kt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Kt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Kt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Kt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Kt([_e.points,_e.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Kt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Kt([_e.common,_e.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Kt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Kt([_e.sprite,_e.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Kt([_e.common,_e.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Kt([_e.lights,_e.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Sn.physical={uniforms:Kt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Ps={r:0,b:0,g:0},bi=new Pn,L0=new vt;function D0(n,e,t,i,r,s,a){const o=new Qe(0);let l=s===!0?0:1,c,f,d=null,u=0,h=null;function _(E){let T=E.isScene===!0?E.background:null;return T&&T.isTexture&&(T=(E.backgroundBlurriness>0?t:e).get(T)),T}function M(E){let T=!1;const C=_(E);C===null?p(o,l):C&&C.isColor&&(p(C,1),T=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(E,T){const C=_(T);C&&(C.isCubeTexture||C.mapping===Qs)?(f===void 0&&(f=new yn(new gr(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:dr(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(S,D,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),bi.copy(T.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),f.material.uniforms.envMap.value=C,f.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(L0.makeRotationFromEuler(bi)),f.material.toneMapped=st.getTransfer(C.colorSpace)!==mt,(d!==C||u!==C.version||h!==n.toneMapping)&&(f.material.needsUpdate=!0,d=C,u=C.version,h=n.toneMapping),f.layers.enableAll(),E.unshift(f,f.geometry,f.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new yn(new ea(2,2),new $n({name:"BackgroundMaterial",uniforms:dr(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=st.getTransfer(C.colorSpace)!==mt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=C,u=C.version,h=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,T){E.getRGB(Ps,yu(n)),i.buffers.color.setClear(Ps.r,Ps.g,Ps.b,T,a)}function y(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,T=1){o.set(E),l=T,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(o,l)},render:M,addToRenderList:m,dispose:y}}function I0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(g,R,N,w,X){let K=!1;const $=d(w,N,R);s!==$&&(s=$,c(s.object)),K=h(g,w,N,X),K&&_(g,w,N,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,T(g,R,N,w),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return n.createVertexArray()}function c(g){return n.bindVertexArray(g)}function f(g){return n.deleteVertexArray(g)}function d(g,R,N){const w=N.wireframe===!0;let X=i[g.id];X===void 0&&(X={},i[g.id]=X);let K=X[R.id];K===void 0&&(K={},X[R.id]=K);let $=K[w];return $===void 0&&($=u(l()),K[w]=$),$}function u(g){const R=[],N=[],w=[];for(let X=0;X<t;X++)R[X]=0,N[X]=0,w[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:N,attributeDivisors:w,object:g,attributes:{},index:null}}function h(g,R,N,w){const X=s.attributes,K=R.attributes;let $=0;const ce=N.getAttributes();for(const q in ce)if(ce[q].location>=0){const fe=X[q];let De=K[q];if(De===void 0&&(q==="instanceMatrix"&&g.instanceMatrix&&(De=g.instanceMatrix),q==="instanceColor"&&g.instanceColor&&(De=g.instanceColor)),fe===void 0||fe.attribute!==De||De&&fe.data!==De.data)return!0;$++}return s.attributesNum!==$||s.index!==w}function _(g,R,N,w){const X={},K=R.attributes;let $=0;const ce=N.getAttributes();for(const q in ce)if(ce[q].location>=0){let fe=K[q];fe===void 0&&(q==="instanceMatrix"&&g.instanceMatrix&&(fe=g.instanceMatrix),q==="instanceColor"&&g.instanceColor&&(fe=g.instanceColor));const De={};De.attribute=fe,fe&&fe.data&&(De.data=fe.data),X[q]=De,$++}s.attributes=X,s.attributesNum=$,s.index=w}function M(){const g=s.newAttributes;for(let R=0,N=g.length;R<N;R++)g[R]=0}function m(g){p(g,0)}function p(g,R){const N=s.newAttributes,w=s.enabledAttributes,X=s.attributeDivisors;N[g]=1,w[g]===0&&(n.enableVertexAttribArray(g),w[g]=1),X[g]!==R&&(n.vertexAttribDivisor(g,R),X[g]=R)}function y(){const g=s.newAttributes,R=s.enabledAttributes;for(let N=0,w=R.length;N<w;N++)R[N]!==g[N]&&(n.disableVertexAttribArray(N),R[N]=0)}function E(g,R,N,w,X,K,$){$===!0?n.vertexAttribIPointer(g,R,N,X,K):n.vertexAttribPointer(g,R,N,w,X,K)}function T(g,R,N,w){M();const X=w.attributes,K=N.getAttributes(),$=R.defaultAttributeValues;for(const ce in K){const q=K[ce];if(q.location>=0){let se=X[ce];if(se===void 0&&(ce==="instanceMatrix"&&g.instanceMatrix&&(se=g.instanceMatrix),ce==="instanceColor"&&g.instanceColor&&(se=g.instanceColor)),se!==void 0){const fe=se.normalized,De=se.itemSize,je=e.get(se);if(je===void 0)continue;const ot=je.buffer,nt=je.type,ht=je.bytesPerElement,j=nt===n.INT||nt===n.UNSIGNED_INT||se.gpuType===Ko;if(se.isInterleavedBufferAttribute){const te=se.data,ve=te.stride,ke=se.offset;if(te.isInstancedInterleavedBuffer){for(let Ce=0;Ce<q.locationSize;Ce++)p(q.location+Ce,te.meshPerAttribute);g.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ce=0;Ce<q.locationSize;Ce++)m(q.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let Ce=0;Ce<q.locationSize;Ce++)E(q.location+Ce,De/q.locationSize,nt,fe,ve*ht,(ke+De/q.locationSize*Ce)*ht,j)}else{if(se.isInstancedBufferAttribute){for(let te=0;te<q.locationSize;te++)p(q.location+te,se.meshPerAttribute);g.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let te=0;te<q.locationSize;te++)m(q.location+te);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let te=0;te<q.locationSize;te++)E(q.location+te,De/q.locationSize,nt,fe,De*ht,De/q.locationSize*te*ht,j)}}else if($!==void 0){const fe=$[ce];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(q.location,fe);break;case 3:n.vertexAttrib3fv(q.location,fe);break;case 4:n.vertexAttrib4fv(q.location,fe);break;default:n.vertexAttrib1fv(q.location,fe)}}}}y()}function C(){z();for(const g in i){const R=i[g];for(const N in R){const w=R[N];for(const X in w)f(w[X].object),delete w[X];delete R[N]}delete i[g]}}function S(g){if(i[g.id]===void 0)return;const R=i[g.id];for(const N in R){const w=R[N];for(const X in w)f(w[X].object),delete w[X];delete R[N]}delete i[g.id]}function D(g){for(const R in i){const N=i[R];if(N[g.id]===void 0)continue;const w=N[g.id];for(const X in w)f(w[X].object),delete w[X];delete N[g.id]}}function z(){b(),a=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:z,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:S,releaseStatesOfProgram:D,initAttributes:M,enableAttribute:m,disableUnusedAttributes:y}}function U0(n,e,t){let i;function r(c){i=c}function s(c,f){n.drawArrays(i,c,f),t.update(f,i,1)}function a(c,f,d){d!==0&&(n.drawArraysInstanced(i,c,f,d),t.update(f,i,d))}function o(c,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,d);let h=0;for(let _=0;_<d;_++)h+=f[_];t.update(h,i,1)}function l(c,f,d,u){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)a(c[_],f[_],u[_]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,f,0,u,0,d);let _=0;for(let M=0;M<d;M++)_+=f[M]*u[M];t.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function N0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(D){return!(D!==vn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const z=D===pr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Cn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==En&&!z)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=l(c);f!==c&&(Ve("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,S=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:h,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:T,vertexTextures:C,maxSamples:S}}function F0(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ri,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const h=d.length!==0||u||i!==0||r;return r=u,i=d.length,h},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=f(d,u,0)},this.setState=function(d,u,h){const _=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||_===null||_.length===0||s&&!m)s?f(null):c();else{const y=s?0:i,E=y*4;let T=p.clippingState||null;l.value=T,T=f(_,u,E,h);for(let C=0;C!==E;++C)T[C]=t[C];p.clippingState=T,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,u,h,_){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=l.value,_!==!0||m===null){const p=h+M*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,T=h;E!==M;++E,T+=4)a.copy(d[E]).applyMatrix4(y,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}function O0(n){let e=new WeakMap;function t(a,o){return o===eo?a.mapping=or:o===to&&(a.mapping=cr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===eo||o===to)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nf(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const oi=4,gl=[.125,.215,.35,.446,.526,.582],Ei=20,B0=256,Ir=new hc,_l=new Qe;let Na=null,Fa=0,Oa=0,Ba=!1;const z0=new k;class vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=z0}=s;Na=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Na,Fa,Oa),this._renderer.xr.enabled=Ba,e.scissorTest=!1,ji(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===or||e.mapping===cr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Na=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:pr,format:vn,colorSpace:lr,depthBuffer:!1},r=Ml(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ml(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=k0(s)),this._blurMaterial=G0(s,e,t),this._ggxMaterial=V0(s,e,t)}return r}_compileMaterial(e){const t=new yn(new Jt,e);this._renderer.compile(t,Ir)}_sceneToCubeUV(e,t,i,r,s){const l=new en(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(_l),d.toneMapping=li,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new yn(new gr,new vu({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(_l),p=!0);for(let E=0;E<6;E++){const T=E%3;T===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[E],s.y,s.z)):T===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[E]));const C=this._cubeSize;ji(r,T*C,E>2?C:0,C,C),d.setRenderTarget(r),p&&d.render(M,l),d.render(e,l)}d.toneMapping=h,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===or||e.mapping===cr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=yl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ji(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ir)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-f*f),u=.05+c*.95,h=d*u,{_lodMax:_}=this,M=this._sizeLods[i],m=3*M*(i>_-oi?i-_+oi:0),p=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=_-t,ji(s,m,p,3*M,2*M),r.setRenderTarget(s),r.render(o,Ir),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,ji(e,m,p,3*M,2*M),r.setRenderTarget(e),r.render(o,Ir)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Et("blur direction must be either latitudinal or longitudinal!");const f=3,d=this._lodMeshes[r];d.material=c;const u=c.uniforms,h=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Ei-1),M=s/_,m=isFinite(s)?1+Math.floor(f*M):Ei;m>Ei&&Ve(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ei}`);const p=[];let y=0;for(let D=0;D<Ei;++D){const z=D/M,b=Math.exp(-z*z/2);p.push(b),D===0?y+=b:D<m&&(y+=2*b)}for(let D=0;D<p.length;D++)p[D]=p[D]/y;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=_,u.mipInt.value=E-i;const T=this._sizeLods[r],C=3*T*(r>E-oi?r-E+oi:0),S=4*(this._cubeSize-T);ji(t,C,S,3*T,2*T),l.setRenderTarget(t),l.render(d,Ir)}}function k0(n){const e=[],t=[],i=[];let r=n;const s=n-oi+1+gl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-oi?l=gl[a-n+oi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),f=-c,d=1+c,u=[f,f,d,f,d,d,f,f,d,d,f,d],h=6,_=6,M=3,m=2,p=1,y=new Float32Array(M*_*h),E=new Float32Array(m*_*h),T=new Float32Array(p*_*h);for(let S=0;S<h;S++){const D=S%3*2/3-1,z=S>2?0:-1,b=[D,z,0,D+2/3,z,0,D+2/3,z+1,0,D,z,0,D+2/3,z+1,0,D,z+1,0];y.set(b,M*_*S),E.set(u,m*_*S);const g=[S,S,S,S,S,S];T.set(g,p*_*S)}const C=new Jt;C.setAttribute("position",new bn(y,M)),C.setAttribute("uv",new bn(E,m)),C.setAttribute("faceIndex",new bn(T,p)),i.push(new yn(C,null)),r>oi&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ml(n,e,t){const i=new Ci(n,e,t);return i.texture.mapping=Qs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ji(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function V0(n,e,t){return new $n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:B0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:na(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function G0(n,e,t){const i=new Float32Array(Ei),r=new k(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:na(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function bl(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:na(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function yl(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function na(){return`

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
	`}function H0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===eo||l===to,f=l===or||l===cr;if(c||f){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new vl(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const h=o.image;return c&&h&&h.height>0||f&&h&&r(h)?(t===null&&(t=new vl(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0;const c=6;for(let f=0;f<c;f++)o[f]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function W0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&jr("WebGLRenderer: "+i+" extension not supported."),r}}}function X0(n,e,t,i){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete r[u.id];const h=s.get(u);h&&(e.remove(h),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const h in u)e.update(u[h],n.ARRAY_BUFFER)}function c(d){const u=[],h=d.index,_=d.attributes.position;let M=0;if(h!==null){const y=h.array;M=h.version;for(let E=0,T=y.length;E<T;E+=3){const C=y[E+0],S=y[E+1],D=y[E+2];u.push(C,S,S,D,D,C)}}else if(_!==void 0){const y=_.array;M=_.version;for(let E=0,T=y.length/3-1;E<T;E+=3){const C=E+0,S=E+1,D=E+2;u.push(C,S,S,D,D,C)}}else return;const m=new(mu(u)?bu:Mu)(u,1);m.version=M;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function f(d){const u=s.get(d);if(u){const h=d.index;h!==null&&u.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:f}}function q0(n,e,t){let i;function r(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,h){n.drawElements(i,h,s,u*a),t.update(h,i,1)}function c(u,h,_){_!==0&&(n.drawElementsInstanced(i,h,s,u*a,_),t.update(h,i,_))}function f(u,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,u,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,i,1)}function d(u,h,_,M){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/a,h[p],M[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,s,u,0,M,0,_);let p=0;for(let y=0;y<_;y++)p+=h[y]*M[y];t.update(p,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function $0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Et("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Y0(n,e,t){const i=new WeakMap,r=new xt;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=f!==void 0?f.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let b=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();const h=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let E=0;h===!0&&(E=1),_===!0&&(E=2),M===!0&&(E=3);let T=o.attributes.position.count*E,C=1;T>e.maxTextureSize&&(C=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const S=new Float32Array(T*C*4*d),D=new xu(S,T,C,d);D.type=En,D.needsUpdate=!0;const z=E*4;for(let g=0;g<d;g++){const R=m[g],N=p[g],w=y[g],X=T*C*4*g;for(let K=0;K<R.count;K++){const $=K*z;h===!0&&(r.fromBufferAttribute(R,K),S[X+$+0]=r.x,S[X+$+1]=r.y,S[X+$+2]=r.z,S[X+$+3]=0),_===!0&&(r.fromBufferAttribute(N,K),S[X+$+4]=r.x,S[X+$+5]=r.y,S[X+$+6]=r.z,S[X+$+7]=0),M===!0&&(r.fromBufferAttribute(w,K),S[X+$+8]=r.x,S[X+$+9]=r.y,S[X+$+10]=r.z,S[X+$+11]=w.itemSize===4?r.w:1)}}u={count:d,texture:D,size:new Ye(T,C)},i.set(o,u),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let h=0;for(let M=0;M<c.length;M++)h+=c[M];const _=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function j0(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;r.get(u)!==c&&(u.update(),r.set(u,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const Cu=new Zt,Sl=new Au(1,1),Pu=new xu,Lu=new _f,Du=new Eu,El=[],Tl=[],Al=new Float32Array(16),wl=new Float32Array(9),Rl=new Float32Array(4);function _r(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=El[r];if(s===void 0&&(s=new Float32Array(r),El[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ia(n,e){let t=Tl[e];t===void 0&&(t=new Int32Array(e),Tl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function K0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Z0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function J0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function Q0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function em(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;Rl.set(i),n.uniformMatrix2fv(this.addr,!1,Rl),Ot(t,i)}}function tm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;wl.set(i),n.uniformMatrix3fv(this.addr,!1,wl),Ot(t,i)}}function nm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;Al.set(i),n.uniformMatrix4fv(this.addr,!1,Al),Ot(t,i)}}function im(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function rm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function am(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function om(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function cm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function lm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function dm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Sl.compareFunction=pu,s=Sl):s=Cu,t.setTexture2D(e||s,r)}function fm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Lu,r)}function hm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Du,r)}function pm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Pu,r)}function mm(n){switch(n){case 5126:return K0;case 35664:return Z0;case 35665:return J0;case 35666:return Q0;case 35674:return em;case 35675:return tm;case 35676:return nm;case 5124:case 35670:return im;case 35667:case 35671:return rm;case 35668:case 35672:return sm;case 35669:case 35673:return am;case 5125:return om;case 36294:return cm;case 36295:return lm;case 36296:return um;case 35678:case 36198:case 36298:case 36306:case 35682:return dm;case 35679:case 36299:case 36307:return fm;case 35680:case 36300:case 36308:case 36293:return hm;case 36289:case 36303:case 36311:case 36292:return pm}}function xm(n,e){n.uniform1fv(this.addr,e)}function gm(n,e){const t=_r(e,this.size,2);n.uniform2fv(this.addr,t)}function _m(n,e){const t=_r(e,this.size,3);n.uniform3fv(this.addr,t)}function vm(n,e){const t=_r(e,this.size,4);n.uniform4fv(this.addr,t)}function Mm(n,e){const t=_r(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function bm(n,e){const t=_r(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ym(n,e){const t=_r(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Sm(n,e){n.uniform1iv(this.addr,e)}function Em(n,e){n.uniform2iv(this.addr,e)}function Tm(n,e){n.uniform3iv(this.addr,e)}function Am(n,e){n.uniform4iv(this.addr,e)}function wm(n,e){n.uniform1uiv(this.addr,e)}function Rm(n,e){n.uniform2uiv(this.addr,e)}function Cm(n,e){n.uniform3uiv(this.addr,e)}function Pm(n,e){n.uniform4uiv(this.addr,e)}function Lm(n,e,t){const i=this.cache,r=e.length,s=ia(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Cu,s[a])}function Dm(n,e,t){const i=this.cache,r=e.length,s=ia(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Lu,s[a])}function Im(n,e,t){const i=this.cache,r=e.length,s=ia(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Du,s[a])}function Um(n,e,t){const i=this.cache,r=e.length,s=ia(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Pu,s[a])}function Nm(n){switch(n){case 5126:return xm;case 35664:return gm;case 35665:return _m;case 35666:return vm;case 35674:return Mm;case 35675:return bm;case 35676:return ym;case 5124:case 35670:return Sm;case 35667:case 35671:return Em;case 35668:case 35672:return Tm;case 35669:case 35673:return Am;case 5125:return wm;case 36294:return Rm;case 36295:return Cm;case 36296:return Pm;case 35678:case 36198:case 36298:case 36306:case 35682:return Lm;case 35679:case 36299:case 36307:return Dm;case 35680:case 36300:case 36308:case 36293:return Im;case 36289:case 36303:case 36311:case 36292:return Um}}class Fm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=mm(t.type)}}class Om{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Nm(t.type)}}class Bm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const za=/(\w+)(\])?(\[|\.)?/g;function Cl(n,e){n.seq.push(e),n.map[e.id]=e}function zm(n,e,t){const i=n.name,r=i.length;for(za.lastIndex=0;;){const s=za.exec(i),a=za.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Cl(t,c===void 0?new Fm(o,n,e):new Om(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Bm(o),Cl(t,d)),t=d}}}class Fs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);zm(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Pl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const km=37297;let Vm=0;function Gm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Ll=new He;function Hm(n){st._getMatrix(Ll,st.workingColorSpace,n);const e=`mat3( ${Ll.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case Vs:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Dl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Gm(n.getShaderSource(e),o)}else return s}function Wm(n,e){const t=Hm(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Xm(n,e){let t;switch(e){case Ld:t="Linear";break;case Dd:t="Reinhard";break;case Id:t="Cineon";break;case su:t="ACESFilmic";break;case Nd:t="AgX";break;case Fd:t="Neutral";break;case Ud:t="Custom";break;default:Ve("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ls=new k;function qm(){st.getLuminanceCoefficients(Ls);const n=Ls.x.toFixed(4),e=Ls.y.toFixed(4),t=Ls.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $m(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ur).join(`
`)}function Ym(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function jm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ur(n){return n!==""}function Il(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ul(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Km=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uo(n){return n.replace(Km,Jm)}const Zm=new Map;function Jm(n,e){let t=Xe[e];if(t===void 0){const i=Zm.get(e);if(i!==void 0)t=Xe[i],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Uo(t)}const Qm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nl(n){return n.replace(Qm,ex)}function ex(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Fl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function tx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===iu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===ud?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Vn&&(e="SHADOWMAP_TYPE_VSM"),e}function nx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case or:case cr:e="ENVMAP_TYPE_CUBE";break;case Qs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ix(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case cr:e="ENVMAP_MODE_REFRACTION";break}return e}function rx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ru:e="ENVMAP_BLENDING_MULTIPLY";break;case Cd:e="ENVMAP_BLENDING_MIX";break;case Pd:e="ENVMAP_BLENDING_ADD";break}return e}function sx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ax(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=tx(t),c=nx(t),f=ix(t),d=rx(t),u=sx(t),h=$m(t),_=Ym(s),M=r.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ur).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ur).join(`
`),p.length>0&&(p+=`
`)):(m=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ur).join(`
`),p=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==li?"#define TONE_MAPPING":"",t.toneMapping!==li?Xe.tonemapping_pars_fragment:"",t.toneMapping!==li?Xm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Wm("linearToOutputTexel",t.outputColorSpace),qm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ur).join(`
`)),a=Uo(a),a=Il(a,t),a=Ul(a,t),o=Uo(o),o=Il(o,t),o=Ul(o,t),a=Nl(a),o=Nl(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===kc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=y+m+a,T=y+p+o,C=Pl(r,r.VERTEX_SHADER,E),S=Pl(r,r.FRAGMENT_SHADER,T);r.attachShader(M,C),r.attachShader(M,S),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function D(R){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(M)||"",w=r.getShaderInfoLog(C)||"",X=r.getShaderInfoLog(S)||"",K=N.trim(),$=w.trim(),ce=X.trim();let q=!0,se=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,M,C,S);else{const fe=Dl(r,C,"vertex"),De=Dl(r,S,"fragment");Et("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+K+`
`+fe+`
`+De)}else K!==""?Ve("WebGLProgram: Program Info Log:",K):($===""||ce==="")&&(se=!1);se&&(R.diagnostics={runnable:q,programLog:K,vertexShader:{log:$,prefix:m},fragmentShader:{log:ce,prefix:p}})}r.deleteShader(C),r.deleteShader(S),z=new Fs(r,M),b=jm(r,M)}let z;this.getUniforms=function(){return z===void 0&&D(this),z};let b;this.getAttributes=function(){return b===void 0&&D(this),b};let g=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=r.getProgramParameter(M,km)),g},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vm++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=C,this.fragmentShader=S,this}let ox=0;class cx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new lx(e),t.set(e,i)),i}}class lx{constructor(e){this.id=ox++,this.code=e,this.usedTimes=0}}function ux(n,e,t,i,r,s,a){const o=new ac,l=new cx,c=new Set,f=[],d=r.logarithmicDepthBuffer,u=r.vertexTextures;let h=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,g,R,N,w){const X=N.fog,K=w.geometry,$=b.isMeshStandardMaterial?N.environment:null,ce=(b.isMeshStandardMaterial?t:e).get(b.envMap||$),q=ce&&ce.mapping===Qs?ce.image.height:null,se=_[b.type];b.precision!==null&&(h=r.getMaxPrecision(b.precision),h!==b.precision&&Ve("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const fe=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,De=fe!==void 0?fe.length:0;let je=0;K.morphAttributes.position!==void 0&&(je=1),K.morphAttributes.normal!==void 0&&(je=2),K.morphAttributes.color!==void 0&&(je=3);let ot,nt,ht,j;if(se){const Ke=Sn[se];ot=Ke.vertexShader,nt=Ke.fragmentShader}else ot=b.vertexShader,nt=b.fragmentShader,l.update(b),ht=l.getVertexShaderID(b),j=l.getFragmentShaderID(b);const te=n.getRenderTarget(),ve=n.state.buffers.depth.getReversed(),ke=w.isInstancedMesh===!0,Ce=w.isBatchedMesh===!0,qe=!!b.map,At=!!b.matcap,We=!!ce,_t=!!b.aoMap,L=!!b.lightMap,Oe=!!b.bumpMap,$e=!!b.normalMap,ct=!!b.displacementMap,Me=!!b.emissiveMap,Mt=!!b.metalnessMap,we=!!b.roughnessMap,Be=b.anisotropy>0,A=b.clearcoat>0,v=b.dispersion>0,V=b.iridescence>0,Y=b.sheen>0,Q=b.transmission>0,H=Be&&!!b.anisotropyMap,Ee=A&&!!b.clearcoatMap,me=A&&!!b.clearcoatNormalMap,Ie=A&&!!b.clearcoatRoughnessMap,ye=V&&!!b.iridescenceMap,ne=V&&!!b.iridescenceThicknessMap,ae=Y&&!!b.sheenColorMap,Re=Y&&!!b.sheenRoughnessMap,Pe=!!b.specularMap,re=!!b.specularColorMap,Le=!!b.specularIntensityMap,I=Q&&!!b.transmissionMap,xe=Q&&!!b.thicknessMap,le=!!b.gradientMap,ue=!!b.alphaMap,ie=b.alphaTest>0,J=!!b.alphaHash,be=!!b.extensions;let Ue=li;b.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Ue=n.toneMapping);const pt={shaderID:se,shaderType:b.type,shaderName:b.name,vertexShader:ot,fragmentShader:nt,defines:b.defines,customVertexShaderID:ht,customFragmentShaderID:j,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:Ce,batchingColor:Ce&&w._colorsTexture!==null,instancing:ke,instancingColor:ke&&w.instanceColor!==null,instancingMorph:ke&&w.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:lr,alphaToCoverage:!!b.alphaToCoverage,map:qe,matcap:At,envMap:We,envMapMode:We&&ce.mapping,envMapCubeUVHeight:q,aoMap:_t,lightMap:L,bumpMap:Oe,normalMap:$e,displacementMap:u&&ct,emissiveMap:Me,normalMapObjectSpace:$e&&b.normalMapType===kd,normalMapTangentSpace:$e&&b.normalMapType===hu,metalnessMap:Mt,roughnessMap:we,anisotropy:Be,anisotropyMap:H,clearcoat:A,clearcoatMap:Ee,clearcoatNormalMap:me,clearcoatRoughnessMap:Ie,dispersion:v,iridescence:V,iridescenceMap:ye,iridescenceThicknessMap:ne,sheen:Y,sheenColorMap:ae,sheenRoughnessMap:Re,specularMap:Pe,specularColorMap:re,specularIntensityMap:Le,transmission:Q,transmissionMap:I,thicknessMap:xe,gradientMap:le,opaque:b.transparent===!1&&b.blending===er&&b.alphaToCoverage===!1,alphaMap:ue,alphaTest:ie,alphaHash:J,combine:b.combine,mapUv:qe&&M(b.map.channel),aoMapUv:_t&&M(b.aoMap.channel),lightMapUv:L&&M(b.lightMap.channel),bumpMapUv:Oe&&M(b.bumpMap.channel),normalMapUv:$e&&M(b.normalMap.channel),displacementMapUv:ct&&M(b.displacementMap.channel),emissiveMapUv:Me&&M(b.emissiveMap.channel),metalnessMapUv:Mt&&M(b.metalnessMap.channel),roughnessMapUv:we&&M(b.roughnessMap.channel),anisotropyMapUv:H&&M(b.anisotropyMap.channel),clearcoatMapUv:Ee&&M(b.clearcoatMap.channel),clearcoatNormalMapUv:me&&M(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&M(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&M(b.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&M(b.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&M(b.sheenColorMap.channel),sheenRoughnessMapUv:Re&&M(b.sheenRoughnessMap.channel),specularMapUv:Pe&&M(b.specularMap.channel),specularColorMapUv:re&&M(b.specularColorMap.channel),specularIntensityMapUv:Le&&M(b.specularIntensityMap.channel),transmissionMapUv:I&&M(b.transmissionMap.channel),thicknessMapUv:xe&&M(b.thicknessMap.channel),alphaMapUv:ue&&M(b.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&($e||Be),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!K.attributes.uv&&(qe||ue),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ve,skinning:w.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:je,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ue,decodeVideoTexture:qe&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===mt,decodeVideoTextureEmissive:Me&&b.emissiveMap.isVideoTexture===!0&&st.getTransfer(b.emissiveMap.colorSpace)===mt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Gn,flipSided:b.side===tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:be&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&b.extensions.multiDraw===!0||Ce)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function p(b){const g=[];if(b.shaderID?g.push(b.shaderID):(g.push(b.customVertexShaderID),g.push(b.customFragmentShaderID)),b.defines!==void 0)for(const R in b.defines)g.push(R),g.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(y(g,b),E(g,b),g.push(n.outputColorSpace)),g.push(b.customProgramCacheKey),g.join()}function y(b,g){b.push(g.precision),b.push(g.outputColorSpace),b.push(g.envMapMode),b.push(g.envMapCubeUVHeight),b.push(g.mapUv),b.push(g.alphaMapUv),b.push(g.lightMapUv),b.push(g.aoMapUv),b.push(g.bumpMapUv),b.push(g.normalMapUv),b.push(g.displacementMapUv),b.push(g.emissiveMapUv),b.push(g.metalnessMapUv),b.push(g.roughnessMapUv),b.push(g.anisotropyMapUv),b.push(g.clearcoatMapUv),b.push(g.clearcoatNormalMapUv),b.push(g.clearcoatRoughnessMapUv),b.push(g.iridescenceMapUv),b.push(g.iridescenceThicknessMapUv),b.push(g.sheenColorMapUv),b.push(g.sheenRoughnessMapUv),b.push(g.specularMapUv),b.push(g.specularColorMapUv),b.push(g.specularIntensityMapUv),b.push(g.transmissionMapUv),b.push(g.thicknessMapUv),b.push(g.combine),b.push(g.fogExp2),b.push(g.sizeAttenuation),b.push(g.morphTargetsCount),b.push(g.morphAttributeCount),b.push(g.numDirLights),b.push(g.numPointLights),b.push(g.numSpotLights),b.push(g.numSpotLightMaps),b.push(g.numHemiLights),b.push(g.numRectAreaLights),b.push(g.numDirLightShadows),b.push(g.numPointLightShadows),b.push(g.numSpotLightShadows),b.push(g.numSpotLightShadowsWithMaps),b.push(g.numLightProbes),b.push(g.shadowMapType),b.push(g.toneMapping),b.push(g.numClippingPlanes),b.push(g.numClipIntersection),b.push(g.depthPacking)}function E(b,g){o.disableAll(),g.supportsVertexTextures&&o.enable(0),g.instancing&&o.enable(1),g.instancingColor&&o.enable(2),g.instancingMorph&&o.enable(3),g.matcap&&o.enable(4),g.envMap&&o.enable(5),g.normalMapObjectSpace&&o.enable(6),g.normalMapTangentSpace&&o.enable(7),g.clearcoat&&o.enable(8),g.iridescence&&o.enable(9),g.alphaTest&&o.enable(10),g.vertexColors&&o.enable(11),g.vertexAlphas&&o.enable(12),g.vertexUv1s&&o.enable(13),g.vertexUv2s&&o.enable(14),g.vertexUv3s&&o.enable(15),g.vertexTangents&&o.enable(16),g.anisotropy&&o.enable(17),g.alphaHash&&o.enable(18),g.batching&&o.enable(19),g.dispersion&&o.enable(20),g.batchingColor&&o.enable(21),g.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),g.fog&&o.enable(0),g.useFog&&o.enable(1),g.flatShading&&o.enable(2),g.logarithmicDepthBuffer&&o.enable(3),g.reversedDepthBuffer&&o.enable(4),g.skinning&&o.enable(5),g.morphTargets&&o.enable(6),g.morphNormals&&o.enable(7),g.morphColors&&o.enable(8),g.premultipliedAlpha&&o.enable(9),g.shadowMapEnabled&&o.enable(10),g.doubleSided&&o.enable(11),g.flipSided&&o.enable(12),g.useDepthPacking&&o.enable(13),g.dithering&&o.enable(14),g.transmission&&o.enable(15),g.sheen&&o.enable(16),g.opaque&&o.enable(17),g.pointsUvs&&o.enable(18),g.decodeVideoTexture&&o.enable(19),g.decodeVideoTextureEmissive&&o.enable(20),g.alphaToCoverage&&o.enable(21),b.push(o.mask)}function T(b){const g=_[b.type];let R;if(g){const N=Sn[g];R=Lf.clone(N.uniforms)}else R=b.uniforms;return R}function C(b,g){let R;for(let N=0,w=f.length;N<w;N++){const X=f[N];if(X.cacheKey===g){R=X,++R.usedTimes;break}}return R===void 0&&(R=new ax(n,g,b,s),f.push(R)),R}function S(b){if(--b.usedTimes===0){const g=f.indexOf(b);f[g]=f[f.length-1],f.pop(),b.destroy()}}function D(b){l.remove(b)}function z(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:C,releaseProgram:S,releaseShaderCache:D,programs:f,dispose:z}}function dx(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function fx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ol(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Bl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d,u,h,_,M,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:h,groupOrder:_,renderOrder:d.renderOrder,z:M,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=M,p.group=m),e++,p}function o(d,u,h,_,M,m){const p=a(d,u,h,_,M,m);h.transmission>0?i.push(p):h.transparent===!0?r.push(p):t.push(p)}function l(d,u,h,_,M,m){const p=a(d,u,h,_,M,m);h.transmission>0?i.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||fx),i.length>1&&i.sort(u||Ol),r.length>1&&r.sort(u||Ol)}function f(){for(let d=e,u=n.length;d<u;d++){const h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:f,sort:c}}function hx(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Bl,n.set(i,[a])):r>=s.length?(a=new Bl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function px(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Qe};break;case"SpotLight":t={position:new k,direction:new k,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function mx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let xx=0;function gx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function _x(n){const e=new px,t=mx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new vt,a=new vt;function o(c){let f=0,d=0,u=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,_=0,M=0,m=0,p=0,y=0,E=0,T=0,C=0,S=0,D=0;c.sort(gx);for(let b=0,g=c.length;b<g;b++){const R=c[b],N=R.color,w=R.intensity,X=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)f+=N.r*w,d+=N.g*w,u+=N.b*w;else if(R.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(R.sh.coefficients[$],w);D++}else if(R.isDirectionalLight){const $=e.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const ce=R.shadow,q=t.get(R);q.shadowIntensity=ce.intensity,q.shadowBias=ce.bias,q.shadowNormalBias=ce.normalBias,q.shadowRadius=ce.radius,q.shadowMapSize=ce.mapSize,i.directionalShadow[h]=q,i.directionalShadowMap[h]=K,i.directionalShadowMatrix[h]=R.shadow.matrix,y++}i.directional[h]=$,h++}else if(R.isSpotLight){const $=e.get(R);$.position.setFromMatrixPosition(R.matrixWorld),$.color.copy(N).multiplyScalar(w),$.distance=X,$.coneCos=Math.cos(R.angle),$.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),$.decay=R.decay,i.spot[M]=$;const ce=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,ce.updateMatrices(R),R.castShadow&&S++),i.spotLightMatrix[M]=ce.matrix,R.castShadow){const q=t.get(R);q.shadowIntensity=ce.intensity,q.shadowBias=ce.bias,q.shadowNormalBias=ce.normalBias,q.shadowRadius=ce.radius,q.shadowMapSize=ce.mapSize,i.spotShadow[M]=q,i.spotShadowMap[M]=K,T++}M++}else if(R.isRectAreaLight){const $=e.get(R);$.color.copy(N).multiplyScalar(w),$.halfWidth.set(R.width*.5,0,0),$.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=$,m++}else if(R.isPointLight){const $=e.get(R);if($.color.copy(R.color).multiplyScalar(R.intensity),$.distance=R.distance,$.decay=R.decay,R.castShadow){const ce=R.shadow,q=t.get(R);q.shadowIntensity=ce.intensity,q.shadowBias=ce.bias,q.shadowNormalBias=ce.normalBias,q.shadowRadius=ce.radius,q.shadowMapSize=ce.mapSize,q.shadowCameraNear=ce.camera.near,q.shadowCameraFar=ce.camera.far,i.pointShadow[_]=q,i.pointShadowMap[_]=K,i.pointShadowMatrix[_]=R.shadow.matrix,E++}i.point[_]=$,_++}else if(R.isHemisphereLight){const $=e.get(R);$.skyColor.copy(R.color).multiplyScalar(w),$.groundColor.copy(R.groundColor).multiplyScalar(w),i.hemi[p]=$,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=u;const z=i.hash;(z.directionalLength!==h||z.pointLength!==_||z.spotLength!==M||z.rectAreaLength!==m||z.hemiLength!==p||z.numDirectionalShadows!==y||z.numPointShadows!==E||z.numSpotShadows!==T||z.numSpotMaps!==C||z.numLightProbes!==D)&&(i.directional.length=h,i.spot.length=M,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=T+C-S,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=D,z.directionalLength=h,z.pointLength=_,z.spotLength=M,z.rectAreaLength=m,z.hemiLength=p,z.numDirectionalShadows=y,z.numPointShadows=E,z.numSpotShadows=T,z.numSpotMaps=C,z.numLightProbes=D,i.version=xx++)}function l(c,f){let d=0,u=0,h=0,_=0,M=0;const m=f.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const E=c[p];if(E.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),d++}else if(E.isSpotLight){const T=i.spot[h];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),h++}else if(E.isRectAreaLight){const T=i.rectArea[_];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(m),a.identity(),s.copy(E.matrixWorld),s.premultiply(m),a.extractRotation(s),T.halfWidth.set(E.width*.5,0,0),T.halfHeight.set(0,E.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),_++}else if(E.isPointLight){const T=i.point[u];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const T=i.hemi[M];T.direction.setFromMatrixPosition(E.matrixWorld),T.direction.transformDirection(m),M++}}}return{setup:o,setupView:l,state:i}}function zl(n){const e=new _x(n),t=[],i=[];function r(f){c.camera=f,t.length=0,i.length=0}function s(f){t.push(f)}function a(f){i.push(f)}function o(){e.setup(t)}function l(f){e.setupView(t,f)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function vx(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new zl(n),e.set(r,[o])):s>=a.length?(o=new zl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Mx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bx=`uniform sampler2D shadow_pass;
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
}`;function yx(n,e,t){let i=new oc;const r=new Ye,s=new Ye,a=new xt,o=new Gf({depthPacking:zd}),l=new Hf,c={},f=t.maxTextureSize,d={[di]:tn,[tn]:di,[Gn]:Gn},u=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:Mx,fragmentShader:bx}),h=u.clone();h.defines.HORIZONTAL_PASS=1;const _=new Jt;_.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new yn(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=iu;let p=this.type;this.render=function(S,D,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const b=n.getRenderTarget(),g=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Wn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const w=p!==Vn&&this.type===Vn,X=p===Vn&&this.type!==Vn;for(let K=0,$=S.length;K<$;K++){const ce=S[K],q=ce.shadow;if(q===void 0){Ve("WebGLShadowMap:",ce,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const se=q.getFrameExtents();if(r.multiply(se),s.copy(q.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/se.x),r.x=s.x*se.x,q.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/se.y),r.y=s.y*se.y,q.mapSize.y=s.y)),q.map===null||w===!0||X===!0){const De=this.type!==Vn?{minFilter:un,magFilter:un}:{};q.map!==null&&q.map.dispose(),q.map=new Ci(r.x,r.y,De),q.map.texture.name=ce.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const fe=q.getViewportCount();for(let De=0;De<fe;De++){const je=q.getViewport(De);a.set(s.x*je.x,s.y*je.y,s.x*je.z,s.y*je.w),N.viewport(a),q.updateMatrices(ce,De),i=q.getFrustum(),T(D,z,q.camera,ce,this.type)}q.isPointLightShadow!==!0&&this.type===Vn&&y(q,z),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,g,R)};function y(S,D){const z=e.update(M);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,h.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ci(r.x,r.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(D,null,z,u,M,null),h.uniforms.shadow_pass.value=S.mapPass.texture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(D,null,z,h,M,null)}function E(S,D,z,b){let g=null;const R=z.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(R!==void 0)g=R;else if(g=z.isPointLight===!0?l:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const N=g.uuid,w=D.uuid;let X=c[N];X===void 0&&(X={},c[N]=X);let K=X[w];K===void 0&&(K=g.clone(),X[w]=K,D.addEventListener("dispose",C)),g=K}if(g.visible=D.visible,g.wireframe=D.wireframe,b===Vn?g.side=D.shadowSide!==null?D.shadowSide:D.side:g.side=D.shadowSide!==null?D.shadowSide:d[D.side],g.alphaMap=D.alphaMap,g.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,g.map=D.map,g.clipShadows=D.clipShadows,g.clippingPlanes=D.clippingPlanes,g.clipIntersection=D.clipIntersection,g.displacementMap=D.displacementMap,g.displacementScale=D.displacementScale,g.displacementBias=D.displacementBias,g.wireframeLinewidth=D.wireframeLinewidth,g.linewidth=D.linewidth,z.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const N=n.properties.get(g);N.light=z}return g}function T(S,D,z,b,g){if(S.visible===!1)return;if(S.layers.test(D.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&g===Vn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld);const w=e.update(S),X=S.material;if(Array.isArray(X)){const K=w.groups;for(let $=0,ce=K.length;$<ce;$++){const q=K[$],se=X[q.materialIndex];if(se&&se.visible){const fe=E(S,se,b,g);S.onBeforeShadow(n,S,D,z,w,fe,q),n.renderBufferDirect(z,null,w,fe,S,q),S.onAfterShadow(n,S,D,z,w,fe,q)}}}else if(X.visible){const K=E(S,X,b,g);S.onBeforeShadow(n,S,D,z,w,K,null),n.renderBufferDirect(z,null,w,K,S,null),S.onAfterShadow(n,S,D,z,w,K,null)}}const N=S.children;for(let w=0,X=N.length;w<X;w++)T(N[w],D,z,b,g)}function C(S){S.target.removeEventListener("dispose",C);for(const z in c){const b=c[z],g=S.target.uuid;g in b&&(b[g].dispose(),delete b[g])}}}const Sx={[$a]:Ya,[ja]:Ja,[Ka]:Qa,[ar]:Za,[Ya]:$a,[Ja]:ja,[Qa]:Ka,[Za]:ar};function Ex(n,e){function t(){let I=!1;const xe=new xt;let le=null;const ue=new xt(0,0,0,0);return{setMask:function(ie){le!==ie&&!I&&(n.colorMask(ie,ie,ie,ie),le=ie)},setLocked:function(ie){I=ie},setClear:function(ie,J,be,Ue,pt){pt===!0&&(ie*=Ue,J*=Ue,be*=Ue),xe.set(ie,J,be,Ue),ue.equals(xe)===!1&&(n.clearColor(ie,J,be,Ue),ue.copy(xe))},reset:function(){I=!1,le=null,ue.set(-1,0,0,0)}}}function i(){let I=!1,xe=!1,le=null,ue=null,ie=null;return{setReversed:function(J){if(xe!==J){const be=e.get("EXT_clip_control");J?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),xe=J;const Ue=ie;ie=null,this.setClear(Ue)}},getReversed:function(){return xe},setTest:function(J){J?te(n.DEPTH_TEST):ve(n.DEPTH_TEST)},setMask:function(J){le!==J&&!I&&(n.depthMask(J),le=J)},setFunc:function(J){if(xe&&(J=Sx[J]),ue!==J){switch(J){case $a:n.depthFunc(n.NEVER);break;case Ya:n.depthFunc(n.ALWAYS);break;case ja:n.depthFunc(n.LESS);break;case ar:n.depthFunc(n.LEQUAL);break;case Ka:n.depthFunc(n.EQUAL);break;case Za:n.depthFunc(n.GEQUAL);break;case Ja:n.depthFunc(n.GREATER);break;case Qa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=J}},setLocked:function(J){I=J},setClear:function(J){ie!==J&&(xe&&(J=1-J),n.clearDepth(J),ie=J)},reset:function(){I=!1,le=null,ue=null,ie=null,xe=!1}}}function r(){let I=!1,xe=null,le=null,ue=null,ie=null,J=null,be=null,Ue=null,pt=null;return{setTest:function(Ke){I||(Ke?te(n.STENCIL_TEST):ve(n.STENCIL_TEST))},setMask:function(Ke){xe!==Ke&&!I&&(n.stencilMask(Ke),xe=Ke)},setFunc:function(Ke,Qt,Bt){(le!==Ke||ue!==Qt||ie!==Bt)&&(n.stencilFunc(Ke,Qt,Bt),le=Ke,ue=Qt,ie=Bt)},setOp:function(Ke,Qt,Bt){(J!==Ke||be!==Qt||Ue!==Bt)&&(n.stencilOp(Ke,Qt,Bt),J=Ke,be=Qt,Ue=Bt)},setLocked:function(Ke){I=Ke},setClear:function(Ke){pt!==Ke&&(n.clearStencil(Ke),pt=Ke)},reset:function(){I=!1,xe=null,le=null,ue=null,ie=null,J=null,be=null,Ue=null,pt=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},d={},u=new WeakMap,h=[],_=null,M=!1,m=null,p=null,y=null,E=null,T=null,C=null,S=null,D=new Qe(0,0,0),z=0,b=!1,g=null,R=null,N=null,w=null,X=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ce=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=ce>=1):q.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=ce>=2);let se=null,fe={};const De=n.getParameter(n.SCISSOR_BOX),je=n.getParameter(n.VIEWPORT),ot=new xt().fromArray(De),nt=new xt().fromArray(je);function ht(I,xe,le,ue){const ie=new Uint8Array(4),J=n.createTexture();n.bindTexture(I,J),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<le;be++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,ue,0,n.RGBA,n.UNSIGNED_BYTE,ie):n.texImage2D(xe+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ie);return J}const j={};j[n.TEXTURE_2D]=ht(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=ht(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=ht(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=ht(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(n.DEPTH_TEST),a.setFunc(ar),Oe(!1),$e(Uc),te(n.CULL_FACE),_t(Wn);function te(I){f[I]!==!0&&(n.enable(I),f[I]=!0)}function ve(I){f[I]!==!1&&(n.disable(I),f[I]=!1)}function ke(I,xe){return d[I]!==xe?(n.bindFramebuffer(I,xe),d[I]=xe,I===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=xe),I===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ce(I,xe){let le=h,ue=!1;if(I){le=u.get(xe),le===void 0&&(le=[],u.set(xe,le));const ie=I.textures;if(le.length!==ie.length||le[0]!==n.COLOR_ATTACHMENT0){for(let J=0,be=ie.length;J<be;J++)le[J]=n.COLOR_ATTACHMENT0+J;le.length=ie.length,ue=!0}}else le[0]!==n.BACK&&(le[0]=n.BACK,ue=!0);ue&&n.drawBuffers(le)}function qe(I){return _!==I?(n.useProgram(I),_=I,!0):!1}const At={[Si]:n.FUNC_ADD,[fd]:n.FUNC_SUBTRACT,[hd]:n.FUNC_REVERSE_SUBTRACT};At[pd]=n.MIN,At[md]=n.MAX;const We={[xd]:n.ZERO,[gd]:n.ONE,[_d]:n.SRC_COLOR,[Xa]:n.SRC_ALPHA,[Ed]:n.SRC_ALPHA_SATURATE,[yd]:n.DST_COLOR,[Md]:n.DST_ALPHA,[vd]:n.ONE_MINUS_SRC_COLOR,[qa]:n.ONE_MINUS_SRC_ALPHA,[Sd]:n.ONE_MINUS_DST_COLOR,[bd]:n.ONE_MINUS_DST_ALPHA,[Td]:n.CONSTANT_COLOR,[Ad]:n.ONE_MINUS_CONSTANT_COLOR,[wd]:n.CONSTANT_ALPHA,[Rd]:n.ONE_MINUS_CONSTANT_ALPHA};function _t(I,xe,le,ue,ie,J,be,Ue,pt,Ke){if(I===Wn){M===!0&&(ve(n.BLEND),M=!1);return}if(M===!1&&(te(n.BLEND),M=!0),I!==dd){if(I!==m||Ke!==b){if((p!==Si||T!==Si)&&(n.blendEquation(n.FUNC_ADD),p=Si,T=Si),Ke)switch(I){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nc:n.blendFunc(n.ONE,n.ONE);break;case Fc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Oc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Et("WebGLState: Invalid blending: ",I);break}else switch(I){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Fc:Et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oc:Et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Et("WebGLState: Invalid blending: ",I);break}y=null,E=null,C=null,S=null,D.set(0,0,0),z=0,m=I,b=Ke}return}ie=ie||xe,J=J||le,be=be||ue,(xe!==p||ie!==T)&&(n.blendEquationSeparate(At[xe],At[ie]),p=xe,T=ie),(le!==y||ue!==E||J!==C||be!==S)&&(n.blendFuncSeparate(We[le],We[ue],We[J],We[be]),y=le,E=ue,C=J,S=be),(Ue.equals(D)===!1||pt!==z)&&(n.blendColor(Ue.r,Ue.g,Ue.b,pt),D.copy(Ue),z=pt),m=I,b=!1}function L(I,xe){I.side===Gn?ve(n.CULL_FACE):te(n.CULL_FACE);let le=I.side===tn;xe&&(le=!le),Oe(le),I.blending===er&&I.transparent===!1?_t(Wn):_t(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const ue=I.stencilWrite;o.setTest(ue),ue&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Me(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):ve(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(I){g!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),g=I)}function $e(I){I!==cd?(te(n.CULL_FACE),I!==R&&(I===Uc?n.cullFace(n.BACK):I===ld?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ve(n.CULL_FACE),R=I}function ct(I){I!==N&&($&&n.lineWidth(I),N=I)}function Me(I,xe,le){I?(te(n.POLYGON_OFFSET_FILL),(w!==xe||X!==le)&&(n.polygonOffset(xe,le),w=xe,X=le)):ve(n.POLYGON_OFFSET_FILL)}function Mt(I){I?te(n.SCISSOR_TEST):ve(n.SCISSOR_TEST)}function we(I){I===void 0&&(I=n.TEXTURE0+K-1),se!==I&&(n.activeTexture(I),se=I)}function Be(I,xe,le){le===void 0&&(se===null?le=n.TEXTURE0+K-1:le=se);let ue=fe[le];ue===void 0&&(ue={type:void 0,texture:void 0},fe[le]=ue),(ue.type!==I||ue.texture!==xe)&&(se!==le&&(n.activeTexture(le),se=le),n.bindTexture(I,xe||j[I]),ue.type=I,ue.texture=xe)}function A(){const I=fe[se];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function V(){try{n.compressedTexImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function Y(){try{n.texSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Q(){try{n.texSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Ee(){try{n.compressedTexSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function me(){try{n.texStorage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Ie(){try{n.texStorage3D(...arguments)}catch(I){I("WebGLState:",I)}}function ye(){try{n.texImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function ne(){try{n.texImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function ae(I){ot.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),ot.copy(I))}function Re(I){nt.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),nt.copy(I))}function Pe(I,xe){let le=c.get(xe);le===void 0&&(le=new WeakMap,c.set(xe,le));let ue=le.get(I);ue===void 0&&(ue=n.getUniformBlockIndex(xe,I.name),le.set(I,ue))}function re(I,xe){const ue=c.get(xe).get(I);l.get(xe)!==ue&&(n.uniformBlockBinding(xe,ue,I.__bindingPointIndex),l.set(xe,ue))}function Le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},se=null,fe={},d={},u=new WeakMap,h=[],_=null,M=!1,m=null,p=null,y=null,E=null,T=null,C=null,S=null,D=new Qe(0,0,0),z=0,b=!1,g=null,R=null,N=null,w=null,X=null,ot.set(0,0,n.canvas.width,n.canvas.height),nt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:ve,bindFramebuffer:ke,drawBuffers:Ce,useProgram:qe,setBlending:_t,setMaterial:L,setFlipSided:Oe,setCullFace:$e,setLineWidth:ct,setPolygonOffset:Me,setScissorTest:Mt,activeTexture:we,bindTexture:Be,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:V,texImage2D:ye,texImage3D:ne,updateUBOMapping:Pe,uniformBlockBinding:re,texStorage2D:me,texStorage3D:Ie,texSubImage2D:Y,texSubImage3D:Q,compressedTexSubImage2D:H,compressedTexSubImage3D:Ee,scissor:ae,viewport:Re,reset:Le}}function Tx(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ye,f=new WeakMap;let d;const u=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,v){return h?new OffscreenCanvas(A,v):Hs("canvas")}function M(A,v,V){let Y=1;const Q=Be(A);if((Q.width>V||Q.height>V)&&(Y=V/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const H=Math.floor(Y*Q.width),Ee=Math.floor(Y*Q.height);d===void 0&&(d=_(H,Ee));const me=v?_(H,Ee):d;return me.width=H,me.height=Ee,me.getContext("2d").drawImage(A,0,0,H,Ee),Ve("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+H+"x"+Ee+")."),me}else return"data"in A&&Ve("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){n.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(A,v,V,Y,Q=!1){if(A!==null){if(n[A]!==void 0)return n[A];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let H=v;if(v===n.RED&&(V===n.FLOAT&&(H=n.R32F),V===n.HALF_FLOAT&&(H=n.R16F),V===n.UNSIGNED_BYTE&&(H=n.R8)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(H=n.R8UI),V===n.UNSIGNED_SHORT&&(H=n.R16UI),V===n.UNSIGNED_INT&&(H=n.R32UI),V===n.BYTE&&(H=n.R8I),V===n.SHORT&&(H=n.R16I),V===n.INT&&(H=n.R32I)),v===n.RG&&(V===n.FLOAT&&(H=n.RG32F),V===n.HALF_FLOAT&&(H=n.RG16F),V===n.UNSIGNED_BYTE&&(H=n.RG8)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(H=n.RG8UI),V===n.UNSIGNED_SHORT&&(H=n.RG16UI),V===n.UNSIGNED_INT&&(H=n.RG32UI),V===n.BYTE&&(H=n.RG8I),V===n.SHORT&&(H=n.RG16I),V===n.INT&&(H=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(H=n.RGB8UI),V===n.UNSIGNED_SHORT&&(H=n.RGB16UI),V===n.UNSIGNED_INT&&(H=n.RGB32UI),V===n.BYTE&&(H=n.RGB8I),V===n.SHORT&&(H=n.RGB16I),V===n.INT&&(H=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),V===n.UNSIGNED_INT&&(H=n.RGBA32UI),V===n.BYTE&&(H=n.RGBA8I),V===n.SHORT&&(H=n.RGBA16I),V===n.INT&&(H=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(H=n.R11F_G11F_B10F)),v===n.RGBA){const Ee=Q?Vs:st.getTransfer(Y);V===n.FLOAT&&(H=n.RGBA32F),V===n.HALF_FLOAT&&(H=n.RGBA16F),V===n.UNSIGNED_BYTE&&(H=Ee===mt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function T(A,v){let V;return A?v===null||v===Ri||v===qr?V=n.DEPTH24_STENCIL8:v===En?V=n.DEPTH32F_STENCIL8:v===Xr&&(V=n.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ri||v===qr?V=n.DEPTH_COMPONENT24:v===En?V=n.DEPTH_COMPONENT32F:v===Xr&&(V=n.DEPTH_COMPONENT16),V}function C(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==un&&A.minFilter!==hn?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function S(A){const v=A.target;v.removeEventListener("dispose",S),z(v),v.isVideoTexture&&f.delete(v)}function D(A){const v=A.target;v.removeEventListener("dispose",D),g(v)}function z(A){const v=i.get(A);if(v.__webglInit===void 0)return;const V=A.source,Y=u.get(V);if(Y){const Q=Y[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(A),Object.keys(Y).length===0&&u.delete(V)}i.remove(A)}function b(A){const v=i.get(A);n.deleteTexture(v.__webglTexture);const V=A.source,Y=u.get(V);delete Y[v.__cacheKey],a.memory.textures--}function g(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let Q=0;Q<v.__webglFramebuffer[Y].length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[Y][Q]);else n.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)n.deleteFramebuffer(v.__webglFramebuffer[Y]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const V=A.textures;for(let Y=0,Q=V.length;Y<Q;Y++){const H=i.get(V[Y]);H.__webglTexture&&(n.deleteTexture(H.__webglTexture),a.memory.textures--),i.remove(V[Y])}i.remove(A)}let R=0;function N(){R=0}function w(){const A=R;return A>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),R+=1,A}function X(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function K(A,v){const V=i.get(A);if(A.isVideoTexture&&Mt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&V.__version!==A.version){const Y=A.image;if(Y===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{j(V,A,v);return}}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function $(A,v){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){j(V,A,v);return}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function ce(A,v){const V=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){j(V,A,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function q(A,v){const V=i.get(A);if(A.version>0&&V.__version!==A.version){te(V,A,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}const se={[no]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[io]:n.MIRRORED_REPEAT},fe={[un]:n.NEAREST,[Od]:n.NEAREST_MIPMAP_NEAREST,[us]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[ca]:n.LINEAR_MIPMAP_NEAREST,[Ti]:n.LINEAR_MIPMAP_LINEAR},De={[Vd]:n.NEVER,[$d]:n.ALWAYS,[Gd]:n.LESS,[pu]:n.LEQUAL,[Hd]:n.EQUAL,[qd]:n.GEQUAL,[Wd]:n.GREATER,[Xd]:n.NOTEQUAL};function je(A,v){if(v.type===En&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===hn||v.magFilter===ca||v.magFilter===us||v.magFilter===Ti||v.minFilter===hn||v.minFilter===ca||v.minFilter===us||v.minFilter===Ti)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,se[v.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,se[v.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,se[v.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,fe[v.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,fe[v.minFilter]),v.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,De[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===un||v.minFilter!==us&&v.minFilter!==Ti||v.type===En&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ot(A,v){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",S));const Y=v.source;let Q=u.get(Y);Q===void 0&&(Q={},u.set(Y,Q));const H=X(v);if(H!==A.__cacheKey){Q[H]===void 0&&(Q[H]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Q[H].usedTimes++;const Ee=Q[A.__cacheKey];Ee!==void 0&&(Q[A.__cacheKey].usedTimes--,Ee.usedTimes===0&&b(v)),A.__cacheKey=H,A.__webglTexture=Q[H].texture}return V}function nt(A,v,V){return Math.floor(Math.floor(A/V)/v)}function ht(A,v,V,Y){const H=A.updateRanges;if(H.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,Y,v.data);else{H.sort((ne,ae)=>ne.start-ae.start);let Ee=0;for(let ne=1;ne<H.length;ne++){const ae=H[Ee],Re=H[ne],Pe=ae.start+ae.count,re=nt(Re.start,v.width,4),Le=nt(ae.start,v.width,4);Re.start<=Pe+1&&re===Le&&nt(Re.start+Re.count-1,v.width,4)===re?ae.count=Math.max(ae.count,Re.start+Re.count-ae.start):(++Ee,H[Ee]=Re)}H.length=Ee+1;const me=n.getParameter(n.UNPACK_ROW_LENGTH),Ie=n.getParameter(n.UNPACK_SKIP_PIXELS),ye=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ne=0,ae=H.length;ne<ae;ne++){const Re=H[ne],Pe=Math.floor(Re.start/4),re=Math.ceil(Re.count/4),Le=Pe%v.width,I=Math.floor(Pe/v.width),xe=re,le=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Le),n.pixelStorei(n.UNPACK_SKIP_ROWS,I),t.texSubImage2D(n.TEXTURE_2D,0,Le,I,xe,le,V,Y,v.data)}A.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,me),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ie),n.pixelStorei(n.UNPACK_SKIP_ROWS,ye)}}function j(A,v,V){let Y=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=n.TEXTURE_3D);const Q=ot(A,v),H=v.source;t.bindTexture(Y,A.__webglTexture,n.TEXTURE0+V);const Ee=i.get(H);if(H.version!==Ee.__version||Q===!0){t.activeTexture(n.TEXTURE0+V);const me=st.getPrimaries(st.workingColorSpace),Ie=v.colorSpace===ai?null:st.getPrimaries(v.colorSpace),ye=v.colorSpace===ai||me===Ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let ne=M(v.image,!1,r.maxTextureSize);ne=we(v,ne);const ae=s.convert(v.format,v.colorSpace),Re=s.convert(v.type);let Pe=E(v.internalFormat,ae,Re,v.colorSpace,v.isVideoTexture);je(Y,v);let re;const Le=v.mipmaps,I=v.isVideoTexture!==!0,xe=Ee.__version===void 0||Q===!0,le=H.dataReady,ue=C(v,ne);if(v.isDepthTexture)Pe=T(v.format===Yr,v.type),xe&&(I?t.texStorage2D(n.TEXTURE_2D,1,Pe,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Pe,ne.width,ne.height,0,ae,Re,null));else if(v.isDataTexture)if(Le.length>0){I&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,Le[0].width,Le[0].height);for(let ie=0,J=Le.length;ie<J;ie++)re=Le[ie],I?le&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,re.width,re.height,ae,Re,re.data):t.texImage2D(n.TEXTURE_2D,ie,Pe,re.width,re.height,0,ae,Re,re.data);v.generateMipmaps=!1}else I?(xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,ne.width,ne.height),le&&ht(v,ne,ae,Re)):t.texImage2D(n.TEXTURE_2D,0,Pe,ne.width,ne.height,0,ae,Re,ne.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){I&&xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Pe,Le[0].width,Le[0].height,ne.depth);for(let ie=0,J=Le.length;ie<J;ie++)if(re=Le[ie],v.format!==vn)if(ae!==null)if(I){if(le)if(v.layerUpdates.size>0){const be=xl(re.width,re.height,v.format,v.type);for(const Ue of v.layerUpdates){const pt=re.data.subarray(Ue*be/re.data.BYTES_PER_ELEMENT,(Ue+1)*be/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,Ue,re.width,re.height,1,ae,pt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,re.width,re.height,ne.depth,ae,re.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ie,Pe,re.width,re.height,ne.depth,0,re.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?le&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,re.width,re.height,ne.depth,ae,Re,re.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ie,Pe,re.width,re.height,ne.depth,0,ae,Re,re.data)}else{I&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,Le[0].width,Le[0].height);for(let ie=0,J=Le.length;ie<J;ie++)re=Le[ie],v.format!==vn?ae!==null?I?le&&t.compressedTexSubImage2D(n.TEXTURE_2D,ie,0,0,re.width,re.height,ae,re.data):t.compressedTexImage2D(n.TEXTURE_2D,ie,Pe,re.width,re.height,0,re.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?le&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,re.width,re.height,ae,Re,re.data):t.texImage2D(n.TEXTURE_2D,ie,Pe,re.width,re.height,0,ae,Re,re.data)}else if(v.isDataArrayTexture)if(I){if(xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Pe,ne.width,ne.height,ne.depth),le)if(v.layerUpdates.size>0){const ie=xl(ne.width,ne.height,v.format,v.type);for(const J of v.layerUpdates){const be=ne.data.subarray(J*ie/ne.data.BYTES_PER_ELEMENT,(J+1)*ie/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,ae,Re,be)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ae,Re,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Pe,ne.width,ne.height,ne.depth,0,ae,Re,ne.data);else if(v.isData3DTexture)I?(xe&&t.texStorage3D(n.TEXTURE_3D,ue,Pe,ne.width,ne.height,ne.depth),le&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ae,Re,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Pe,ne.width,ne.height,ne.depth,0,ae,Re,ne.data);else if(v.isFramebufferTexture){if(xe)if(I)t.texStorage2D(n.TEXTURE_2D,ue,Pe,ne.width,ne.height);else{let ie=ne.width,J=ne.height;for(let be=0;be<ue;be++)t.texImage2D(n.TEXTURE_2D,be,Pe,ie,J,0,ae,Re,null),ie>>=1,J>>=1}}else if(Le.length>0){if(I&&xe){const ie=Be(Le[0]);t.texStorage2D(n.TEXTURE_2D,ue,Pe,ie.width,ie.height)}for(let ie=0,J=Le.length;ie<J;ie++)re=Le[ie],I?le&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,ae,Re,re):t.texImage2D(n.TEXTURE_2D,ie,Pe,ae,Re,re);v.generateMipmaps=!1}else if(I){if(xe){const ie=Be(ne);t.texStorage2D(n.TEXTURE_2D,ue,Pe,ie.width,ie.height)}le&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,Re,ne)}else t.texImage2D(n.TEXTURE_2D,0,Pe,ae,Re,ne);m(v)&&p(Y),Ee.__version=H.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function te(A,v,V){if(v.image.length!==6)return;const Y=ot(A,v),Q=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+V);const H=i.get(Q);if(Q.version!==H.__version||Y===!0){t.activeTexture(n.TEXTURE0+V);const Ee=st.getPrimaries(st.workingColorSpace),me=v.colorSpace===ai?null:st.getPrimaries(v.colorSpace),Ie=v.colorSpace===ai||Ee===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const ye=v.isCompressedTexture||v.image[0].isCompressedTexture,ne=v.image[0]&&v.image[0].isDataTexture,ae=[];for(let J=0;J<6;J++)!ye&&!ne?ae[J]=M(v.image[J],!0,r.maxCubemapSize):ae[J]=ne?v.image[J].image:v.image[J],ae[J]=we(v,ae[J]);const Re=ae[0],Pe=s.convert(v.format,v.colorSpace),re=s.convert(v.type),Le=E(v.internalFormat,Pe,re,v.colorSpace),I=v.isVideoTexture!==!0,xe=H.__version===void 0||Y===!0,le=Q.dataReady;let ue=C(v,Re);je(n.TEXTURE_CUBE_MAP,v);let ie;if(ye){I&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Le,Re.width,Re.height);for(let J=0;J<6;J++){ie=ae[J].mipmaps;for(let be=0;be<ie.length;be++){const Ue=ie[be];v.format!==vn?Pe!==null?I?le&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,Ue.width,Ue.height,Pe,Ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,Le,Ue.width,Ue.height,0,Ue.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,0,0,Ue.width,Ue.height,Pe,re,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be,Le,Ue.width,Ue.height,0,Pe,re,Ue.data)}}}else{if(ie=v.mipmaps,I&&xe){ie.length>0&&ue++;const J=Be(ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Le,J.width,J.height)}for(let J=0;J<6;J++)if(ne){I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ae[J].width,ae[J].height,Pe,re,ae[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Le,ae[J].width,ae[J].height,0,Pe,re,ae[J].data);for(let be=0;be<ie.length;be++){const pt=ie[be].image[J].image;I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,pt.width,pt.height,Pe,re,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,Le,pt.width,pt.height,0,Pe,re,pt.data)}}else{I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Pe,re,ae[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Le,Pe,re,ae[J]);for(let be=0;be<ie.length;be++){const Ue=ie[be];I?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,0,0,Pe,re,Ue.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,be+1,Le,Pe,re,Ue.image[J])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),H.__version=Q.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function ve(A,v,V,Y,Q,H){const Ee=s.convert(V.format,V.colorSpace),me=s.convert(V.type),Ie=E(V.internalFormat,Ee,me,V.colorSpace),ye=i.get(v),ne=i.get(V);if(ne.__renderTarget=v,!ye.__hasExternalTextures){const ae=Math.max(1,v.width>>H),Re=Math.max(1,v.height>>H);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,H,Ie,ae,Re,v.depth,0,Ee,me,null):t.texImage2D(Q,H,Ie,ae,Re,0,Ee,me,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Me(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,Q,ne.__webglTexture,0,ct(v)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,Q,ne.__webglTexture,H),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(A,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,A),v.depthBuffer){const Y=v.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,H=T(v.stencilBuffer,Q),Ee=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=ct(v);Me(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me,H,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,me,H,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,H,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,A)}else{const Y=v.textures;for(let Q=0;Q<Y.length;Q++){const H=Y[Q],Ee=s.convert(H.format,H.colorSpace),me=s.convert(H.type),Ie=E(H.internalFormat,Ee,me,H.colorSpace),ye=ct(v);V&&Me(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,Ie,v.width,v.height):Me(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ye,Ie,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Ie,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ce(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(v.depthTexture);Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const Q=Y.__webglTexture,H=ct(v);if(v.depthTexture.format===$r)Me(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(v.depthTexture.format===Yr)Me(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function qe(A){const v=i.get(A),V=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=Y}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");const Y=A.texture.mipmaps;Y&&Y.length>0?Ce(v.__webglFramebuffer[0],A):Ce(v.__webglFramebuffer,A)}else if(V){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=n.createRenderbuffer(),ke(v.__webglDepthbuffer[Y],A,!1);else{const Q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,H)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ke(v.__webglDepthbuffer,A,!1);else{const Q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,H)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function At(A,v,V){const Y=i.get(A);v!==void 0&&ve(Y.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&qe(A)}function We(A){const v=A.texture,V=i.get(A),Y=i.get(v);A.addEventListener("dispose",D);const Q=A.textures,H=A.isWebGLCubeRenderTarget===!0,Ee=Q.length>1;if(Ee||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=v.version,a.memory.textures++),H){V.__webglFramebuffer=[];for(let me=0;me<6;me++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[me]=[];for(let Ie=0;Ie<v.mipmaps.length;Ie++)V.__webglFramebuffer[me][Ie]=n.createFramebuffer()}else V.__webglFramebuffer[me]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let me=0;me<v.mipmaps.length;me++)V.__webglFramebuffer[me]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let me=0,Ie=Q.length;me<Ie;me++){const ye=i.get(Q[me]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Me(A)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let me=0;me<Q.length;me++){const Ie=Q[me];V.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[me]);const ye=s.convert(Ie.format,Ie.colorSpace),ne=s.convert(Ie.type),ae=E(Ie.internalFormat,ye,ne,Ie.colorSpace,A.isXRRenderTarget===!0),Re=ct(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,ae,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,V.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(H){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),je(n.TEXTURE_CUBE_MAP,v);for(let me=0;me<6;me++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ie=0;Ie<v.mipmaps.length;Ie++)ve(V.__webglFramebuffer[me][Ie],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie);else ve(V.__webglFramebuffer[me],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);m(v)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let me=0,Ie=Q.length;me<Ie;me++){const ye=Q[me],ne=i.get(ye);let ae=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ae=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,ne.__webglTexture),je(ae,ye),ve(V.__webglFramebuffer,A,ye,n.COLOR_ATTACHMENT0+me,ae,0),m(ye)&&p(ae)}t.unbindTexture()}else{let me=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(me=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,Y.__webglTexture),je(me,v),v.mipmaps&&v.mipmaps.length>0)for(let Ie=0;Ie<v.mipmaps.length;Ie++)ve(V.__webglFramebuffer[Ie],A,v,n.COLOR_ATTACHMENT0,me,Ie);else ve(V.__webglFramebuffer,A,v,n.COLOR_ATTACHMENT0,me,0);m(v)&&p(me),t.unbindTexture()}A.depthBuffer&&qe(A)}function _t(A){const v=A.textures;for(let V=0,Y=v.length;V<Y;V++){const Q=v[V];if(m(Q)){const H=y(A),Ee=i.get(Q).__webglTexture;t.bindTexture(H,Ee),p(H),t.unbindTexture()}}}const L=[],Oe=[];function $e(A){if(A.samples>0){if(Me(A)===!1){const v=A.textures,V=A.width,Y=A.height;let Q=n.COLOR_BUFFER_BIT;const H=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(A),me=v.length>1;if(me)for(let ye=0;ye<v.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const Ie=A.texture.mipmaps;Ie&&Ie.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let ye=0;ye<v.length;ye++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),me){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[ye]);const ne=i.get(v[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,V,Y,0,0,V,Y,Q,n.NEAREST),l===!0&&(L.length=0,Oe.length=0,L.push(n.COLOR_ATTACHMENT0+ye),A.depthBuffer&&A.resolveDepthBuffer===!1&&(L.push(H),Oe.push(H),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Oe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,L))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let ye=0;ye<v.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[ye]);const ne=i.get(v[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,ne,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const v=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function ct(A){return Math.min(r.maxSamples,A.samples)}function Me(A){const v=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Mt(A){const v=a.render.frame;f.get(A)!==v&&(f.set(A,v),A.update())}function we(A,v){const V=A.colorSpace,Y=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==lr&&V!==ai&&(st.getTransfer(V)===mt?(Y!==vn||Q!==Cn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Et("WebGLTextures: Unsupported texture color space:",V)),v}function Be(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=w,this.resetTextureUnits=N,this.setTexture2D=K,this.setTexture2DArray=$,this.setTexture3D=ce,this.setTextureCube=q,this.rebindTextures=At,this.setupRenderTarget=We,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=$e,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Me}function Ax(n,e){function t(i,r=ai){let s;const a=st.getTransfer(r);if(i===Cn)return n.UNSIGNED_BYTE;if(i===Zo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Jo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===lu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===uu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ou)return n.BYTE;if(i===cu)return n.SHORT;if(i===Xr)return n.UNSIGNED_SHORT;if(i===Ko)return n.INT;if(i===Ri)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===pr)return n.HALF_FLOAT;if(i===du)return n.ALPHA;if(i===fu)return n.RGB;if(i===vn)return n.RGBA;if(i===$r)return n.DEPTH_COMPONENT;if(i===Yr)return n.DEPTH_STENCIL;if(i===Qo)return n.RED;if(i===ec)return n.RED_INTEGER;if(i===tc)return n.RG;if(i===nc)return n.RG_INTEGER;if(i===ic)return n.RGBA_INTEGER;if(i===Ds||i===Is||i===Us||i===Ns)if(a===mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ds)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ds)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Us)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ns)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ro||i===so||i===ao||i===oo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ro)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===so)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ao)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===oo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===co||i===lo||i===uo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===co||i===lo)return a===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===uo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===fo||i===ho||i===po||i===mo||i===xo||i===go||i===_o||i===vo||i===Mo||i===bo||i===yo||i===So||i===Eo||i===To)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===fo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ho)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===po)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===go)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_o)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Mo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===yo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===So)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Eo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===To)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ao||i===wo||i===Ro)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ao)return a===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ro)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Co||i===Po||i===Lo||i===Do)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Co)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Po)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Lo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Do)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===qr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const wx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rx=`
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

}`;class Cx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new wu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new $n({vertexShader:wx,fragmentShader:Rx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new yn(new ea(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Px extends mr{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,d=null,u=null,h=null,_=null;const M=typeof XRWebGLBinding<"u",m=new Cx,p={},y=t.getContextAttributes();let E=null,T=null;const C=[],S=[],D=new Ye;let z=null;const b=new en;b.viewport=new xt;const g=new en;g.viewport=new xt;const R=[b,g],N=new Yf;let w=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let te=C[j];return te===void 0&&(te=new Ca,C[j]=te),te.getTargetRaySpace()},this.getControllerGrip=function(j){let te=C[j];return te===void 0&&(te=new Ca,C[j]=te),te.getGripSpace()},this.getHand=function(j){let te=C[j];return te===void 0&&(te=new Ca,C[j]=te),te.getHandSpace()};function K(j){const te=S.indexOf(j.inputSource);if(te===-1)return;const ve=C[te];ve!==void 0&&(ve.update(j.inputSource,j.frame,c||a),ve.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){r.removeEventListener("select",K),r.removeEventListener("selectstart",K),r.removeEventListener("selectend",K),r.removeEventListener("squeeze",K),r.removeEventListener("squeezestart",K),r.removeEventListener("squeezeend",K),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ce);for(let j=0;j<C.length;j++){const te=S[j];te!==null&&(S[j]=null,C[j].disconnect(te))}w=null,X=null,m.reset();for(const j in p)delete p[j];e.setRenderTarget(E),h=null,u=null,d=null,r=null,T=null,ht.stop(),i.isPresenting=!1,e.setPixelRatio(z),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",K),r.addEventListener("selectstart",K),r.addEventListener("selectend",K),r.addEventListener("squeeze",K),r.addEventListener("squeezestart",K),r.addEventListener("squeezeend",K),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ce),y.xrCompatible!==!0&&await t.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(D),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,ke=null,Ce=null;y.depth&&(Ce=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=y.stencil?Yr:$r,ke=y.stencil?qr:Ri);const qe={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(qe),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),T=new Ci(u.textureWidth,u.textureHeight,{format:vn,type:Cn,depthTexture:new Au(u.textureWidth,u.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ve={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,ve),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),T=new Ci(h.framebufferWidth,h.framebufferHeight,{format:vn,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ht.setContext(r),ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ce(j){for(let te=0;te<j.removed.length;te++){const ve=j.removed[te],ke=S.indexOf(ve);ke>=0&&(S[ke]=null,C[ke].disconnect(ve))}for(let te=0;te<j.added.length;te++){const ve=j.added[te];let ke=S.indexOf(ve);if(ke===-1){for(let qe=0;qe<C.length;qe++)if(qe>=S.length){S.push(ve),ke=qe;break}else if(S[qe]===null){S[qe]=ve,ke=qe;break}if(ke===-1)break}const Ce=C[ke];Ce&&Ce.connect(ve)}}const q=new k,se=new k;function fe(j,te,ve){q.setFromMatrixPosition(te.matrixWorld),se.setFromMatrixPosition(ve.matrixWorld);const ke=q.distanceTo(se),Ce=te.projectionMatrix.elements,qe=ve.projectionMatrix.elements,At=Ce[14]/(Ce[10]-1),We=Ce[14]/(Ce[10]+1),_t=(Ce[9]+1)/Ce[5],L=(Ce[9]-1)/Ce[5],Oe=(Ce[8]-1)/Ce[0],$e=(qe[8]+1)/qe[0],ct=At*Oe,Me=At*$e,Mt=ke/(-Oe+$e),we=Mt*-Oe;if(te.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(we),j.translateZ(Mt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ce[10]===-1)j.projectionMatrix.copy(te.projectionMatrix),j.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Be=At+Mt,A=We+Mt,v=ct-we,V=Me+(ke-we),Y=_t*We/A*Be,Q=L*We/A*Be;j.projectionMatrix.makePerspective(v,V,Y,Q,Be,A),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function De(j,te){te===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(te.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let te=j.near,ve=j.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),N.near=g.near=b.near=te,N.far=g.far=b.far=ve,(w!==N.near||X!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),w=N.near,X=N.far),N.layers.mask=j.layers.mask|6,b.layers.mask=N.layers.mask&3,g.layers.mask=N.layers.mask&5;const ke=j.parent,Ce=N.cameras;De(N,ke);for(let qe=0;qe<Ce.length;qe++)De(Ce[qe],ke);Ce.length===2?fe(N,b,g):N.projectionMatrix.copy(b.projectionMatrix),je(j,N,ke)};function je(j,te,ve){ve===null?j.matrix.copy(te.matrixWorld):(j.matrix.copy(ve.matrixWorld),j.matrix.invert(),j.matrix.multiply(te.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(te.projectionMatrix),j.projectionMatrixInverse.copy(te.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ur*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&h===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(j){return p[j]};let ot=null;function nt(j,te){if(f=te.getViewerPose(c||a),_=te,f!==null){const ve=f.views;h!==null&&(e.setRenderTargetFramebuffer(T,h.framebuffer),e.setRenderTarget(T));let ke=!1;ve.length!==N.cameras.length&&(N.cameras.length=0,ke=!0);for(let We=0;We<ve.length;We++){const _t=ve[We];let L=null;if(h!==null)L=h.getViewport(_t);else{const $e=d.getViewSubImage(u,_t);L=$e.viewport,We===0&&(e.setRenderTargetTextures(T,$e.colorTexture,$e.depthStencilTexture),e.setRenderTarget(T))}let Oe=R[We];Oe===void 0&&(Oe=new en,Oe.layers.enable(We),Oe.viewport=new xt,R[We]=Oe),Oe.matrix.fromArray(_t.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(_t.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(L.x,L.y,L.width,L.height),We===0&&(N.matrix.copy(Oe.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),ke===!0&&N.cameras.push(Oe)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){d=i.getBinding();const We=d.getDepthInformation(ve[0]);We&&We.isValid&&We.texture&&m.init(We,r.renderState)}if(Ce&&Ce.includes("camera-access")&&M){e.state.unbindTexture(),d=i.getBinding();for(let We=0;We<ve.length;We++){const _t=ve[We].camera;if(_t){let L=p[_t];L||(L=new wu,p[_t]=L);const Oe=d.getCameraImage(_t);L.sourceTexture=Oe}}}}for(let ve=0;ve<C.length;ve++){const ke=S[ve],Ce=C[ve];ke!==null&&Ce!==void 0&&Ce.update(ke,te,c||a)}ot&&ot(j,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),_=null}const ht=new Ru;ht.setAnimationLoop(nt),this.setAnimationLoop=function(j){ot=j},this.dispose=function(){}}}const yi=new Pn,Lx=new vt;function Dx(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,yu(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,E,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),f(m,p)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&h(m,p,T)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),M(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),E=y.envMap,T=y.envMapRotation;E&&(m.envMap.value=E,yi.copy(T),yi.x*=-1,yi.y*=-1,yi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),m.envMapRotation.value.setFromMatrix4(Lx.makeRotationFromEuler(yi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function f(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Ix(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,E){const T=E.program;i.uniformBlockBinding(y,T)}function c(y,E){let T=r[y.id];T===void 0&&(_(y),T=f(y),r[y.id]=T,y.addEventListener("dispose",m));const C=E.program;i.updateUBOMapping(y,C);const S=e.render.frame;s[y.id]!==S&&(u(y),s[y.id]=S)}function f(y){const E=d();y.__bindingPointIndex=E;const T=n.createBuffer(),C=y.__size,S=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,C,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,T),T}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const E=r[y.id],T=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let S=0,D=T.length;S<D;S++){const z=Array.isArray(T[S])?T[S]:[T[S]];for(let b=0,g=z.length;b<g;b++){const R=z[b];if(h(R,S,b,C)===!0){const N=R.__offset,w=Array.isArray(R.value)?R.value:[R.value];let X=0;for(let K=0;K<w.length;K++){const $=w[K],ce=M($);typeof $=="number"||typeof $=="boolean"?(R.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,N+X,R.__data)):$.isMatrix3?(R.__data[0]=$.elements[0],R.__data[1]=$.elements[1],R.__data[2]=$.elements[2],R.__data[3]=0,R.__data[4]=$.elements[3],R.__data[5]=$.elements[4],R.__data[6]=$.elements[5],R.__data[7]=0,R.__data[8]=$.elements[6],R.__data[9]=$.elements[7],R.__data[10]=$.elements[8],R.__data[11]=0):($.toArray(R.__data,X),X+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(y,E,T,C){const S=y.value,D=E+"_"+T;if(C[D]===void 0)return typeof S=="number"||typeof S=="boolean"?C[D]=S:C[D]=S.clone(),!0;{const z=C[D];if(typeof S=="number"||typeof S=="boolean"){if(z!==S)return C[D]=S,!0}else if(z.equals(S)===!1)return z.copy(S),!0}return!1}function _(y){const E=y.uniforms;let T=0;const C=16;for(let D=0,z=E.length;D<z;D++){const b=Array.isArray(E[D])?E[D]:[E[D]];for(let g=0,R=b.length;g<R;g++){const N=b[g],w=Array.isArray(N.value)?N.value:[N.value];for(let X=0,K=w.length;X<K;X++){const $=w[X],ce=M($),q=T%C,se=q%ce.boundary,fe=q+se;T+=se,fe!==0&&C-fe<ce.storage&&(T+=C-fe),N.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=T,T+=ce.storage}}}const S=T%C;return S>0&&(T+=C-S),y.__size=T,y.__cache={},this}function M(y){const E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ve("WebGLRenderer: Unsupported uniform value type.",y),E}function m(y){const E=y.target;E.removeEventListener("dispose",m);const T=a.indexOf(E.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function p(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}const Ux=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let kn=null;function Nx(){return kn===null&&(kn=new Tu(Ux,32,32,tc,pr),kn.minFilter=hn,kn.magFilter=hn,kn.wrapS=Hn,kn.wrapT=Hn,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn}class Fx{constructor(e={}){const{canvas:t=Yd(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const _=new Set([ic,nc,ec]),M=new Set([Cn,Ri,Xr,qr,Zo,Jo]),m=new Uint32Array(4),p=new Int32Array(4);let y=null,E=null;const T=[],C=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let D=!1;this._outputColorSpace=an;let z=0,b=0,g=null,R=-1,N=null;const w=new xt,X=new xt;let K=null;const $=new Qe(0);let ce=0,q=t.width,se=t.height,fe=1,De=null,je=null;const ot=new xt(0,0,q,se),nt=new xt(0,0,q,se);let ht=!1;const j=new oc;let te=!1,ve=!1;const ke=new vt,Ce=new k,qe=new xt,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function _t(){return g===null?fe:1}let L=i;function Oe(x,P){return t.getContext(x,P)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${jo}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",J,!1),t.addEventListener("webglcontextcreationerror",be,!1),L===null){const P="webgl2";if(L=Oe(P,x),L===null)throw Oe(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw x("WebGLRenderer: "+x.message),x}let $e,ct,Me,Mt,we,Be,A,v,V,Y,Q,H,Ee,me,Ie,ye,ne,ae,Re,Pe,re,Le,I,xe;function le(){$e=new W0(L),$e.init(),Le=new Ax(L,$e),ct=new N0(L,$e,e,Le),Me=new Ex(L,$e),ct.reversedDepthBuffer&&u&&Me.buffers.depth.setReversed(!0),Mt=new $0(L),we=new dx,Be=new Tx(L,$e,Me,we,ct,Le,Mt),A=new O0(S),v=new H0(S),V=new Zf(L),I=new I0(L,V),Y=new X0(L,V,Mt,I),Q=new j0(L,Y,V,Mt),Re=new Y0(L,ct,Be),ye=new F0(we),H=new ux(S,A,v,$e,ct,I,ye),Ee=new Dx(S,we),me=new hx,Ie=new vx($e),ae=new D0(S,A,v,Me,Q,h,l),ne=new yx(S,Q,ct),xe=new Ix(L,Mt,ct,Me),Pe=new U0(L,$e,Mt),re=new q0(L,$e,Mt),Mt.programs=H.programs,S.capabilities=ct,S.extensions=$e,S.properties=we,S.renderLists=me,S.shadowMap=ne,S.state=Me,S.info=Mt}le();const ue=new Px(S,L);this.xr=ue,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const x=$e.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=$e.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(x){x!==void 0&&(fe=x,this.setSize(q,se,!1))},this.getSize=function(x){return x.set(q,se)},this.setSize=function(x,P,F=!0){if(ue.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}q=x,se=P,t.width=Math.floor(x*fe),t.height=Math.floor(P*fe),F===!0&&(t.style.width=x+"px",t.style.height=P+"px"),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(q*fe,se*fe).floor()},this.setDrawingBufferSize=function(x,P,F){q=x,se=P,fe=F,t.width=Math.floor(x*F),t.height=Math.floor(P*F),this.setViewport(0,0,x,P)},this.getCurrentViewport=function(x){return x.copy(w)},this.getViewport=function(x){return x.copy(ot)},this.setViewport=function(x,P,F,G){x.isVector4?ot.set(x.x,x.y,x.z,x.w):ot.set(x,P,F,G),Me.viewport(w.copy(ot).multiplyScalar(fe).round())},this.getScissor=function(x){return x.copy(nt)},this.setScissor=function(x,P,F,G){x.isVector4?nt.set(x.x,x.y,x.z,x.w):nt.set(x,P,F,G),Me.scissor(X.copy(nt).multiplyScalar(fe).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(x){Me.setScissorTest(ht=x)},this.setOpaqueSort=function(x){De=x},this.setTransparentSort=function(x){je=x},this.getClearColor=function(x){return x.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(x=!0,P=!0,F=!0){let G=0;if(x){let O=!1;if(g!==null){const ee=g.texture.format;O=_.has(ee)}if(O){const ee=g.texture.type,he=M.has(ee),ge=ae.getClearColor(),pe=ae.getClearAlpha(),Se=ge.r,Ae=ge.g,oe=ge.b;he?(m[0]=Se,m[1]=Ae,m[2]=oe,m[3]=pe,L.clearBufferuiv(L.COLOR,0,m)):(p[0]=Se,p[1]=Ae,p[2]=oe,p[3]=pe,L.clearBufferiv(L.COLOR,0,p))}else G|=L.COLOR_BUFFER_BIT}P&&(G|=L.DEPTH_BUFFER_BIT),F&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",J,!1),t.removeEventListener("webglcontextcreationerror",be,!1),ae.dispose(),me.dispose(),Ie.dispose(),we.dispose(),A.dispose(),v.dispose(),Q.dispose(),I.dispose(),xe.dispose(),H.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",br),ue.removeEventListener("sessionend",Di),Vt.stop()};function ie(x){x.preventDefault(),Gc("WebGLRenderer: Context Lost."),D=!0}function J(){Gc("WebGLRenderer: Context Restored."),D=!1;const x=Mt.autoReset,P=ne.enabled,F=ne.autoUpdate,G=ne.needsUpdate,O=ne.type;le(),Mt.autoReset=x,ne.enabled=P,ne.autoUpdate=F,ne.needsUpdate=G,ne.type=O}function be(x){Et("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ue(x){const P=x.target;P.removeEventListener("dispose",Ue),pt(P)}function pt(x){Ke(x),we.remove(x)}function Ke(x){const P=we.get(x).programs;P!==void 0&&(P.forEach(function(F){H.releaseProgram(F)}),x.isShaderMaterial&&H.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,F,G,O,ee){P===null&&(P=At);const he=O.isMesh&&O.matrixWorld.determinant()<0,ge=oa(x,P,F,G,O);Me.setMaterial(G,he);let pe=F.index,Se=1;if(G.wireframe===!0){if(pe=Y.getWireframeAttribute(F),pe===void 0)return;Se=2}const Ae=F.drawRange,oe=F.attributes.position;let Fe=Ae.start*Se,Ze=(Ae.start+Ae.count)*Se;ee!==null&&(Fe=Math.max(Fe,ee.start*Se),Ze=Math.min(Ze,(ee.start+ee.count)*Se)),pe!==null?(Fe=Math.max(Fe,0),Ze=Math.min(Ze,pe.count)):oe!=null&&(Fe=Math.max(Fe,0),Ze=Math.min(Ze,oe.count));const at=Ze-Fe;if(at<0||at===1/0)return;I.setup(O,G,ge,F,pe);let lt,ut=Pe;if(pe!==null&&(lt=V.get(pe),ut=re,ut.setIndex(lt)),O.isMesh)G.wireframe===!0?(Me.setLineWidth(G.wireframeLinewidth*_t()),ut.setMode(L.LINES)):ut.setMode(L.TRIANGLES);else if(O.isLine){let Ne=G.linewidth;Ne===void 0&&(Ne=1),Me.setLineWidth(Ne*_t()),O.isLineSegments?ut.setMode(L.LINES):O.isLineLoop?ut.setMode(L.LINE_LOOP):ut.setMode(L.LINE_STRIP)}else O.isPoints?ut.setMode(L.POINTS):O.isSprite&&ut.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)jr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))ut.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ne=O._multiDrawStarts,dt=O._multiDrawCounts,et=O._multiDrawCount,Ht=pe?V.get(pe).bytesPerElement:1,Un=we.get(G).currentProgram.getUniforms();for(let Wt=0;Wt<et;Wt++)Un.setValue(L,"_gl_DrawID",Wt),ut.render(Ne[Wt]/Ht,dt[Wt])}else if(O.isInstancedMesh)ut.renderInstances(Fe,at,O.count);else if(F.isInstancedBufferGeometry){const Ne=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,dt=Math.min(F.instanceCount,Ne);ut.renderInstances(Fe,at,dt)}else ut.render(Fe,at)};function Qt(x,P,F){x.transparent===!0&&x.side===Gn&&x.forceSinglePass===!1?(x.side=tn,x.needsUpdate=!0,Kn(x,P,F),x.side=di,x.needsUpdate=!0,Kn(x,P,F),x.side=Gn):Kn(x,P,F)}this.compile=function(x,P,F=null){F===null&&(F=x),E=Ie.get(F),E.init(P),C.push(E),F.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(E.pushLight(O),O.castShadow&&E.pushShadow(O))}),x!==F&&x.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(E.pushLight(O),O.castShadow&&E.pushShadow(O))}),E.setupLights();const G=new Set;return x.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ee=O.material;if(ee)if(Array.isArray(ee))for(let he=0;he<ee.length;he++){const ge=ee[he];Qt(ge,F,O),G.add(ge)}else Qt(ee,F,O),G.add(ee)}),E=C.pop(),G},this.compileAsync=function(x,P,F=null){const G=this.compile(x,P,F);return new Promise(O=>{function ee(){if(G.forEach(function(he){we.get(he).currentProgram.isReady()&&G.delete(he)}),G.size===0){O(x);return}setTimeout(ee,10)}$e.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let Bt=null;function Yn(x){Bt&&Bt(x)}function br(){Vt.stop()}function Di(){Vt.start()}const Vt=new Ru;Vt.setAnimationLoop(Yn),typeof self<"u"&&Vt.setContext(self),this.setAnimationLoop=function(x){Bt=x,ue.setAnimationLoop(x),x===null?Vt.stop():Vt.start()},ue.addEventListener("sessionstart",br),ue.addEventListener("sessionend",Di),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){Et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(P),P=ue.getCamera()),x.isScene===!0&&x.onBeforeRender(S,x,P,g),E=Ie.get(x,C.length),E.init(P),C.push(E),ke.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),j.setFromProjectionMatrix(ke,Tn,P.reversedDepth),ve=this.localClippingEnabled,te=ye.init(this.clippingPlanes,ve),y=me.get(x,T.length),y.init(),T.push(y),ue.enabled===!0&&ue.isPresenting===!0){const ee=S.xr.getDepthSensingMesh();ee!==null&&yr(ee,P,-1/0,S.sortObjects)}yr(x,P,0,S.sortObjects),y.finish(),S.sortObjects===!0&&y.sort(De,je),We=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,We&&ae.addToRenderList(y,x),this.info.render.frame++,te===!0&&ye.beginShadows();const F=E.state.shadowsArray;ne.render(F,x,P),te===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=y.opaque,O=y.transmissive;if(E.setupLights(),P.isArrayCamera){const ee=P.cameras;if(O.length>0)for(let he=0,ge=ee.length;he<ge;he++){const pe=ee[he];jn(G,O,x,pe)}We&&ae.render(x);for(let he=0,ge=ee.length;he<ge;he++){const pe=ee[he];pi(y,x,pe,pe.viewport)}}else O.length>0&&jn(G,O,x,P),We&&ae.render(x),pi(y,x,P);g!==null&&b===0&&(Be.updateMultisampleRenderTarget(g),Be.updateRenderTargetMipmap(g)),x.isScene===!0&&x.onAfterRender(S,x,P),I.resetDefaultState(),R=-1,N=null,C.pop(),C.length>0?(E=C[C.length-1],te===!0&&ye.setGlobalState(S.clippingPlanes,E.state.camera)):E=null,T.pop(),T.length>0?y=T[T.length-1]:y=null};function yr(x,P,F,G){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)F=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)E.pushLight(x),x.castShadow&&E.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||j.intersectsSprite(x)){G&&qe.setFromMatrixPosition(x.matrixWorld).applyMatrix4(ke);const he=Q.update(x),ge=x.material;ge.visible&&y.push(x,he,ge,F,qe.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||j.intersectsObject(x))){const he=Q.update(x),ge=x.material;if(G&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),qe.copy(x.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),qe.copy(he.boundingSphere.center)),qe.applyMatrix4(x.matrixWorld).applyMatrix4(ke)),Array.isArray(ge)){const pe=he.groups;for(let Se=0,Ae=pe.length;Se<Ae;Se++){const oe=pe[Se],Fe=ge[oe.materialIndex];Fe&&Fe.visible&&y.push(x,he,Fe,F,qe.z,oe)}}else ge.visible&&y.push(x,he,ge,F,qe.z,null)}}const ee=x.children;for(let he=0,ge=ee.length;he<ge;he++)yr(ee[he],P,F,G)}function pi(x,P,F,G){const{opaque:O,transmissive:ee,transparent:he}=x;E.setupLightsView(F),te===!0&&ye.setGlobalState(S.clippingPlanes,F),G&&Me.viewport(w.copy(G)),O.length>0&&In(O,P,F),ee.length>0&&In(ee,P,F),he.length>0&&In(he,P,F),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function jn(x,P,F,G){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;E.state.transmissionRenderTarget[G.id]===void 0&&(E.state.transmissionRenderTarget[G.id]=new Ci(1,1,{generateMipmaps:!0,type:$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float")?pr:Cn,minFilter:Ti,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const ee=E.state.transmissionRenderTarget[G.id],he=G.viewport||w;ee.setSize(he.z*S.transmissionResolutionScale,he.w*S.transmissionResolutionScale);const ge=S.getRenderTarget(),pe=S.getActiveCubeFace(),Se=S.getActiveMipmapLevel();S.setRenderTarget(ee),S.getClearColor($),ce=S.getClearAlpha(),ce<1&&S.setClearColor(16777215,.5),S.clear(),We&&ae.render(F);const Ae=S.toneMapping;S.toneMapping=li;const oe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),te===!0&&ye.setGlobalState(S.clippingPlanes,G),In(x,F,G),Be.updateMultisampleRenderTarget(ee),Be.updateRenderTargetMipmap(ee),$e.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let Ze=0,at=P.length;Ze<at;Ze++){const lt=P[Ze],{object:ut,geometry:Ne,material:dt,group:et}=lt;if(dt.side===Gn&&ut.layers.test(G.layers)){const Ht=dt.side;dt.side=tn,dt.needsUpdate=!0,is(ut,F,G,Ne,dt,et),dt.side=Ht,dt.needsUpdate=!0,Fe=!0}}Fe===!0&&(Be.updateMultisampleRenderTarget(ee),Be.updateRenderTargetMipmap(ee))}S.setRenderTarget(ge,pe,Se),S.setClearColor($,ce),oe!==void 0&&(G.viewport=oe),S.toneMapping=Ae}function In(x,P,F){const G=P.isScene===!0?P.overrideMaterial:null;for(let O=0,ee=x.length;O<ee;O++){const he=x[O],{object:ge,geometry:pe,group:Se}=he;let Ae=he.material;Ae.allowOverride===!0&&G!==null&&(Ae=G),ge.layers.test(F.layers)&&is(ge,P,F,pe,Ae,Se)}}function is(x,P,F,G,O,ee){x.onBeforeRender(S,P,F,G,O,ee),x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),O.onBeforeRender(S,P,F,G,x,ee),O.transparent===!0&&O.side===Gn&&O.forceSinglePass===!1?(O.side=tn,O.needsUpdate=!0,S.renderBufferDirect(F,P,G,O,x,ee),O.side=di,O.needsUpdate=!0,S.renderBufferDirect(F,P,G,O,x,ee),O.side=Gn):S.renderBufferDirect(F,P,G,O,x,ee),x.onAfterRender(S,P,F,G,O,ee)}function Kn(x,P,F){P.isScene!==!0&&(P=At);const G=we.get(x),O=E.state.lights,ee=E.state.shadowsArray,he=O.state.version,ge=H.getParameters(x,O.state,ee,P,F),pe=H.getProgramCacheKey(ge);let Se=G.programs;G.environment=x.isMeshStandardMaterial?P.environment:null,G.fog=P.fog,G.envMap=(x.isMeshStandardMaterial?v:A).get(x.envMap||G.environment),G.envMapRotation=G.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,Se===void 0&&(x.addEventListener("dispose",Ue),Se=new Map,G.programs=Se);let Ae=Se.get(pe);if(Ae!==void 0){if(G.currentProgram===Ae&&G.lightsStateVersion===he)return ss(x,ge),Ae}else ge.uniforms=H.getUniforms(x),x.onBeforeCompile(ge,S),Ae=H.acquireProgram(ge,pe),Se.set(pe,Ae),G.uniforms=ge.uniforms;const oe=G.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(oe.clippingPlanes=ye.uniform),ss(x,ge),G.needsLights=os(x),G.lightsStateVersion=he,G.needsLights&&(oe.ambientLightColor.value=O.state.ambient,oe.lightProbe.value=O.state.probe,oe.directionalLights.value=O.state.directional,oe.directionalLightShadows.value=O.state.directionalShadow,oe.spotLights.value=O.state.spot,oe.spotLightShadows.value=O.state.spotShadow,oe.rectAreaLights.value=O.state.rectArea,oe.ltc_1.value=O.state.rectAreaLTC1,oe.ltc_2.value=O.state.rectAreaLTC2,oe.pointLights.value=O.state.point,oe.pointLightShadows.value=O.state.pointShadow,oe.hemisphereLights.value=O.state.hemi,oe.directionalShadowMap.value=O.state.directionalShadowMap,oe.directionalShadowMatrix.value=O.state.directionalShadowMatrix,oe.spotShadowMap.value=O.state.spotShadowMap,oe.spotLightMatrix.value=O.state.spotLightMatrix,oe.spotLightMap.value=O.state.spotLightMap,oe.pointShadowMap.value=O.state.pointShadowMap,oe.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=Ae,G.uniformsList=null,Ae}function rs(x){if(x.uniformsList===null){const P=x.currentProgram.getUniforms();x.uniformsList=Fs.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function ss(x,P){const F=we.get(x);F.outputColorSpace=P.outputColorSpace,F.batching=P.batching,F.batchingColor=P.batchingColor,F.instancing=P.instancing,F.instancingColor=P.instancingColor,F.instancingMorph=P.instancingMorph,F.skinning=P.skinning,F.morphTargets=P.morphTargets,F.morphNormals=P.morphNormals,F.morphColors=P.morphColors,F.morphTargetsCount=P.morphTargetsCount,F.numClippingPlanes=P.numClippingPlanes,F.numIntersection=P.numClipIntersection,F.vertexAlphas=P.vertexAlphas,F.vertexTangents=P.vertexTangents,F.toneMapping=P.toneMapping}function oa(x,P,F,G,O){P.isScene!==!0&&(P=At),Be.resetTextureUnits();const ee=P.fog,he=G.isMeshStandardMaterial?P.environment:null,ge=g===null?S.outputColorSpace:g.isXRRenderTarget===!0?g.texture.colorSpace:lr,pe=(G.isMeshStandardMaterial?v:A).get(G.envMap||he),Se=G.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ae=!!F.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),oe=!!F.morphAttributes.position,Fe=!!F.morphAttributes.normal,Ze=!!F.morphAttributes.color;let at=li;G.toneMapped&&(g===null||g.isXRRenderTarget===!0)&&(at=S.toneMapping);const lt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ut=lt!==void 0?lt.length:0,Ne=we.get(G),dt=E.state.lights;if(te===!0&&(ve===!0||x!==N)){const ft=x===N&&G.id===R;ye.setState(G,x,ft)}let et=!1;G.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==dt.state.version||Ne.outputColorSpace!==ge||O.isBatchedMesh&&Ne.batching===!1||!O.isBatchedMesh&&Ne.batching===!0||O.isBatchedMesh&&Ne.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ne.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ne.instancing===!1||!O.isInstancedMesh&&Ne.instancing===!0||O.isSkinnedMesh&&Ne.skinning===!1||!O.isSkinnedMesh&&Ne.skinning===!0||O.isInstancedMesh&&Ne.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ne.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ne.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ne.instancingMorph===!1&&O.morphTexture!==null||Ne.envMap!==pe||G.fog===!0&&Ne.fog!==ee||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ye.numPlanes||Ne.numIntersection!==ye.numIntersection)||Ne.vertexAlphas!==Se||Ne.vertexTangents!==Ae||Ne.morphTargets!==oe||Ne.morphNormals!==Fe||Ne.morphColors!==Ze||Ne.toneMapping!==at||Ne.morphTargetsCount!==ut)&&(et=!0):(et=!0,Ne.__version=G.version);let Ht=Ne.currentProgram;et===!0&&(Ht=Kn(G,P,O));let Un=!1,Wt=!1,Zn=!1;const bt=Ht.getUniforms(),Te=Ne.uniforms;if(Me.useProgram(Ht.program)&&(Un=!0,Wt=!0,Zn=!0),G.id!==R&&(R=G.id,Wt=!0),Un||N!==x){Me.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),bt.setValue(L,"projectionMatrix",x.projectionMatrix),bt.setValue(L,"viewMatrix",x.matrixWorldInverse);const ze=bt.map.cameraPosition;ze!==void 0&&ze.setValue(L,Ce.setFromMatrixPosition(x.matrixWorld)),ct.logarithmicDepthBuffer&&bt.setValue(L,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&bt.setValue(L,"isOrthographic",x.isOrthographicCamera===!0),N!==x&&(N=x,Wt=!0,Zn=!0)}if(O.isSkinnedMesh){bt.setOptional(L,O,"bindMatrix"),bt.setOptional(L,O,"bindMatrixInverse");const ft=O.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),bt.setValue(L,"boneTexture",ft.boneTexture,Be))}O.isBatchedMesh&&(bt.setOptional(L,O,"batchingTexture"),bt.setValue(L,"batchingTexture",O._matricesTexture,Be),bt.setOptional(L,O,"batchingIdTexture"),bt.setValue(L,"batchingIdTexture",O._indirectTexture,Be),bt.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&bt.setValue(L,"batchingColorTexture",O._colorsTexture,Be));const it=F.morphAttributes;if((it.position!==void 0||it.normal!==void 0||it.color!==void 0)&&Re.update(O,F,Ht),(Wt||Ne.receiveShadow!==O.receiveShadow)&&(Ne.receiveShadow=O.receiveShadow,bt.setValue(L,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Te.envMap.value=pe,Te.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&P.environment!==null&&(Te.envMapIntensity.value=P.environmentIntensity),Te.dfgLUT!==void 0&&(Te.dfgLUT.value=Nx()),Wt&&(bt.setValue(L,"toneMappingExposure",S.toneMappingExposure),Ne.needsLights&&as(Te,Zn),ee&&G.fog===!0&&Ee.refreshFogUniforms(Te,ee),Ee.refreshMaterialUniforms(Te,G,fe,se,E.state.transmissionRenderTarget[x.id]),Fs.upload(L,rs(Ne),Te,Be)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Fs.upload(L,rs(Ne),Te,Be),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&bt.setValue(L,"center",O.center),bt.setValue(L,"modelViewMatrix",O.modelViewMatrix),bt.setValue(L,"normalMatrix",O.normalMatrix),bt.setValue(L,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const ft=G.uniformsGroups;for(let ze=0,Yt=ft.length;ze<Yt;ze++){const wt=ft[ze];xe.update(wt,Ht),xe.bind(wt,Ht)}}return Ht}function as(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function os(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return g},this.setRenderTargetTextures=function(x,P,F){const G=we.get(x);G.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),we.get(x.texture).__webglTexture=P,we.get(x.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:F,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,P){const F=we.get(x);F.__webglFramebuffer=P,F.__useDefaultFramebuffer=P===void 0};const B=L.createFramebuffer();this.setRenderTarget=function(x,P=0,F=0){g=x,z=P,b=F;let G=!0,O=null,ee=!1,he=!1;if(x){const pe=we.get(x);if(pe.__useDefaultFramebuffer!==void 0)Me.bindFramebuffer(L.FRAMEBUFFER,null),G=!1;else if(pe.__webglFramebuffer===void 0)Be.setupRenderTarget(x);else if(pe.__hasExternalTextures)Be.rebindTextures(x,we.get(x.texture).__webglTexture,we.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const oe=x.depthTexture;if(pe.__boundDepthTexture!==oe){if(oe!==null&&we.has(oe)&&(x.width!==oe.image.width||x.height!==oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Be.setupDepthRenderbuffer(x)}}const Se=x.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(he=!0);const Ae=we.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ae[P])?O=Ae[P][F]:O=Ae[P],ee=!0):x.samples>0&&Be.useMultisampledRTT(x)===!1?O=we.get(x).__webglMultisampledFramebuffer:Array.isArray(Ae)?O=Ae[F]:O=Ae,w.copy(x.viewport),X.copy(x.scissor),K=x.scissorTest}else w.copy(ot).multiplyScalar(fe).floor(),X.copy(nt).multiplyScalar(fe).floor(),K=ht;if(F!==0&&(O=B),Me.bindFramebuffer(L.FRAMEBUFFER,O)&&G&&Me.drawBuffers(x,O),Me.viewport(w),Me.scissor(X),Me.setScissorTest(K),ee){const pe=we.get(x.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+P,pe.__webglTexture,F)}else if(he){const pe=P;for(let Se=0;Se<x.textures.length;Se++){const Ae=we.get(x.textures[Se]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Se,Ae.__webglTexture,F,pe)}}else if(x!==null&&F!==0){const pe=we.get(x.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,pe.__webglTexture,F)}R=-1},this.readRenderTargetPixels=function(x,P,F,G,O,ee,he,ge=0){if(!(x&&x.isWebGLRenderTarget)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=we.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&he!==void 0&&(pe=pe[he]),pe){Me.bindFramebuffer(L.FRAMEBUFFER,pe);try{const Se=x.textures[ge],Ae=Se.format,oe=Se.type;if(!ct.textureFormatReadable(Ae)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(oe)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-G&&F>=0&&F<=x.height-O&&(x.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ge),L.readPixels(P,F,G,O,Le.convert(Ae),Le.convert(oe),ee))}finally{const Se=g!==null?we.get(g).__webglFramebuffer:null;Me.bindFramebuffer(L.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(x,P,F,G,O,ee,he,ge=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=we.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&he!==void 0&&(pe=pe[he]),pe)if(P>=0&&P<=x.width-G&&F>=0&&F<=x.height-O){Me.bindFramebuffer(L.FRAMEBUFFER,pe);const Se=x.textures[ge],Ae=Se.format,oe=Se.type;if(!ct.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Fe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.bufferData(L.PIXEL_PACK_BUFFER,ee.byteLength,L.STREAM_READ),x.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ge),L.readPixels(P,F,G,O,Le.convert(Ae),Le.convert(oe),0);const Ze=g!==null?we.get(g).__webglFramebuffer:null;Me.bindFramebuffer(L.FRAMEBUFFER,Ze);const at=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await jd(L,at,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ee),L.deleteBuffer(Fe),L.deleteSync(at),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,P=null,F=0){const G=Math.pow(2,-F),O=Math.floor(x.image.width*G),ee=Math.floor(x.image.height*G),he=P!==null?P.x:0,ge=P!==null?P.y:0;Be.setTexture2D(x,0),L.copyTexSubImage2D(L.TEXTURE_2D,F,0,0,he,ge,O,ee),Me.unbindTexture()};const W=L.createFramebuffer(),Z=L.createFramebuffer();this.copyTextureToTexture=function(x,P,F=null,G=null,O=0,ee=null){ee===null&&(O!==0?(jr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=O,O=0):ee=0);let he,ge,pe,Se,Ae,oe,Fe,Ze,at;const lt=x.isCompressedTexture?x.mipmaps[ee]:x.image;if(F!==null)he=F.max.x-F.min.x,ge=F.max.y-F.min.y,pe=F.isBox3?F.max.z-F.min.z:1,Se=F.min.x,Ae=F.min.y,oe=F.isBox3?F.min.z:0;else{const it=Math.pow(2,-O);he=Math.floor(lt.width*it),ge=Math.floor(lt.height*it),x.isDataArrayTexture?pe=lt.depth:x.isData3DTexture?pe=Math.floor(lt.depth*it):pe=1,Se=0,Ae=0,oe=0}G!==null?(Fe=G.x,Ze=G.y,at=G.z):(Fe=0,Ze=0,at=0);const ut=Le.convert(P.format),Ne=Le.convert(P.type);let dt;P.isData3DTexture?(Be.setTexture3D(P,0),dt=L.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Be.setTexture2DArray(P,0),dt=L.TEXTURE_2D_ARRAY):(Be.setTexture2D(P,0),dt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,P.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,P.unpackAlignment);const et=L.getParameter(L.UNPACK_ROW_LENGTH),Ht=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Un=L.getParameter(L.UNPACK_SKIP_PIXELS),Wt=L.getParameter(L.UNPACK_SKIP_ROWS),Zn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,lt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,lt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Se),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ae),L.pixelStorei(L.UNPACK_SKIP_IMAGES,oe);const bt=x.isDataArrayTexture||x.isData3DTexture,Te=P.isDataArrayTexture||P.isData3DTexture;if(x.isDepthTexture){const it=we.get(x),ft=we.get(P),ze=we.get(it.__renderTarget),Yt=we.get(ft.__renderTarget);Me.bindFramebuffer(L.READ_FRAMEBUFFER,ze.__webglFramebuffer),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,Yt.__webglFramebuffer);for(let wt=0;wt<pe;wt++)bt&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.get(x).__webglTexture,O,oe+wt),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,we.get(P).__webglTexture,ee,at+wt)),L.blitFramebuffer(Se,Ae,he,ge,Fe,Ze,he,ge,L.DEPTH_BUFFER_BIT,L.NEAREST);Me.bindFramebuffer(L.READ_FRAMEBUFFER,null),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||x.isRenderTargetTexture||we.has(x)){const it=we.get(x),ft=we.get(P);Me.bindFramebuffer(L.READ_FRAMEBUFFER,W),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,Z);for(let ze=0;ze<pe;ze++)bt?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,it.__webglTexture,O,oe+ze):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,it.__webglTexture,O),Te?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ft.__webglTexture,ee,at+ze):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ft.__webglTexture,ee),O!==0?L.blitFramebuffer(Se,Ae,he,ge,Fe,Ze,he,ge,L.COLOR_BUFFER_BIT,L.NEAREST):Te?L.copyTexSubImage3D(dt,ee,Fe,Ze,at+ze,Se,Ae,he,ge):L.copyTexSubImage2D(dt,ee,Fe,Ze,Se,Ae,he,ge);Me.bindFramebuffer(L.READ_FRAMEBUFFER,null),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Te?x.isDataTexture||x.isData3DTexture?L.texSubImage3D(dt,ee,Fe,Ze,at,he,ge,pe,ut,Ne,lt.data):P.isCompressedArrayTexture?L.compressedTexSubImage3D(dt,ee,Fe,Ze,at,he,ge,pe,ut,lt.data):L.texSubImage3D(dt,ee,Fe,Ze,at,he,ge,pe,ut,Ne,lt):x.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ee,Fe,Ze,he,ge,ut,Ne,lt.data):x.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ee,Fe,Ze,lt.width,lt.height,ut,lt.data):L.texSubImage2D(L.TEXTURE_2D,ee,Fe,Ze,he,ge,ut,Ne,lt);L.pixelStorei(L.UNPACK_ROW_LENGTH,et),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ht),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Un),L.pixelStorei(L.UNPACK_SKIP_ROWS,Wt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Zn),ee===0&&P.generateMipmaps&&L.generateMipmap(dt),Me.unbindTexture()},this.initRenderTarget=function(x){we.get(x).__webglFramebuffer===void 0&&Be.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Be.setTextureCube(x,0):x.isData3DTexture?Be.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Be.setTexture2DArray(x,0):Be.setTexture2D(x,0),Me.unbindTexture()},this.resetState=function(){z=0,b=0,g=null,Me.reset(),I.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}function Iu(n){var as,os;const e=new Fx({canvas:n,antialias:!0,alpha:!1,powerPreference:"low-power"});e.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),e.outputColorSpace=an,e.toneMapping=su,e.toneMappingExposure=1.08;const t=new al;t.background=new Qe("#101e26"),t.fog=new Ws("#101e26",19,36);const i=new hc(-5,5,5,-5,.1,70),r=new jf,s=new ri(new k(0,1,0),0),a=new k,o=new k(sn.x,0,sn.y),l=new vt,c=new Set;let f="",d=0,u="maze";const h=(B,W={})=>{const Z=new Vf({color:B,roughness:.9,...W});return c.add(Z),Z},_=(as=ci.find(B=>B.tiles===Lt))==null?void 0:as.id,M=_==="moon"?["#4b4c70","#68688a","#2b304b"]:_==="ember"?["#645044","#80674e","#3d302b"]:["#34515a","#405c65","#22373e"],m=h(M[0]),p=h(M[1]),y=h("#22373e"),E=h("#304850"),T=h("#c09550",{metalness:.45,roughness:.55}),C=h("#111b26"),S=h("#ffd78a",{emissive:"#ffb541",emissiveIntensity:1.5}),D=h("#9ce9d7",{emissive:"#3aaf9d",emissiveIntensity:1}),z=h("#aa8cde",{emissive:"#7250a2",emissiveIntensity:.65}),b=h("#dd766c",{emissive:"#b13932",emissiveIntensity:.4}),g=B=>(c.add(B),B),R=(B,W,Z)=>g(new gr(B,W,Z)),N=B=>g(new dc(B,12,8)),w=(B,W,Z,x=0,P=0,F=0)=>{const G=new yn(B,W);return G.position.set(x,P,F),Z.add(G),G};t.add(new ul("#c6e9e5","#263a49",2.1));const X=new Ua("#b6d4e4",1.9);X.position.set(-5,12,5),t.add(X);const K=new Ua("#ffd2a1",.9);K.position.set(7,4,-3),t.add(K);const $=[],ce=[],q=[];Lt.forEach((B,W)=>[...B].forEach((Z,x)=>{(Z==="#"?$:ce).push({x,y:W}),Z!=="#"&&(x*7+W*11)%9===0&&q.push({x,y:W})}));const se=(B,W,Z,x)=>{const P=new Pa(B,W,Z.length);return Z.forEach((F,G)=>{l.makeTranslation(F.x,x,F.y),P.setMatrixAt(G,l)}),P.instanceMatrix.needsUpdate=!0,t.add(P),P},fe=se(R(.98,.14,.98),h("#ffffff"),ce,-.08);ce.forEach((B,W)=>fe.setColorAt(W,new Qe(B.x>=16?"#2b413b":B.y>=13?"#3d4344":M[2]))),fe.instanceColor&&(fe.instanceColor.needsUpdate=!0),se(R(.95,.72,.95),m,$,.28),se(R(1,.08,1),p,$,.66),se(R(.014,.01,.97),m,$,.705),se(R(.98,.01,.012),m,$,.705),se(R(.86,.018,.86),E,q,.005);const De=w(R(Lt[0].length+.8,.35,Lt.length+.8),C,t,(Lt[0].length-1)/2,-.3,(Lt.length-1)/2);De.name="maze-foundation";function je(B,W=!1){const Z=new rt;Z.position.set(B.x,0,B.y),t.add(Z);const x=R(.15,1.4,.22);w(x,m,Z,-.39,.65,0),w(x,m,Z,.39,.65,0),w(R(.95,.2,.28),p,Z,0,1.34,0);const P=w(R(.62,1.08,.035),W?z:D,Z,0,.6,0);P.material=h(W?"#8066bd":"#2e8a80",{emissive:W?"#51337e":"#217b73",emissiveIntensity:.8,transparent:!0,opacity:.5});for(const F of[-.39,.39])w(R(.06,.65,.25),W?z:D,Z,F,.75,0);return{group:Z,glow:P}}je(sn);const ot=je(rr,!0),nt=new Map;function ht(B,W){const Z=new rt;Z.position.set(B.x,.04,B.y),t.add(Z);const x=w(g(new si(.36,.035,5,24)),z,Z,0,.035,0);x.rotation.x=Math.PI/2;const P=w(g(new kr(.15)),S,Z,0,.45,0);for(let F=-1;F<=1;F+=2)w(R(.08,.3,.08),T,Z,F*.37,.17,-.3),w(N(.055),S,Z,F*.37,.37,-.3);if(B.kind==="floor"){const F=new rt;Z.add(F);for(const G of[-.7,.6,1.8]){const O=w(R(.04,.02,.63),C,F,0,.01,0);O.rotation.y=G}}else if(B.kind==="cage"){for(const F of[-.33,.33])w(R(.035,.65,.035),T,Z,F,.32,.3);w(R(.72,.035,.035),T,Z,0,.65,.3)}else w(R(.22,.48,.2),m,Z,0,.2,.28),w(g(new kr(.12)),z,Z,0,.54,.28);return{group:Z,ring:x,seal:P,encounter:B,index:W}}ui.forEach((B,W)=>nt.set(B.id,ht(B,W)));const j=new rt;j.position.set(Ga.x,0,Ga.y),t.add(j),w(R(.45,.25,.4),m,j,0,.12,0);const te=w(R(.3,.045,.24),D,j,0,.29,0);te.rotation.y=-.2;const ve=new rt;ve.position.set(Ha.x,0,Ha.y),t.add(ve),w(R(.49,.3,.35),h("#745443"),ve,0,.16,0);const ke=w(R(.51,.12,.38),T,ve,0,.35,0);w(R(.075,.16,.37),S,ve,0,.27,0);const Ce=h("#e6b268"),qe=h("#dfb99a"),At=h("#243348");function We(B,W="#282b34",Z=qe,x=!1){const P=new rt,F=typeof B=="string"?h(B):B,G=h(W),O=w(g(new Ct(.145,.13,.34,9)),F,P,0,.62,0);w(g(new Ct(.045,.05,.08,7)),Z,P,0,.83,0);const ee=w(N(.115),Z,P,0,.96,-.01);ee.scale.set(.94,1.1,.94),w(N(.119),G,P,0,1.025,.005).scale.set(1,.55,.92);for(const oe of[-.043,.043])w(N(.013),C,P,oe,.98,-.111);w(N(.024),Z,P,0,.955,-.125),w(R(.04,.008,.009),G,P,0,.925,-.114),w(R(.22,.26,.09),h("#705c4c"),P,0,.62,.145);const ge=[],pe=[],Se=[];for(const oe of[-1,1]){const Fe=new rt;Fe.position.set(oe*.083,.43,0),P.add(Fe),ge.push(Fe),w(g(new Ct(.055,.047,.19,7)),At,Fe,0,-.09,0);const Ze=new rt;Ze.position.y=-.19,Fe.add(Ze),pe.push(Ze),w(g(new Ct(.046,.038,.18,7)),At,Ze,0,-.085,0),w(R(.09,.055,.15),C,Ze,0,-.18,-.025);const at=new rt;at.position.set(oe*.18,.75,0),P.add(at),Se.push(at),w(g(new Ct(.045,.04,.18,7)),F,at,0,-.09,0);const lt=new rt;lt.position.y=-.17,lt.rotation.x=-.12,at.add(lt),w(g(new Ct(.037,.032,.15,7)),F,lt,0,-.075,0),w(N(.039),Z,lt,0,-.16,0)}let Ae=null;if(x){Ae=w(R(.1,.145,.1),S,P,.22,.31,-.05),w(g(new si(.055,.012,4,10)),T,P,.22,.43,-.05);const oe=new Dr("#ffc271",2,4.5,2);oe.position.set(.28,.6,-.18),P.add(oe)}return{group:P,torso:O,head:ee,legs:ge,knees:pe,arms:Se,lantern:Ae}}function _t(B,W,Z,x=1){const P=Z?Math.min(1,x/2.4):0;B.legs.forEach((F,G)=>{F.rotation.x=Math.sin(W+G*Math.PI)*.55*P}),B.knees.forEach((F,G)=>{F.rotation.x=Math.max(0,-Math.sin(W+G*Math.PI))*.65*P}),B.arms.forEach((F,G)=>{F.rotation.x=-Math.sin(W+G*Math.PI)*.34*P}),B.torso.position.y=.62+Math.abs(Math.sin(W))*.018*P,B.torso.rotation.z=Math.sin(W)*.025*P,B.head.position.y=.96+Math.abs(Math.sin(W))*.009*P}const L=We(Ce,"#252b32",qe,!0),Oe=L.group;t.add(Oe);let $e=0,ct=null,Me={...sn},Mt=!1;const we=w(g(new uc(.26,.3,32)),D,t,sn.x,.015,sn.y);we.rotation.x=-Math.PI/2;function Be(){const B=new rt,W=h("#45425c");w(N(.23),W,B,0,.27,.03),w(N(.14),C,B,0,.21,-.2);for(const Z of[-.065,.065])w(N(.035),b,B,Z,.25,-.33);for(let Z=-1;Z<=1;Z+=2)for(let x=0;x<4;x++){const P=new rt;P.position.set(Z*.12,.24,-.16+x*.12),B.add(P);const F=w(R(.3,.035,.035),W,P,Z*.14,.02,0);F.rotation.z=Z*.35;const G=w(R(.22,.035,.035),W,P,Z*.35,-.07,0);G.rotation.z=Z*-.65}return B}function A(){const B=new rt,W=h("#8175a0",{emissive:"#332540",emissiveIntensity:.45});w(g(new fn(.29,.65,9)),W,B,0,.42,0),w(N(.19),C,B,0,.73,0);for(const Z of[-.065,.065])w(N(.028),D,B,Z,.76,-.17);for(const Z of[-1,1]){const x=w(R(.14,.4,.14),W,B,Z*.29,.55,0);x.rotation.z=Z*.55}return B}const v=qo.map((B,W)=>{const Z=W===0?Be():A();return t.add(Z),{...B,group:Z,index:W}}),V=h("#e0d5b8"),Y=h("#a85d36"),Q=h("#695442"),H=h("#365949"),Ee=h("#61aeb9",{transparent:!0,opacity:.85,metalness:.3,roughness:.25}),me=new Map;function Ie(B){const W=new rt,Z=[];let x,P=null,F=[];if(B==="fox"){w(N(.22),Y,W,0,.23,.02).scale.set(.63,.75,1.35),x=new rt,x.position.set(0,.3,-.27),W.add(x),w(N(.115),Y,x);const O=w(g(new fn(.073,.17,7)),V,x,0,-.02,-.13);O.rotation.x=-Math.PI/2,w(N(.026),C,x,0,-.02,-.22);for(const ee of[-1,1])w(g(new fn(.055,.14,5)),Y,x,ee*.072,.12,0),w(N(.015),C,x,ee*.07,.035,-.09);P=new rt,P.position.set(0,.2,.27),P.rotation.x=1.05,W.add(P),w(g(new Ct(.065,.09,.32,7)),Y,P,0,.12,0),w(g(new fn(.065,.17,7)),V,P,0,.36,0);for(const ee of[-.1,.1])for(const he of[-.16,.19]){const ge=new rt;ge.position.set(ee,.21,he),W.add(ge),Z.push(ge),w(g(new Ct(.03,.023,.18,6)),Y,ge,0,-.075,0),w(N(.035),C,ge,0,-.15,-.015)}}else if(B==="rabbit"){w(N(.18),V,W,0,.18,.035).scale.set(.78,.9,1.2),x=new rt,x.position.set(0,.27,-.17),W.add(x),w(N(.1),V,x);for(const O of[-1,1]){const ee=w(g(new cc(.026,.15,3,7)),V,x,O*.043,.16,0);ee.rotation.z=O*-.12,F.push(ee),w(N(.013),C,x,O*.06,.02,-.075),w(R(.07,.04,.14),V,W,O*.085,.035,-.08)}w(N(.018),h("#c7908c"),x,0,-.015,-.096),w(N(.055),V,W,0,.16,.23)}else{w(g(new Ct(.14,.19,.52,9)),m,W,0,.26,0),w(N(.17),Q,W,0,.71,0).scale.set(.9,1.22,.83);for(const ee of[-1,1])w(N(.12),Q,W,ee*.14,.72,0).scale.set(.4,1.25,.8);x=new rt,x.position.set(0,.96,-.01),W.add(x),w(N(.145),Q,x);for(const ee of[-1,1])w(N(.055),V,x,ee*.063,.01,-.115),w(N(.024),C,x,ee*.063,.01,-.16),w(g(new fn(.04,.1,5)),Q,x,ee*.1,.13,0);const O=w(g(new fn(.035,.08,5)),T,x,0,-.035,-.15);O.rotation.x=-Math.PI/2}return{group:W,head:x,tail:P,ears:F,feet:Z}}Rn.forEach(B=>{let W;if(B.kind==="human"){W=We(B.id==="scout"?"#688ba0":"#80976c",B.id==="scout"?"#34302c":"#4f352c");const Z=w(g(new kr(.065)),B.id==="scout"?D:S,W.group,0,1.28,0);W.marker=Z}else if(["fox","rabbit","owl"].includes(B.kind))W=Ie(B.kind);else if(W={group:new rt},B.kind==="pump"){w(R(.35,.12,.35),m,W.group,-.24,.06,.14),w(g(new Ct(.075,.11,.48,8)),H,W.group,-.24,.33,.14);const Z=w(g(new Ct(.035,.035,.27,7)),T,W.group,-.08,.48,.14);Z.rotation.z=Math.PI/2,w(R(.05,.36,.04),T,W.group,-.31,.64,.14).rotation.z=-.5,W.stream=w(g(new Ct(.016,.025,.33,6)),Ee,W.group,.045,.27,.14),W.drops=Array.from({length:3},()=>w(N(.025),Ee,W.group,.045,.3,.14))}else if(B.kind==="lamp")w(g(new Ct(.035,.06,1.45,8)),T,W.group,.3,.72,.22),w(R(.3,.07,.28),C,W.group,.3,1.5,.22),W.bulb=w(R(.18,.25,.18),h("#554d35",{emissive:"#ffba5a",emissiveIntensity:0}),W.group,.3,1.33,.22),W.light=new Dr("#ffd395",0,6,2),W.light.position.set(.3,1.33,.22),W.group.add(W.light);else{for(const Z of[-.29,.29])w(R(.06,.3,.26),m,W.group,Z,.15,.22);w(R(.85,.07,.31),Q,W.group,0,.32,.22),w(R(.85,.23,.05),Q,W.group,0,.49,.37)}W.group.position.set(B.x,0,B.y),t.add(W.group),W.distance=0,W.last={x:B.x,y:B.y},me.set(B.id,{entity:B,...W})});const ye=new rt;ye.position.set(Gr.x+.3,0,Gr.y),t.add(ye),w(g(new Ct(.18,.15,.09,12,1,!0)),T,ye,0,.05,0),w(g(new Ct(.145,.145,.015,12)),C,ye,0,.015,0);const ne=w(g(new Xs(.147,16)),Ee,ye,0,.075,0);ne.rotation.x=-Math.PI/2;const ae=new Pa(g(new Xs(.055,8)),S,48);t.add(ae),ae.count=0,$.filter(B=>(B.x>=17||B.y>=13)&&B.x>0&&B.x<Lt[0].length-1&&B.y>0&&B.y<Lt.length-1&&(B.x*3+B.y)%5===0).forEach(B=>{const W=new rt;W.position.set(B.x,.7,B.y),t.add(W),w(g(new Ct(.06,.09,.7,6)),Q,W,0,.35,0),w(g(new fn(.42,.8,7)),H,W,0,.95,0),w(g(new fn(.31,.7,7)),H,W,0,1.37,0)});for(const B of[{x:6,y:13},{x:12,y:13},{x:18,y:14}])((os=Lt[B.y])==null?void 0:os[B.x])==="#"&&(w(R(.42,1.1,.4),m,t,B.x,1.2,B.y),w(R(.7,.18,.58),p,t,B.x+.13,1.82,B.y));const Re=new rt;t.add(Re);const Pe=h("#8b8399",{metalness:.7,roughness:.3});for(let B=0;B<10;B++){const W=B/10*Math.PI*2;w(R(.035,1.35,.035),Pe,Re,Math.cos(W)*.43,.65,Math.sin(W)*.43)}w(g(new Ct(.46,.46,.07,10)),Pe,Re,0,1.34,0),w(g(new si(.43,.035,4,20)),Pe,Re,0,.15,0).rotation.x=Math.PI/2;const re=new al;re.background=new Qe("#0b161d"),re.fog=new Ws("#0b161d",5,10);const Le=new en(60,1,.04,20);Le.position.set(0,1.27,1.75),Le.lookAt(0,1.24,-2.8),re.add(new ul("#94c8ce","#15212b",1.45));const I=new Ua("#91b3cf",1.4);I.position.set(-2,3,1),re.add(I);const xe=h("#2b414b"),le=h("#15262f"),ue=h("#60676b",{metalness:.72,roughness:.38}),ie=h("#8d9290",{metalness:.65,roughness:.35});w(R(5,.15,7),y,re,0,-.08,-1);for(const B of[-2.35,2.35])w(R(.3,3.1,7),xe,re,B,1.5,-1);w(R(5,3.1,.35),le,re,0,1.5,-4.2),w(R(5,.2,7),le,re,0,3.05,-1);const J=R(.84,.4,.17);for(const B of[0,1]){const W=[];for(let x=B;x<7;x+=2)for(let P=0;P<6;P++)W.push([-2.1+P*.87+(B?.12:0),.2+x*.43,-3.94]);const Z=new Pa(J,B?m:xe,W.length);W.forEach((x,P)=>{l.makeTranslation(...x),Z.setMatrixAt(P,l)}),Z.instanceMatrix.needsUpdate=!0,re.add(Z)}for(let B=0;B<9;B++)w(R(4.4,.008,.015),le,re,0,.006,-3.7+B*.6);const be=[];for(const B of[-1,1]){const W=B*1.55;w(R(.09,.55,.1),T,re,W,1.5,-3.65),w(g(new fn(.13,.32,7)),S,re,W,1.91,-3.65);const Z=new Dr("#ffad56",8,5,2);Z.position.set(W,1.91,-3.45),re.add(Z),be.push(Z)}const Ue=A();Ue.scale.setScalar(2.35),Ue.position.set(0,0,-2.55),Ue.rotation.y=Math.PI,re.add(Ue);for(const B of[-1,1]){const W=w(g(new fn(.07,.24,5)),z,Ue,B*.14,.93,0);W.rotation.z=B*-.3}const pt=new Dr("#9a74d0",3,3.5,2);pt.position.set(0,1.8,-2.2),re.add(pt);const Ke=new rt;re.add(Ke);const Qt=R(.065,2.75,.065);for(const B of[-1.62,-1.08,1.08,1.62])w(Qt,ue,Ke,B,1.38,-.55);for(const B of[.15,2.65])w(R(3.5,.1,.12),ie,Ke,0,B,-.55);for(const B of[-1,1])for(const W of[.1,.7,1.3])w(Qt,ue,Ke,B*1.75,1.38,W);const Bt=new rt;Bt.position.set(-.56,0,-.55),Ke.add(Bt);for(const B of[0,1.12])w(Qt,ie,Bt,B,1.38,0);for(const B of[.38,2.4])w(R(1.16,.075,.075),ue,Bt,.56,B,0);const Yn=new rt;Yn.position.set(.56,.9,.07),Bt.add(Yn);const br=w(R(.25,.3,.12),h("#c09550",{metalness:.45,roughness:.5}),Yn);w(g(new si(.085,.023,6,14,Math.PI)),ie,Yn,0,.16,0),w(R(.025,.075,.013),C,Yn,0,0,.07);const Di=[];for(const B of[-1,1]){const W=new rt;W.position.set(B*.76,.72,-.43),Ke.add(W);for(let Z=0;Z<5;Z++){const x=w(g(new si(.05,.014,4,10)),ie,W,B*Z*.07,Z*.07,0);x.rotation.y=Z%2?.8:0}Di.push(W)}const Vt=new rt;Vt.position.set(.42,.85,.5),re.add(Vt);const yr=w(R(.2,.5,.23),h("#314b55"),Vt,0,-.2,.11);yr.rotation.x=-.3,w(N(.105),h("#b99276"),Vt,0,.08,-.04),w(R(.17,.24,.17),S,Vt,-.03,-.13,-.22);for(const B of[-1,1])w(R(.018,.26,.19),T,Vt,-.03+B*.09,-.13,-.22);w(g(new si(.08,.018,5,12)),T,Vt,-.03,.07,-.22);const pi=new Dr("#ffca81",2,4,2);pi.position.set(.1,.95,-.2),re.add(pi);const jn=new Xf("#ffd59a",0,7,.38,.6,1.7);jn.position.set(.5,1.05,.75),jn.target.position.set(0,1.25,-3.3),re.add(jn,jn.target);let In=0;function is(B,W,Z,x=null){var ge,pe,Se,Ae;B.paused||(In=W?0:((B.elapsedMs||0)+(B.captureMs||0))/1e3);const P=ds.clamp(Number(Z.lookYaw)||0,-.3,.3);Le.lookAt(-Math.sin(P)*4.5,1.24,-2.8);const F=!!Z.lanternRaised;if(Vt.position.y=F?1.05:.85,pi.position.y=F?1.25:.95,pi.intensity=F?4:2,jn.intensity=F?14:0,br.material.emissive.set(Z.lockInspected?"#ab6f21":"#000000"),br.material.emissiveIntensity=Z.lockInspected?.65:0,!B.paused){const oe=Z.rattleMs>0;Ke.position.x=oe&&!W?Math.sin(Z.rattleMs*.055)*.018:0,Ue.rotation.z=oe&&!W?-.06:0,Ue.position.z=oe?-2.38:-2.55,pt.color.set(oe?"#c27683":"#9a74d0")}const G=((ge=B.review)==null?void 0:ge.index)||0;Di[0].visible=G<1,Di[1].visible=!0;const O=B.phase==="feedback"&&((pe=B.resolved)==null?void 0:pe.includes(B.activeEncounter))||B.phase==="review-feedback"&&G>=1&&(((Se=B.review)==null?void 0:Se.correct)||((Ae=B.review)==null?void 0:Ae.wrong)>=2),ee=!W&&Number.isFinite(x),he=ee?1-(1-ds.clamp(x,0,1))**3:1;Bt.rotation.y=ee?-1.35*(1-he):O?-.28:0,Ke.position.y=ee?1.4*(1-he):0,Le.position.z=1.75+(ee?.28*(1-he):0),Yn.visible=!O,Ue.position.y=W?0:Math.sin(In*1.5)*.025,Vt.rotation.z=W?0:Math.sin(In*1.2)*.015,be.forEach((oe,Fe)=>{oe.intensity=8+Math.sin(In*3+Fe)*.4}),re.updateMatrixWorld(),e.render(re,Le)}function Kn(){const{width:B,height:W}=n.getBoundingClientRect(),Z=`${B}/${W}`;if(Z===f||B<=0||W<=0)return;f=Z,e.setSize(B,W,!1);const x=B/W;Le.aspect=x,Le.updateProjectionMatrix();const P=x<.9?5.3:x>1.6?5:5.7;i.left=-P*x,i.right=P*x,i.top=P,i.bottom=-P,i.updateProjectionMatrix()}function rs(B,{intro:W=!1,reducedMotion:Z=!1,encounters:x=ui,interaction:P={},movement:F=null,guidePath:G=[],trapEntry:O=null,greeting:ee=null}={}){var et,Ht,Un,Wt,Zn,bt;Kn();const he=["question","feedback","capture","review","review-feedback"].includes(B.phase);if(u=he&&!W?"first-person-cage":"maze",he&&!W){is(B,Z,P,O);return}x.forEach((Te,it)=>{nt.has(Te.id)||nt.set(Te.id,ht(Te,it))});const ge=new Set(x.map(Te=>Te.id));nt.forEach(Te=>{Te.group.visible=ge.has(Te.encounter.id)});const pe=Z?0:(B.elapsedMs||0)/1e3,Se=B.elapsedMs||0,Ae=ct===null?0:Math.min(.1,Math.max(0,Se-ct)/1e3);ct=Se;const oe=F&&Number.isFinite(F.x)&&Number.isFinite(F.y)?F:B.player||sn,Fe=Math.hypot(oe.x-Me.x,oe.y-Me.y),Ze=!B.paused&&(F?!!F.moving:Fe>.001);Fe>1e-4&&Fe<2&&($e+=Fe,d=Math.atan2(Me.x-oe.x,Me.y-oe.y)),F&&Number.isFinite(F.heading)&&(d=F.heading),Me={x:oe.x,y:oe.y};const at=new k(oe.x,0,oe.y);Oe.position.copy(at);const lt=Math.atan2(Math.sin(d-Oe.rotation.y),Math.cos(d-Oe.rotation.y));F||Z?Oe.rotation.y=d:Oe.rotation.y+=lt*(1-Math.exp(-14*Ae)),_t(L,$e*Math.PI*2/1.15,Ze&&!Z,(F==null?void 0:F.speed)||2.4),(et=B.world)!=null&&et.playerResting&&!Ze&&(L.legs.forEach(Te=>{Te.rotation.x=-.65}),L.knees.forEach(Te=>{Te.rotation.x=1.2}),Oe.position.y=-.1),me.forEach(Te=>{var Er,bc,yc,Sc,Ec,Tc,Ac;const{entity:it,group:ft}=Te,ze=Ai(it,Se,B.world),Yt=Math.hypot(ze.x-Te.last.x,ze.y-Te.last.y);Yt<2&&(Te.distance+=Yt),Te.last={x:ze.x,y:ze.y},ft.position.set(ze.x,0,ze.y);const wt=!B.paused&&(ee==null?void 0:ee.entityId)===it.id,Sr=wt?Math.atan2(ze.x-oe.x,ze.y-oe.y):(ze.heading||0)+Math.PI,Ii=Math.atan2(Math.sin(Sr-ft.rotation.y),Math.cos(Sr-ft.rotation.y));if(ft.rotation.y+=Ii*(Z?1:1-Math.exp(-9*Ae)),it.kind==="human")_t(Te,Te.distance*Math.PI*2/1.15,ze.moving&&!Z,1.15),Te.arms[1].rotation.z=wt?-1.7:0,wt&&(Te.arms[1].rotation.x=Z?-.3:-.3+Math.sin(pe*9)*.18),Te.marker.rotation.y=pe*.5;else if(it.kind==="fox"){const Ui=Te.distance*Math.PI*2/.7;Te.feet.forEach((xi,wc)=>{xi.rotation.x=ze.moving&&!Z?Math.sin(Ui+(wc===0||wc===3?0:Math.PI))*.5:0}),Te.tail.rotation.z=Z?0:Math.sin(pe*(wt?8:2))*(wt?.3:.12);const mi=((Er=B.world)==null?void 0:Er.foxDrinking)&&!wt;Te.head.rotation.x=mi?.45:0,Te.head.position.y=mi?.23:.3,mi&&(ft.rotation.y=-Math.PI/2)}else it.kind==="rabbit"?((bc=B.world)!=null&&bc.rabbitCalm&&!ze.moving&&(ft.rotation.y=Math.atan2(ze.x-oe.x,ze.y-oe.y)),ft.position.y=ze.moving&&!Z?Math.abs(Math.sin(Se/90))*.1:0,Te.head.rotation.x=wt?-.12:(yc=B.world)!=null&&yc.rabbitCalm?.15:0,Te.ears.forEach((Ui,mi)=>{var xi;Ui.rotation.z=(mi?1:-1)*(wt?.04:(xi=B.world)!=null&&xi.rabbitCalm?.32:.12)})):it.kind==="owl"?Te.head.rotation.y=wt||(Sc=B.world)!=null&&Sc.owlObserved?Math.atan2(ze.x-oe.x,ze.y-oe.y)-ft.rotation.y:Z?0:Math.sin(pe*.45)*.45:it.kind==="pump"?(Te.stream.visible=!!((Ec=B.world)!=null&&Ec.waterFilled),Te.drops.forEach((Ui,mi)=>{var xi;Ui.visible=!!((xi=B.world)!=null&&xi.waterFilled),Ui.position.y=.43-(pe*.6+mi*.11)%.33})):it.kind==="lamp"&&(Te.bulb.material.emissiveIntensity=(Tc=B.world)!=null&&Tc.lightsOn?1.5:0,Te.light.intensity=(Ac=B.world)!=null&&Ac.lightsOn?9:0)}),ne.visible=!!((Ht=B.world)!=null&&Ht.waterFilled);const ut=(Un=B.world)!=null&&Un.scoutGuided?G.slice(0,48):[];ae.count=ut.length,ut.forEach((Te,it)=>{l.makeRotationX(-Math.PI/2),l.setPosition(Te.x,.025,Te.y),ae.setMatrixAt(it,l)}),ae.instanceMatrix.needsUpdate=!0,L.lantern.material.emissiveIntensity=1.5+Math.sin(pe*3)*.08,we.position.set(Oe.position.x,.017,Oe.position.z),we.visible=B.graceMs>0||W,nt.forEach(({group:Te,ring:it,seal:ft,encounter:ze,index:Yt})=>{var Sr,Ii,Er;const wt=((Sr=B.seals)==null?void 0:Sr.includes(ze.id))||((Er=(Ii=B.resolved)==null?void 0:Ii.includes)==null?void 0:Er.call(Ii,ze.id));it.material=wt?D:z,ft.visible=!wt,ft.rotation.y=pe*.8+Yt,ft.position.y=.45+Math.sin(pe*2+Yt)*.05,Te.visible=ge.has(ze.id)}),v.forEach(Te=>{const{group:it,index:ft}=Te,ze=Kl(Te,B.elapsedMs||0);if(!ze)return;const Yt=it.userData.tile;Yt&&(Yt.x!==ze.x||Yt.y!==ze.y)&&(it.rotation.y=Math.atan2(Yt.x-ze.x,Yt.y-ze.y)),it.userData.tile=ze,it.position.set(ze.x,ft?Math.sin(pe*1.8)*.07:0,ze.y)}),te.material=(Wt=B.clues)!=null&&Wt.includes("route")?T:D,ke.rotation.x=B.treasureCollected?-.65:0,ot.glow.material.opacity=((Zn=B.seals)==null?void 0:Zn.length)>=3&&Object.keys(B.answers||{}).length===((bt=B.order)==null?void 0:bt.length)?.8:.3;const Ne=["capture","review","review-feedback"].includes(B.phase);Re.visible=Ne,Re.position.set(oe.x,0,oe.y),B.phase==="capture"&&!Z&&(Re.position.y=Math.max(0,1.6-(B.captureMs??0)/900));const dt=at.clone();dt.x=ds.clamp(dt.x,2.8,Lt[0].length-3.8),dt.z=ds.clamp(dt.z,2.8,Lt.length-3.8),!Mt||Z?(o.copy(dt),Mt=!0):o.lerp(dt,1-Math.exp(-8*Ae)),i.position.set(o.x+3.8,12,o.z+7.8),i.lookAt(o.x,0,o.z),t.updateMatrixWorld(),e.render(t,i)}function ss(B,W){const Z=n.getBoundingClientRect();return r.setFromCamera(new Ye((B-Z.left)/Z.width*2-1,-(W-Z.top)/Z.height*2+1),i),r.ray.intersectPlane(s,a)?{x:Math.round(a.x),y:Math.round(a.z)}:null}function oa(){for(const B of c)B.dispose();e.dispose()}return Kn(),{render:rs,resize:Kn,cellFromPointer:ss,dispose:oa,getView:()=>u}}(function(n){const e={easy:1,medium:1.5,hard:2},t=u=>u&&Object.hasOwn(e,u.difficulty)?e[u.difficulty]:e.medium,i=u=>Number.isFinite(u)?Math.min(1,Math.max(0,u)):0;function r(u,h){const _=u||[],M=h||{},m=_.reduce((C,S)=>C+t(S),0);if(!m)return{earned:0,pending:0,max:100,percent:0};let p=0,y=0;for(const C of _){const S=t(C)/m*100;C.type==="open"?y+=S:p+=i(M[C.id])*S}p=Math.round(p),y=Math.round(y);const E=100-y,T=E>0?Math.min(100,Math.round(p/E*100)):0;return{earned:p,pending:y,max:100,percent:T}}function s(u){return u>=90?3:u>=75?2:u>=50?1:0}function a(u){return u>=90?"great":u>=50?"ok":"low"}function o(u,h=Math.random){const _=u.slice();for(let M=_.length-1;M>0;M--){const m=Math.floor(h()*(M+1));[_[M],_[m]]=[_[m],_[M]]}return _}function l(u,h=Math.random){const _=o(u.choices.map((M,m)=>m),h);return{...u,choices:_.map(M=>u.choices[M]),correct:_.indexOf(u.correct),order:_}}function c(u,h){const _=h||{};return u.filter(M=>M.type!=="open"&&!(i(_[M.id])>=1))}function f(u,h,_,M=3){const m=u.slice();return m.splice(Math.min(h+1+M,u.length),0,{..._,reask:!0}),m}function d(u){return u>0&&u%3===0}n.QuizCore={WEIGHT:e,scoreQuiz:r,starsFor:s,feedbackTier:a,shuffled:o,shuffleChoices:l,missedQuestions:c,scheduleReask:f,streakCelebrates:d}})(globalThis);const kl=2.7,Ki=12,Uu=n=>n&&Number.isInteger(n.x)&&Number.isInteger(n.y),Ox=(n,e)=>n.x===e.x&&n.y===e.y;function Kr(n){if(!Uu(n))throw new TypeError("Movement needs an integer player tile");return{position:{...n},origin:{...n},target:null,speed:0,heading:0,moving:!1,elapsed:0}}function Bx(n,e){return Ox(n.origin,e)?n:{...Kr(e),heading:n.heading}}function zx(n,e){let t=e.nextCell;if(e.direction){const{dx:i,dy:r}=e.direction;if(!Number.isInteger(i)||!Number.isInteger(r)||Math.abs(i)+Math.abs(r)!==1)return null;t={x:n.origin.x+i,y:n.origin.y+r}}return!Uu(t)||Math.abs(t.x-n.origin.x)+Math.abs(t.y-n.origin.y)!==1||typeof e.canWalk!="function"||!e.canWalk(t.x,t.y)?null:{x:t.x,y:t.y}}function kx(n,e,t,i){const r=Math.max(Ki,e**2/(2*n)),s=i?kl:Math.min(kl,Math.sqrt((2*n+e**2/Ki)/(1/Ki+1/r))),a=Math.max(0,(s-e)/Ki),o=(e+s)*a/2,l=i?0:s**2/(2*r),c=Math.max(0,(n-o-l)/s),f=i?0:s/r;if(t>=a+c+f-1e-10)return{distance:n,speed:i?s:0,arrived:!0};let d=0,u=e;const h=Math.min(t,a);d+=e*h+Ki*h**2/2,u+=Ki*h,t-=h;const _=Math.min(t,c);return d+=s*_,t-=_,t>0&&(d+=s*t-r*t**2/2,u=s-r*t),{distance:d,speed:u,arrived:!1}}function Vx(n,e={}){const t={movement:n,arrived:null};if(e.paused||!Number.isFinite(e.dt)||e.dt<=0)return t;const i=Math.min(e.dt,.1),r=n.target||zx(n,e);if(!r)return n.speed?{movement:{...n,speed:0},arrived:null}:t;const s=r.x-n.origin.x,a=r.y-n.origin.y,o=Math.atan2(-s,-a),l=Math.atan2(Math.sin(o-n.heading),Math.cos(o-n.heading)),c=n.heading+l*(1-Math.exp(-14*i)),f=Math.abs(n.position.x-n.origin.x)+Math.abs(n.position.y-n.origin.y),d=!e.direction||e.direction.dx===s&&e.direction.dy===a,u=e.continuous===!0&&d&&typeof e.canWalk=="function"&&e.canWalk(r.x+s,r.y+a),h=kx(1-f,n.speed,i,u),_=Math.min(1,f+h.distance);return h.arrived?{movement:{position:{...r},origin:{...r},target:null,speed:h.speed,heading:c,moving:!1,elapsed:0},arrived:{...r,dx:s,dy:a}}:{movement:{...n,position:{x:n.origin.x+s*_,y:n.origin.y+a*_},target:r,speed:h.speed,heading:c,moving:!0,elapsed:n.elapsed+i},arrived:null}}const Gx=Object.freeze(["look-left","look-center","look-right","lantern","rattle","inspect"]),Nu=Object.freeze({"look-left":"מבט שמאלה","look-center":"מבט קדימה","look-right":"מבט ימינה",lantern:"הרמה / הורדה של הפנס",rattle:"ניעור הסורגים",inspect:"בדיקת המנעול"}),Hx=new Set(["question","feedback","capture","review","review-feedback"]),Vl=.42,Gl=.21,Wx=480;function pc(){return{lookYaw:0,lanternRaised:!1,rattleMs:0,lockInspected:!1,notice:""}}function Fu(n,e,t={}){const i=typeof e=="string"?e:e==null?void 0:e.type;if(i==="reset")return pc();if(t.paused||!Hx.has(t.phase))return n;if(i==="tick"){const l=e.ms??e.dt;return!Number.isFinite(l)||l<=0||n.rattleMs===0?n:{...n,rattleMs:t.reducedMotion?0:Math.max(0,n.rattleMs-l)}}if(!Gx.includes(i))return n;if(i.startsWith("look-")){const l=i==="look-center"?0:Math.max(-Vl,Math.min(Vl,n.lookYaw+(i==="look-left"?Gl:-Gl)));return{...n,lookYaw:l,notice:Nu[i]}}if(i==="lantern"){const l=!n.lanternRaised;return{...n,lanternRaised:l,notice:l?"הפנס מורם ומאיר את הסורגים והמנעול.":"הפנס הונמך."}}if(i==="rattle")return{...n,rattleMs:t.reducedMotion?0:Wx,notice:"הסורגים חזקים. השומר שמע את הרעש והביט לכאן. השאלות הן הדרך החוצה."};const r=Math.max(0,Math.floor(Number(t.total)||0)),s=Math.min(r,Math.max(0,Math.floor(Number(t.answered)||0))),a=Math.max(1,Math.floor(Number(t.reviewIndex)||0)+1),o=t.phase==="capture"?"המנעול סגור. שלבי החילוץ ייפתחו מיד; אפשר לדלג על סצנת הלכידה.":t.phase.startsWith("review")?`המנעול מחכה לשלב חילוץ ${a}. ממשיכים דרך שאלות החזרה.`:`נענו ${s} מתוך ${r} שאלות. המנעול ייפתח בסיום שאלות המלכודת.`;return{...n,lockInspected:!0,notice:o}}const Xx=new Map(Zs.quizzes.flatMap(n=>n.questions).map(n=>[n.id,n])),Ou={"questions-01":{context:"רוצים לברר את זמן הקמת הגינה בבית הספר.",prompt:"באיזו מילת שאלה נשתמש?"},"questions-02":{context:"רוצים לברר את מספר הכיתות שהשתתפו בהקמת הגינה.",prompt:"באיזו מילת שאלה נשתמש?"},"questions-03":{context:"התלמידים קראו על צמחים לפני השתילה.",prompt:"איזו מילת שאלה מבקשת סיבה?"},"questions-04":{context:"תלמידים הקימו גינה בבית הספר.",prompt:"איזו מילת שאלה מבקשת מקום?"},"questions-05":{context:"שלוש כיתות חילקו ביניהן את ימי ההשקיה.",prompt:"איזו מילת שאלה מבקשת דרך פעולה?"},"questions-06":{context:"עלתה הצעה להוסיף פרחים לגינה.",prompt:"איזו מילת שאלה מבקשת לזהות אדם?"},"instructions-01":{context:"ההוראה: ״העתיקו מהטקסט עובדה״.",prompt:"מה צריך לעשות?"},"instructions-02":{context:"ההוראה: ״נמקו״.",prompt:"מה צריך להוסיף לתשובה?"},"instructions-03":{context:"ההוראה: ״ציינו״.",prompt:"איזו תשובה מתאימה?"},"instructions-04":{context:"ההוראה: ״הסבירו״.",prompt:"מה צריך לעשות?"},"instructions-05":{context:"ההוראה: ״נסחו שאלה מלאה״.",prompt:"איזו תשובה מקיימת את ההוראה?"},"instructions-06":{context:"ההוראה: ״הביעו את דעתכם וכתבו נימוק״.",prompt:"מה צריך לכתוב?"},"physics-pole-01":{context:"מודדים גובה עמוד בעזרת גליל חלול ומשולש ישר־זווית ושווה־שוקיים.",prompt:"באיזו זווית לאופק מכוונים לראש העמוד?"},"physics-pole-02":{context:"מביטים לראש עמוד בזווית 45° לאופק, על קרקע אופקית.",prompt:"מה שווה למרחק האופקי לעמוד?"},"physics-pole-03":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 6 מ׳. גובה העיניים: 1.4 מ׳.",prompt:"מה גובה העמוד?"},"physics-pole-04":{context:"מודדים גובה עמוד בעזרת גליל המכוון לראשו ב־45° לאופק.",prompt:"איזה מרחק מודדים לצורך החישוב?"},"physics-pole-05":{context:"מביטים לראש עמוד ב־45° לאופק, על קרקע אופקית.",prompt:"איזה גובה מוסיפים למרחק האופקי?"},"physics-pole-06":{context:"מביטים לראש עמוד ב־45°. מחשבים את גובהו ממרחק אופקי וגובה העיניים.",prompt:"איזה תנאי קרקע נדרש לחישוב?"},"physics-pole-07":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 4 מ׳. גובה העיניים: 1.5 מ׳.",prompt:"מה גובה העמוד?"},"physics-pole-08":{context:"למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.",prompt:"מה צריך לראות דרך הגליל?"},"physics-pole-09":{context:"למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.",prompt:"מה תפקיד המשולש?"},"physics-pole-10":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי לעמוד: 5 מ׳.",prompt:"מה גובה ראש העמוד מעל העיניים?"},"physics-pole-11":{context:"מודדים מרחק אופקי לעמוד וגובה עיניים, ואז מחשבים את גובה העמוד.",prompt:"למה זו מדידה עקיפה?"}};for(const n of Zs.quizzes.find(e=>e.id==="facts").questions)Ou[n.id]={context:n.prompt.slice(0,-7),prompt:"עובדה או דעה?"};function qx(n,e){var t,i;return e&&n.prompt===e.prompt&&n.correct===e.correct&&JSON.stringify(n.choices)===JSON.stringify(e.choices)&&((t=n.ref)==null?void 0:t.id)===e.ref.id&&((i=n.ref)==null?void 0:i.part)===e.ref.part}function $x(n){const e={prompt:typeof(n==null?void 0:n.prompt)=="string"?n.prompt:"",context:"",sourceLabel:"",adapted:!1},t=Xx.get(n==null?void 0:n.id);if(!qx(n,t))return e;const i=Ou[n.id],r=n.ref.id==="garden-passage"?"הגינה בבית הספר":`מדידות · ${n.ref.part}`;return{...e,...i,sourceLabel:r,adapted:!!i}}const Yx=1.65,Hl=2.35,jx=12e3,Kx=3400,Zx=new Set(["human","fox","rabbit","owl"]);function Bu(){return{clockMs:0,sequence:0,nearby:{},lastSpoken:{},active:null}}function Jx(n,e){return n.id==="scout"?"היי! אני אורי. צריכים עזרה למצוא דרך?":n.id==="keeper"?"שלום! אני מיה. ברוכים הבאים לגן.":n.id==="fox"?e!=null&&e.foxFollowing?"השועל מכשכש בזנב ומתקרב אליכם.":e!=null&&e.waterFilled?"השועל מרים את ראשו ומרחרח לשלום.":"השועל מרים אוזניים ומרחרח לעברכם.":n.id==="rabbit"?e!=null&&e.rabbitCalm?"הארנב מזהה אתכם ומציץ מבין השיחים.":"הארנב מזקיף אוזניים ומביט בכם.":"הוּ־הוּ! הינשוף מסובב אליכם את ראשו."}function Qx(n,{dt:e=0,player:t,world:i,elapsedMs:r=0,phase:s="explore",paused:a=!1}={}){if(s!=="explore")return n.active?{...n,active:null}:n;if(a||!t||!Number.isFinite(t.x)||!Number.isFinite(t.y)||!Number.isFinite(e)||e<0)return n;const o=Math.min(e,6e4),l=n.clockMs+o,c={...n,clockMs:l,nearby:{...n.nearby},lastSpoken:{...n.lastSpoken}};if(c.active=n.active&&n.active.remainingMs>o?{...n.active,remainingMs:n.active.remainingMs-o}:null,c.active){const d=Rn.find(h=>h.id===c.active.entityId),u=Ai(d,r,i);Math.abs(u.x-t.x)+Math.abs(u.y-t.y)>=Hl&&(c.active=null)}const f=[];for(const d of Rn.filter(u=>Zx.has(u.kind))){const u=Ai(d,r,i),h=Math.abs(u.x-t.x)+Math.abs(u.y-t.y);h>=Hl?c.nearby[d.id]=!1:h<=Yx&&!n.nearby[d.id]&&(c.nearby[d.id]=!0,(n.lastSpoken[d.id]===void 0||l-n.lastSpoken[d.id]>=jx)&&(f.push({entity:d,distance:h}),c.nearby[d.id]=!1))}if(!c.active&&f.length){const{entity:d}=f.sort((u,h)=>u.distance-h.distance)[0];c.sequence++,c.nearby[d.id]=!0,c.lastSpoken[d.id]=l,c.active={entityId:d.id,kind:d.kind,name:d.name,text:Jx(d,i),sequence:c.sequence,remainingMs:Kx}}return c}const eg=""+new URL("escape-moments-CCq79QCe.png",import.meta.url).href,Vr=[{title:"יצאתם אל האור!",message:"השער נפתח. עוד הרפתקה מאחוריכם.",alt:"הרפתקן וארנב ליד שער מבוך פתוח באור הבוקר",position:"0%"},{title:"מצאתם את הדרך!",message:"גם שביל מלא אתגרים מוביל החוצה.",alt:"הרפתקן ושועל חוצים גשר אבן לאור הירח",position:"50%"},{title:"המבוך מאחוריכם!",message:"מכאן כבר רואים כמה רחוק הגעתם.",alt:"הרפתקן וינשוף משקיפים על המבוך בזריחה",position:"100%"}],No=n=>Number.isInteger(n)&&n>=0&&n<Vr.length;function tg(n,e,t=Math.random){return No(n)?n:No(e)?(e+1)%Vr.length:Math.min(Vr.length-1,Math.max(0,Math.floor(t()*Vr.length)))}const de=n=>document.getElementById(n),An="prepx-shadow-maze-session-v1",Zr=matchMedia("(prefers-reduced-motion: reduce)"),Pt=de("game-dialog");let tt,U,St,yt=!1,Nt=null,Fo=null,nr=!1,Ln=!0,Oo=!1,$t=[],ka=0,Nr=null,Va=0,Ge=null,pn=null,ir=null,qs=!1,Qi=[],Mn=pc(),$s=Bu(),Gt=null;const mc=900,ra=new Set(["question","feedback","capture","review","review-feedback"]),Dn=new Set,Os=new Map;function vr(){Os.clear(),ir=null}const fr=()=>(U==null?void 0:U.phase)==="explore"?U.resolved.find(n=>!U.giftsSeen.includes(n)):null,Li=()=>wi(tt.questions),xc=()=>yt&&(U==null?void 0:U.phase)==="explore"&&!U.paused&&!Nt?$s.active:null;function zu(){const n=xc(),e=de("nearby-greeting");e.hidden=!n,n&&e.dataset.sequence!==String(n.sequence)&&(de("greeting-name").textContent=n.name,de("greeting-text").textContent=n.text,e.dataset.sequence=String(n.sequence))}const Mr=()=>({intro:!yt,reducedMotion:Zr.matches,encounters:Li(),interaction:Mn,guidePath:Qi,greeting:xc(),trapEntry:Gt?1-Gt.remaining/mc:null,movement:Ge?{x:Ge.position.x,y:Ge.position.y,speed:Ge.speed,heading:Ge.heading,moving:Ge.moving||Ge.speed>0}:void 0});function ku(){var e;const n=U.assignments[U.activeEncounter]||[];return{phase:U.phase,paused:U.paused,reducedMotion:Zr.matches,reviewIndex:((e=U.review)==null?void 0:e.index)||0,answered:n.filter(t=>U.answers[t]).length,total:n.length}}function ng(){return`<details class="cell-tools" id="cell-tools"><summary>לבדוק את הכלוב</summary><div class="cell-controls" aria-label="פעולות בתוך הכלוב">${["look-left","look-right","lantern","rattle","inspect"].map(n=>`<button type="button" data-cell-action="${n}" aria-label="${qn(Nu[n])}"${n==="lantern"?` aria-pressed="${Mn.lanternRaised}"`:""}>${qn({"look-left":"שמאלה","look-right":"ימינה",lantern:"פנס",rattle:"סורגים",inspect:"מנעול"}[n])}</button>`).join("")}</div><p id="cell-notice" class="cell-notice" role="status">${qn(Mn.notice||"בחרו פעולה כדי להסתכל סביב.")}</p></details>`}function ig(n){var e;U.phase==="feedback"&&_c("המעבר נעצר בזמן שבודקים את הכלוב."),Mn=Fu(Mn,n,ku()),de("cell-notice")&&(de("cell-notice").textContent=Mn.notice),(e=document.querySelector('[data-cell-action="lantern"]'))==null||e.setAttribute("aria-pressed",String(Mn.lanternRaised)),St==null||St.render(U,Mr())}const Vu={up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]},qn=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function rg(n){const e=document.createElement("template");return e.innerHTML=String(n??""),e.content.textContent||""}const It=n=>qn(rg(n));function sg(n){try{const e=new URL(n==null?void 0:n.url,new URL("../../",location.href));return["http:","https:"].includes(e.protocol)?e.href:null}catch{return null}}function Gu(n){var r,s;const e=n==null?void 0:n.reference,t=It([(e==null?void 0:e.title)||((r=n==null?void 0:n.ref)==null?void 0:r.id),(e==null?void 0:e.part)||((s=n==null?void 0:n.ref)==null?void 0:s.part)].filter(Boolean).join(" · ")),i=sg(e);return t?`<div class="reference">מקור: ${i?`<a href="${qn(i)}" target="_blank" rel="noopener noreferrer">${t} ↗</a>`:t}</div>`:""}function Bo(n){var e,t;return`<p class="explanation">${It(((e=n==null?void 0:n.explanation)==null?void 0:e.he)||"")}</p>${(t=n==null?void 0:n.explanation)!=null&&t.en?`<p class="small-note" dir="ltr">${It(n.explanation.en)}</p>`:""}${Gu(n)}`}const zo="ההתקדמות אינה נשמרת בדפדפן הזה. אפשר להמשיך עכשיו, אבל יציאה או רענון עלולים לאבד אותה.";function sa(){Ln=!1,de("storage-warning").hidden=!1;const n=document.querySelector(".privacy");if(n&&(n.textContent=zo+" אין שליחת תשובות או שם."),de("encounter-menu")&&(de("encounter-menu").textContent="השהיה או יציאה · ללא שמירה"),Pt.open&&!document.querySelector(".dialog-save-warning")){const e=document.createElement("p");e.className="dialog-save-warning",e.setAttribute("role","status"),e.textContent=zo,de("dialog-content").prepend(e)}}function ns(){if(!(!tt||!U||!Ln||Oo))try{sessionStorage.setItem(An,JSON.stringify({content:tt,state:U}))}catch{sa()}}function aa(){clearTimeout(Fo),Fo=null}function kt(n){var r,s;if(!U)return;const e=tu(U,n,tt.questions);if(e===U)return;const t=U.phase,i=(r=wn(U,tt.questions))==null?void 0:r.id;U=e,Ge&&(Ge=Bx(Ge,U.player)),U.phase!=="explore"&&(Dn.clear(),vr(),pn=null,qs=!1,Ge&&(Ge={...Kr(U.player),heading:Ge.heading})),t==="explore"&&ra.has(U.phase)&&(Mn=pc()),t==="explore"&&U.phase==="question"&&!Zr.matches&&(Gt={remaining:mc,encounter:U.activeEncounter}),U.phase!=="question"&&(Gt=null),(n.type!=="tick"||U.phase!==t)&&ns(),U.phase!=="explore"&&($t=[]),(t!==U.phase||i!==((s=wn(U,tt.questions))==null?void 0:s.id)||n.type!=="tick")&&(aa(),fi())}function gc(){Pt.open&&Pt.close(),Nr!=null&&Nr.isConnected&&Nr.focus({preventScroll:!0})}function on(n,e="button"){const t=ra.has(U.phase)&&!Nt;Pt.classList.remove("gift-sheet"),Pt.classList.toggle("cell-sheet",t),Pt.classList.toggle("trap-entry",t&&!!Gt);const i=Ln?"":`<p class="dialog-save-warning" role="status">${zo}</p>`,r=yt&&!Nt&&U.phase!=="complete"?`<button id="encounter-menu" class="reading-button">${Gt?"השהיה":`השהיה או יציאה · ${Ln?"ההתקדמות נשמרת":"ללא שמירה"}`}</button>`:"";de("dialog-content").innerHTML=i+n+(t&&!Gt?ng():"")+r,Tt("encounter-menu",()=>hi("pause")),document.querySelectorAll("[data-cell-action]").forEach(s=>s.addEventListener("click",()=>ig(s.dataset.cellAction))),document.querySelectorAll(".cell-tools,.feedback-explanation").forEach(s=>s.addEventListener("toggle",()=>{s.open&&U.phase==="feedback"&&_c()})),Pt.open||(Nr=document.activeElement,Pt.showModal()),Pt.scrollTop=0,queueMicrotask(()=>{var s;return(s=de("dialog-content").querySelector("#skip-trap-entry,[data-choice],#continue-button,#skip-capture,#guided-continue,#close-panel,#resume-button"))==null?void 0:s.focus({preventScroll:!0})})}const Dt=(n,e,t=!0)=>`<button id="${n}" class="button ${t?"primary":""}">${e}</button>`,cn=(n,e)=>`<div class="dialog-kicker"><span>${n}</span><span>מבוך הצללים</span></div>${e?`<h2 id="dialog-title">${e}</h2>`:""}`;function Tt(n,e){var t;(t=de(n))==null||t.addEventListener("click",e)}function ko(){nr=!1,kt({type:"continue"})}function _c(n="המעבר נעצר"){var e;U.phase==="feedback"&&(nr=!0,aa(),de("read-feedback")&&(de("read-feedback").textContent=n),de("feedback-actions")&&(de("feedback-actions").hidden=!1),de("continue-button")||((e=de("feedback-actions"))==null||e.insertAdjacentHTML("beforeend",Dt("continue-button","להמשיך אחרי הקריאה")),Tt("continue-button",ko)))}function Hu(){Gt=null,fi(),St==null||St.render(U,Mr())}function ag(){const n=Li().find(e=>e.id===U.activeEncounter);on(cn("מלכודת הופעלה",It((n==null?void 0:n.title)||"הכלוב נסגר"))+'<p class="trap-entry-message">השער נסגר. עונים ומשתחררים.</p>'+Dt("skip-trap-entry","לשאלות ←")),Tt("skip-trap-entry",Hu)}function og(){var o;const n=U.phase.startsWith("review"),e=wn(U,tt.questions);if(n&&((o=U.review)!=null&&o.guided)){on(cn("חדר ההיחלצות","הדרך החוצה פתוחה")+"<p>הרימו את הידית. ההתקדמות נשמרת.</p>"+Dt("guided-continue","לפתוח ולהשתחרר")),Tt("guided-continue",()=>kt({type:"guided-continue"}));return}if(!e){on(cn("אפשר להמשיך","חומר התרגול אינו זמין")+'<p>אפשר לחזור לעמוד הבית. ההתקדמות התקינה נשמרה בלשונית הזו.</p><a class="dialog-link" href="/index.html">חזרה ל־PrepX</a>');return}const t=Li().find(l=>l.id===U.activeEncounter),i=U.assignments[U.activeEncounter]||[],r=i.filter(l=>U.answers[l]).length,s=$x(e),a=n&&U.review.hint?`<p class="explanation">רמז: ${It(e.explanation.he)}</p>`:"";on(cn(n?`חדר ההיחלצות · שלב ${U.review.index+1} מתוך 2`:`${It(t==null?void 0:t.title)} · שאלה ${r+1} מתוך ${i.length}`,"")+(s.context?`<p class="question-context" id="question-context">${It(s.context)}</p>`:"")+`<h2 id="dialog-title">${It(s.prompt)}</h2>`+(n?'<p class="small-note">חזרה עם רמזים · בלי איבוד לבבות</p>':"")+a+`<div class="answers">${e.options.map((l,c)=>`<button class="answer" data-choice="${l.original}"><span class="answer-index">${c+1}</span><span>${It(l.text)}</span></button>`).join("")}</div><details class="question-source" id="question-source"><summary>מקור השאלה</summary>${Gu(e)}</details>`),document.querySelectorAll("[data-choice]").forEach(l=>{let c=!1;l.addEventListener("pointerdown",()=>{c=!0}),l.addEventListener("pointercancel",()=>{c=!1}),l.addEventListener("keydown",f=>{f.repeat&&["Enter"," "].includes(f.key)&&f.preventDefault()}),l.addEventListener("click",f=>{var u;const d=c;c=!1,!(f.detail>0&&!d)&&(U.phase!==(n?"review":"question")||((u=wn(U,tt.questions))==null?void 0:u.id)!==e.id||(nr=!1,kt({type:n?"review-answer":"answer",choice:Number(l.dataset.choice)})))})})}function cg(){var o;const n=U.phase==="review-feedback",e=wn(U,tt.questions),t=n?U.review.correct:(o=U.lastAnswer)==null?void 0:o.correct,i=n&&!t&&U.review.wrong>=2,r=t?n?"השרשרת משתחררת!":"תשובה נכונה!":n?"יש עוד דרך לפתור":"תשובה לא נכונה",s=t?n?"עוד שרשרת השתחררה.":"+10 מטבעות":n?"מנסים שוב עם רמז.":"לב אחד ירד · ממשיכים מכאן",a=e?`<p>התשובה הנכונה: <strong>${It(e.choices[e.correct])}</strong></p>`:"";on(cn(n?"חדר ההיחלצות":"תוצאת המלכודת","")+`<div class="feedback-label"><span class="feedback-mark ${t?"":"wrong"}" aria-hidden="true">${t?"✓":"↘"}</span><h2 id="dialog-title">${r}</h2></div><p>${s}</p>`+(i||!n||t?a:"")+(n?Bo(e):`<details class="feedback-explanation" id="feedback-explanation"><summary>למה זו התשובה?</summary>${Bo(e)}</details>`)+`<div class="dialog-actions" id="feedback-actions"${!n&&!nr?" hidden":""}>${n?Dt("continue-button",i?"הבנתי, לשחרר את השרשרת":t?"לשלב הבא":"לנסות עם רמז"):nr?Dt("continue-button","להמשיך אחרי הקריאה"):""}</div>`+(n?"":'<button id="read-feedback" class="reading-button">לעצור ולקרוא</button>')),Tt("continue-button",ko),Tt("read-feedback",()=>{_c(),de("feedback-explanation").open=!0}),!n&&!nr&&(Fo=setTimeout(()=>{U.phase==="feedback"&&!U.paused&&!Nt&&ko()},1500))}function lg(){on(cn("נתפסתם","שתי שרשראות. דרך אחת החוצה.")+"<p>שתי שאלות עם רמזים ישחררו אתכם. ההתקדמות נשמרת.</p>"+Dt("skip-capture","להשתחרר עם רמזים")),Tt("skip-capture",()=>kt({type:"skip-capture"}))}function Vo(n=!1){var s;if(!No(U.completionArt)){let a=null;if(Ln)try{const o=sessionStorage.getItem(An+"-last-completion-art");a=o===null?null:Number(o)}catch{sa()}if(U.completionArt=tg(null,a),ns(),Ln)try{sessionStorage.setItem(An+"-last-completion-art",String(U.completionArt))}catch{}}const e=Vr[U.completionArt],t=sr(U,tt.questions),i=((s=globalThis.QuizCore)==null?void 0:s.starsFor(t.score))||0,r=n?tt.questions.filter(a=>U.answers[a.id]).map(a=>`<div class="review-item"><strong>${U.answers[a.id].correct?"✓":"↘"} ${It(a.prompt)}</strong><p>התשובה שלכם: ${It(a.choices[U.answers[a.id].choice])}</p><p>התשובה הנכונה: ${It(a.choices[a.correct])}</p>${Bo(a)}</div>`).join(""):"";on(`<section class="completion-screen" data-completion-art="${U.completionArt}"><div class="completion-picture" role="img" aria-label="${qn(e.alt)}" style="background-image:url('${qn(eg)}');background-position:center ${e.position}"></div><div class="completion-copy">`+cn("ההרפתקה הושלמה",It(e.title))+`<p class="completion-message">${It(e.message)}</p><p class="completion-stars" aria-label="${i} כוכבים מתוך 3">${"★".repeat(i)}${"☆".repeat(3-i)}</p><div class="result-grid completion-results"><div><strong>${t.score}</strong><small>ציון ידע מתוך 100</small></div><div><strong>${U.coins}</strong><small>מטבעות</small></div><div><strong>${U.captureCount}</strong><small>היחלצויות</small></div></div><div class="completion-actions"><a class="dialog-link button primary" id="completion-home" href="/index.html">בחזרה הביתה ↗</a>${Dt("change-subject","הרפתקה חדשה · החלפת נושא",!1)}${n?Dt("back-to-celebration","חזרה לחגיגה",!1):'<button id="review-result" class="reading-button">לעבור על התשובות</button>'}</div><p class="small-note completion-score-note">הציון מבוסס על התשובות הראשונות. ההיחלצות אינה משנה אותו.</p>${r}</div></section>`),Tt("review-result",()=>Vo(!0)),Tt("back-to-celebration",()=>Vo(!1)),Tt("change-subject",Mc),de("completion-home").focus({preventScroll:!0})}function hi(n){!yt||U.phase==="complete"||(aa(),$t=[],Dn.clear(),vr(),pn=null,Nt=n,kt({type:"pause"}),fi())}function Fr(){Nt=null,kt({type:"resume"}),fi()}function Wl(){if(Nt==="map"){const n=Lt.map((e,t)=>[...e].map((i,r)=>{const s=r===U.player.x&&t===U.player.y,a=Li().find(c=>c.x===r&&c.y===t),o=Rn.find(c=>{const f=Ai(c,U.elapsedMs,U.world);return Math.round(f.x)===r&&Math.round(f.y)===t}),l=s?"●":o?o.kind==="human"?"♟":"·":a?U.resolved.includes(a.id)?"✓":"✧":r===rr.x&&t===rr.y?"↗":i==="S"?"⌂":"";return`<span class="map-cell ${i==="#"?"wall":""} ${U.visited.includes(`${r},${t}`)?"visited":""} ${a?"seal":""} ${s?"player":""}" aria-hidden="true">${l}</span>`}).join("")).join("");on(cn("מפה · הזמן נעצר","מצאו את הדרך שלכם")+`<div class="map-grid" style="grid-template-columns:repeat(${Lt[0].length},1fr);aspect-ratio:${Lt[0].length}/${Lt.length}" role="img" aria-label="מפת המבוך. נקודה מסמנת אתכם, כוכב מסמן מלכודת, חץ מסמן יציאה.">${n}</div><p class="map-legend">● אתם כאן · ✧ מלכודת · ✓ הושלמה · ♟ דמות · ↗ יציאה<br>הגן המזרחי והחורבות בדרום מחוברים למבוך בכמה מעברים. חפשו דמויות, חיות ומשאבת מים.</p>`+Dt("close-panel","חזרה למבוך")),Tt("close-panel",Fr)}else if(Nt==="world"){const n=U.world.dialogue,e=(n==null?void 0:n.entityId)==="scout",t=(n==null?void 0:n.entityId)==="rabbit";on(cn(e?"מפגש עם סייר השבילים":"מפגש בגן",It((n==null?void 0:n.title)||"אורח בשביל"))+`<p>${It((n==null?void 0:n.text)||"יש עוד הרבה לגלות בין השבילים.")}</p><p class="small-note" id="world-topic-text">אפשר לעצור, לשאול ולהכיר את המקום. אין כאן שאלת מבחן.</p><div class="dialog-actions">${t&&!U.world.rabbitFed?Dt("feed-rabbit","לתת לארנב גזר 🥕"):""}${t?"":Dt("world-topic","מה עוד יש באזור?",!1)}${Dt("close-panel",t&&U.world.rabbitFollowing?"לצאת לדרך יחד":"להמשיך לחקור")}</div>`),Tt("close-panel",Fr),Tt("feed-rabbit",()=>{kt({type:"resume"}),kt({type:"world-interact",entityId:"rabbit",intent:"feed"}),kt({type:"pause"}),St==null||St.render(U,Mr())}),Tt("world-topic",()=>{de("world-topic-text").textContent=e?"השביל המואר מוביל למלכודת שטרם סיימתם. בגן המזרחי תמצאו שומרת, משאבה ובעלי חיים. המעברים הדרומיים חוזרים לחצר — אין צורך להתחיל מחדש.":"כשממלאים את קערת המים, השועל מגיע לשתות. אפשר להתקרב אליו ולהציע לו ללכת איתכם. בחורבות מחכה ינשוף, ובין השיחים מסתתר ארנב."})}else Nt==="journal"?(on(cn("יומן הדרך · הזמן נעצר","רמזים שנשארים איתכם")+`<p class="small-note">מתנות שנאספו: ${U.giftsSeen.length} ✧</p><ul class="hint-list"><li>מצאו את המלכודות המסומנות בחותם זוהר. בכל אחת עד שלוש שאלות.</li><li>השלמת השאלות נותנת חותם, גם אחרי טעות.</li><li>כדי להשתחרר מכלוב, אפשר להיעזר ברמזים. אחרי שתי טעויות תקבלו פתרון מודרך.</li>${U.clues.length?"<li>החריטה שגיליתם: שלושה חותמים פותחים את השער. לא צריך לענות נכון על הכול.</li>":"<li>חפשו חריטה מוארת על קיר המבוך.</li>"}${U.treasureCollected?"<li>גיליתם את חדר האוצר הסודי!</li>":""}<li>מפגשים בגנים ובחורבות: ${Object.keys(U.world.interactions).length} מתוך ${Rn.length}.</li>${U.world.scoutGuided?"<li>הסייר סימן את הדרך למלכודת הקרובה שטרם הושלמה.</li>":""}${U.world.waterFilled?"<li>מילאתם את קערת המים בגן.</li>":""}${U.world.foxFollowing?"<li>השועל מכיר אתכם ומלווה אתכם בשביל.</li>":""}</ul>`+Dt("close-panel","חזרה להרפתקה")),Tt("close-panel",Fr)):(on(cn("המשחק בהשהיה","הדרך תחכה לכם")+`<p>${Ln?"ההתקדמות נשמרת בלשונית הזו.":"ההתקדמות אינה נשמרת. הישארו בלשונית הזו כדי להמשיך."} הלבבות, היצורים והמלכודות מחכים עד שתחזרו.</p><p class="small-note">תנועה: החצים או WASD. אפשר ללחוץ על שביל. E לבדיקה מקרוב. F למסך מלא.</p>`+Dt("resume-button","להמשיך מאותו מקום")+`<a class="dialog-link" href="/index.html">חזרה ל־PrepX · ${Ln?"ההתקדמות תישמר":"ללא שמירה"}</a>`),de("dialog-content").insertAdjacentHTML("beforeend",Dt("change-subject","הרפתקה חדשה · החלפת נושא",!1)),Tt("change-subject",Mc),Tt("resume-button",Fr))}function fi(){if(!U)return;zu();const n=yt&&ra.has(U.phase);document.body.dataset.encounter=String(n),de("maze-canvas").setAttribute("aria-label",n?"מבט מגוף ראשון בתוך כלוב. מעבר לסורגים עומד השומר. השתמשו בכפתורי הכלוב כדי להביט, להאיר ולבדוק.":"מבוך תלת־ממדי. תנועה עם החצים או WASD, או לחיצה על שביל."),de("hearts").textContent=Array.from({length:3},(t,i)=>i<U.hearts?"♥":"♡").join(" "),de("hearts").setAttribute("aria-label",`${U.hearts} לבבות מתוך 3`),de("coins").textContent=U.coins,de("seals").textContent=`${U.seals.length} / 3`,de("offline-badge").hidden=!tt.offline;const e=sr(U,tt.questions);if(Qi=[],U.world.scoutGuided)for(const t of Li().filter(i=>!U.resolved.includes(i.id))){const i=Bs(U.player,t);i&&(!Qi.length||i.length<Qi.length)&&(Qi=i)}if(de("location-label").textContent=n?"בתוך הכלוב · מבט מגוף ראשון":e.complete?"שער היציאה מחכה":ci.find(t=>t.id===U.layoutId).title,de("objective-text").textContent=e.complete?"סיימתם את המלכודות. מצאו את השער הזוהר.":`מלכודות ${e.trapsResolved} מתוך ${e.trapsTotal} · ${e.answered} מתוך ${e.total} שאלות`,de("notice").textContent=U.notice||`מפגשים בעולם: ${Object.keys(U.world.interactions).length} מתוך ${Rn.length}. הסייר מחכה בשבילים, ובגן המזרחי יש עוד דמויות ובעלי חיים.`,document.querySelectorAll("[data-direction],#interact-button").forEach(t=>t.disabled=!yt||U.paused||U.phase!=="explore"),!!yt){if(Nt){Wl();return}if(U.paused){Nt="pause",Wl();return}fr()?dg():Gt&&U.phase==="question"?ag():U.phase==="question"||U.phase==="review"?og():U.phase==="feedback"||U.phase==="review-feedback"?cg():U.phase==="capture"?lg():U.phase==="complete"?Vo():gc()}}function Go(n){!yt||Pt.open||Nt||U.phase!=="explore"||Vu[n]&&($t=[],pn=n)}function vc(){if(!yt||U.paused||U.phase!=="explore")return;if(Ge!=null&&Ge.target){qs=!0,Dn.clear(),vr(),$t=[],pn=null;return}qs=!1;const n=Wo(U.player,U.world,U.elapsedMs);n?(kt({type:"world-interact",entityId:n.id}),(n.kind==="human"||n.id==="rabbit")&&hi("world"),St==null||St.render(U,Mr())):kt({type:"interact"})}function Wu(){if(!yt||U.phase!=="explore"||U.paused)return;const n=Wo(U.player,U.world,U.elapsedMs),e=(n==null?void 0:n.actionLabel)||"לבדוק מקרוב";de("interact-button").textContent!==e&&(de("interact-button").textContent=e)}function Xu(n){var a,o;if(!Ge||!yt)return;const e=ir||[...Dn].at(-1)||pn,t=e?Vu[e]:null,i=Ge.target;let r=!!(ir||Dn.size);if(!t&&$t.length>1){const l=$t[0],c=$t[1];r=c.x-l.x===l.x-Ge.origin.x&&c.y-l.y===l.y-Ge.origin.y}const s=Vx(Ge,{direction:t?{dx:t[0],dy:t[1]}:void 0,nextCell:t?void 0:$t[0],continuous:r,canWalk:ln,paused:U.paused||U.phase!=="explore"||Pt.open,dt:n/1e3});Ge=s.movement,pn&&(Ge.target||s.arrived||!ln(Ge.origin.x+((t==null?void 0:t[0])||0),Ge.origin.y+((t==null?void 0:t[1])||0)))&&(pn=null),s.arrived&&(((a=$t[0])==null?void 0:a.x)===s.arrived.x&&((o=$t[0])==null?void 0:o.y)===s.arrived.y&&$t.shift(),kt({type:"move",dx:s.arrived.dx,dy:s.arrived.dy}),qs&&vc()),!i&&!Ge.target&&!s.arrived&&t&&(pn=null),Wu()}function qu(){!U||!St||($s=Bu(),de("nearby-greeting").removeAttribute("data-sequence"),yt=!0,document.body.dataset.intro="false",de("intro").hidden=!0,U.paused&&(U=tu(U,{type:"resume"},tt.questions)),Nt=null,Ge=Kr(U.player),ns(),fi(),Wu(),St.resize(),de("maze-canvas").focus({preventScroll:!0}))}de("start-button").addEventListener("click",qu);de("pause-button").addEventListener("click",()=>hi("pause"));de("map-button").addEventListener("click",()=>hi("map"));de("journal-button").addEventListener("click",()=>hi("journal"));de("world-map-button").addEventListener("click",()=>hi("map"));de("interact-button").addEventListener("click",vc);document.querySelectorAll("[data-direction]").forEach(n=>{n.addEventListener("pointerdown",e=>{e.button!==0||n.disabled||(e.preventDefault(),n.setPointerCapture(e.pointerId),Os.set(e.pointerId,n.dataset.direction),ir=n.dataset.direction,Go(ir))});for(const e of["pointerup","pointercancel","lostpointercapture"])n.addEventListener(e,t=>{Os.delete(t.pointerId)&&(ir=[...Os.values()].at(-1)||null,e!=="pointerup"&&(pn=null))});n.addEventListener("click",e=>{e.detail===0&&Go(n.dataset.direction)})});Pt.addEventListener("cancel",n=>{var e,t;n.preventDefault(),Nt==="subjects"?(e=de("cancel-subject"))!=null&&e.disabled||(t=de("cancel-subject"))==null||t.click():Nt?Fr():fr()?kt({type:"collect-gift",id:fr()}):U.phase==="explore"&&gc()});const Ys={ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",ArrowLeft:"left",w:"up",d:"right",s:"down",a:"left"};window.addEventListener("keydown",n=>{var t,i,r;if(n.ctrlKey||n.metaKey||n.altKey)return;const e=Ys[n.key]||Ys[n.key.toLowerCase()];e&&yt&&!Pt.open&&(n.preventDefault(),n.repeat||($t=[],Go(e),Dn.add(e))),n.key==="Escape"&&yt&&!Pt.open&&(n.preventDefault(),hi("pause")),n.key.toLowerCase()==="e"&&yt&&!Pt.open&&vc(),n.key.toLowerCase()==="f"&&yt&&!Pt.open&&(document.fullscreenElement?(t=document.exitFullscreen)==null||t.call(document):(r=(i=document.querySelector(".game-shell")).requestFullscreen)==null||r.call(i).catch(()=>{}))});window.addEventListener("keyup",n=>Dn.delete(Ys[n.key]||Ys[n.key.toLowerCase()]));window.addEventListener("blur",()=>{Dn.clear(),vr(),pn=null,$t=[]});document.addEventListener("visibilitychange",()=>{document.hidden&&yt&&!U.paused&&U.phase!=="complete"&&hi("pause")});de("maze-canvas").addEventListener("click",n=>{if(!yt||Pt.open||U.phase!=="explore")return;const e=St.cellFromPointer(n.clientX,n.clientY);if(e&&ln(e.x,e.y)){Dn.clear(),vr(),pn=null;const t=(Ge==null?void 0:Ge.target)||U.player;$t=Bs(t,e)||[],Ge!=null&&Ge.target&&$t.unshift({...Ge.target})}});function $u(n){!U||!yt||fr()||(Gt&&!U.paused&&!Nt&&(Gt.remaining=Math.max(0,Gt.remaining-n),(Gt.remaining===0||Zr.matches)&&Hu()),Mn=Fu(Mn,{type:"tick",dt:n},ku()),kt({type:"tick",ms:n,moving:!!(Ge!=null&&Ge.target)}),Zr.matches&&U.phase==="capture"&&kt({type:"skip-capture"}),$s=Qx($s,{dt:n,player:(Ge==null?void 0:Ge.position)||U.player,world:U.world,elapsedMs:U.elapsedMs,phase:U.phase,paused:U.paused||!yt}),zu())}window.advanceTime=n=>{for(let e=Math.min(n,6e4);e>0;e-=16.667){const t=Math.min(16.667,e);Xu(t),$u(t)}St==null||St.render(U,Mr())};window.render_game_to_text=()=>{var n;return JSON.stringify(U?{coordinates:"tile origin upper-left; x right/east, y down/south; directions are world axes",layoutId:U.layoutId,gifts:U.giftsSeen,pendingGift:fr(),maze:Lt,quizId:tt.id,started:yt,phase:U.phase,paused:U.paused,player:U.player,movement:Ge,greeting:xc(),world:U.world,worldEntities:Rn.map(e=>({...e,position:Ai(e,U.elapsedMs,U.world)})),nearbyEntity:((n=Wo(U.player,U.world,U.elapsedMs))==null?void 0:n.id)||null,hearts:U.hearts,coins:U.coins,seals:U.seals,progress:sr(U,tt.questions),activeEncounter:U.activeEncounter,review:U.review,captureCount:U.captureCount,captureMs:U.captureMs,elapsedMs:U.elapsedMs,graceMs:U.graceMs,currentQuestion:wn(U,tt.questions)?{id:wn(U,tt.questions).id,options:wn(U,tt.questions).options}:null,encounters:Li().map(e=>({...e,resolved:U.resolved.includes(e.id),questions:U.assignments[e.id].length,answered:U.assignments[e.id].filter(t=>U.answers[t]).length})),exit:rr,clues:U.clues,treasureCollected:U.treasureCollected,notice:U.notice,source:tt.source,contentVersion:tt.version,storageAvailable:Ln,panel:Nt,trapEntry:Gt?{active:!0,elapsedMs:mc-Gt.remaining,remainingMs:Gt.remaining,encounter:Gt.encounter}:null,view:ra.has(U.phase)&&yt?"first-person-cage":"maze",interaction:Mn}:{phase:"loading"})};function Yu(n){const e=ka?Math.min(100,n-ka):0;ka=n,U&&(Xu(e),$u(e),Va+=e,Va>1500&&(ns(),Va=0),St==null||St.render(U,Mr())),requestAnimationFrame(Yu)}function ju(){Ge=Kr(U.player),Qi=[];const n=de("quiz-select");n.innerHTML=Wr.map(t=>`<option value="${qn(t.id)}">${It(t.title)}</option>`).join(""),n.value=tt.id;const e=Object.keys(U.answers).length>0||U.visited.length>1;n.disabled=e,de("new-adventure-button").hidden=!e,de("start-button").textContent=e?"להמשיך מאותו מקום":"להיכנס למבוך ←",de("start-button").disabled=!1,n.addEventListener("change",async()=>{n.disabled=!0,de("start-button").disabled=!0,de("start-button").textContent="טוענים את חומר התרגול…";try{tt=await Js({quizId:n.value}),U=Jr(tt.questions),Ge=Kr(U.player),ns(),fi(),de("start-button").textContent="להיכנס למבוך ←"}catch{de("notice").textContent="לא הצלחנו לטעון תרגול. אפשר לנסות שוב או לחזור ל־PrepX."}finally{n.disabled=!1,de("start-button").disabled=!1}}),de("layout-name").textContent=ci.find(t=>t.id===U.layoutId).title,fi(),requestAnimationFrame(Yu)}function ug(n){return`<svg viewBox="0 0 100 104" width="106" height="110" aria-hidden="true">${['<polygon points="20,24 50,8 80,24 94,46 50,96 6,46" fill="#f2c477"/><path d="M20 24 34 46 50 8 66 46 80 24M6 46H94M34 46 50 96 66 46" fill="none" stroke="#fff2c9" stroke-width="3"/><path d="M66 46H94L50 96Z" fill="#ac7139"/><path d="M20 24 6 46H34Z" fill="#fff0bc"/>','<circle cx="50" cy="28" r="20" fill="none" stroke="#f2c477" stroke-width="12"/><path d="M50 49V94M50 72H72M50 86H65" fill="none" stroke="#f2c477" stroke-width="12" stroke-linecap="round"/>','<path d="m50 5 13 30 32 4-24 23 7 33-28-17-28 17 7-33L5 39l32-4Z" fill="#f2c477" stroke="#fff0bb" stroke-width="3"/><path d="M50 5V78L29 62Z" fill="#fff0bb"/>'][n%3]}</svg>`}function dg(){const n=fr(),e=Li().findIndex(i=>i.id===n),t=["גביש אור","מפתח הירח","כוכב השומר","אבן להבה","פנינת ההד","נוצת הלחישות","אבן רונות","טיפת אור","קשת זהב","יהלום הכספת"];on(cn("המלכודת הושלמה!","מתנה לדרך")+`<div class="gift-scene" aria-hidden="true"><div class="gift-rays"></div><div class="gift-gem">${ug(e)}</div>${Array.from({length:12},(i,r)=>`<i style="--i:${r}"></i>`).join("")}</div><h3 class="gift-name">${t[e]||"גביש אור"}</h3><p class="gift-description">מתנה לאוסף שלכם · גם אחרי טעויות ממשיכים!</p>`+Dt("collect-gift","לקחת ולהמשיך ←")),Pt.classList.add("gift-sheet"),de("collect-gift").focus({preventScroll:!0}),Tt("collect-gift",()=>{Pt.classList.remove("gift-sheet"),kt({type:"collect-gift",id:n})})}function Mc(){var e;aa(),Dn.clear(),vr(),pn=null,$t=[],yt&&U.phase!=="complete"&&kt({type:"pause"}),Nt="subjects",on(cn("הרפתקה חדשה","מה מתרגלים עכשיו?")+`<label for="new-subject">נושא לתרגול</label><select id="new-subject">${Wr.map(t=>`<option value="${qn(t.id)}">${It(t.title)}</option>`).join("")}</select><p class="small-note">ההרפתקה הנוכחית תישמר בלשונית הזו. הרפתקה חדשה מתחילה במבוך אחר.</p><p id="subject-error" role="status"></p>`+Dt("new-subject-start","להתחיל הרפתקה חדשה")+Dt("resume-subject","לחזור להרפתקה השמורה בנושא הזה",!1)+Dt("cancel-subject","חזרה למשחק",!1)),Pt.classList.remove("gift-sheet"),de("new-subject").value=((e=Wr.find(t=>t.id!==tt.id))==null?void 0:e.id)||tt.id;const n=()=>{try{de("resume-subject").hidden=!sessionStorage.getItem(An+"-subject-"+de("new-subject").value)}catch{de("resume-subject").hidden=!0}};n(),de("new-subject").addEventListener("change",n),Tt("new-subject-start",()=>Xl(!1)),Tt("resume-subject",()=>Xl(!0)),Tt("cancel-subject",()=>{Nt=null,yt?(kt({type:"resume"}),fi()):gc()}),de("new-subject").focus({preventScroll:!0})}async function Xl(n){const e=de("new-subject").value;document.querySelectorAll("#dialog-content button,#new-subject").forEach(t=>t.disabled=!0);try{if(!Ln)throw new Error("Storage unavailable");let t;if(n){const s=sessionStorage.getItem(An+"-subject-"+e);t=sessionStorage.getItem(s);const a=JSON.parse(t),o=ks(a.content,{pinned:!0});if(o.id!==e||!nu(a.state,o.questions))throw new Error("Invalid archived run")}else{const s=await Js({quizId:e}),a=ci.findIndex(o=>o.id===U.layoutId);Or(ci[(a+1)%ci.length].id),t=JSON.stringify({content:s,state:Jr(s.questions)})}Or(U.layoutId);const i=JSON.stringify({content:tt,state:U}),r=An+"-run-"+Date.now();if(sessionStorage.setItem(r,i),sessionStorage.getItem(r)!==i)throw new Error("Archive not verified");sessionStorage.setItem(An+"-subject-"+tt.id,r),Oo=!0,sessionStorage.setItem(An,t),location.reload()}catch{Oo=!1,Or(U.layoutId),de("subject-error").textContent="לא הצלחנו לפתוח הרפתקה. המשחק הנוכחי נשאר כאן; אפשר לנסות שוב.",document.querySelectorAll("#dialog-content button,#new-subject").forEach(t=>t.disabled=!1)}}de("new-adventure-button").addEventListener("click",Mc);async function fg(n,e){var t;e.disabled=!0;try{const i=await Js({quizId:zs});try{const r=An+"-unrestorable-"+Date.now();if(sessionStorage.setItem(r,n),sessionStorage.getItem(r)!==n)throw new Error("Backup verification failed")}catch{sa()}tt=i,Or(),U=Jr(tt.questions),St||(St=Iu(de("maze-canvas"))),de("start-button").onclick=null,de("quiz-select").hidden=!1,(t=document.querySelector(".recovery-actions"))==null||t.remove(),ju(),qu()}catch{e.disabled=!1,de("notice").textContent="לא הצלחנו לפתוח הרפתקה נפרדת. השמירה הקודמת נשארה ללא שינוי."}}async function hg(){document.body.dataset.intro="true";try{let n=null,e=!1,t=null;try{t=sessionStorage.getItem(An)}catch{sa()}if(t)try{const i=JSON.parse(t),r=ks(i.content,{pinned:!0}),s=nu(i.state,r.questions);s?n={content:r,state:s}:e=!0}catch{e=!0}if(e){de("start-button").textContent="לנסות לשחזר שוב",de("start-button").disabled=!1,de("notice").textContent="לא הצלחנו לשחזר את ההרפתקה. השמירה הקודמת נשארה ללא שינוי.",de("start-button").onclick=()=>location.reload(),de("quiz-select").hidden=!0;const i=document.createElement("div");i.className="recovery-actions";const r=document.createElement("button");r.id="new-expedition-button",r.className="button",r.textContent="הרפתקה נפרדת · שמירת העותק הישן",r.addEventListener("click",()=>fg(t,r)),i.append(r);const s=document.createElement("a");s.className="dialog-link",s.href="/index.html",s.textContent="חזרה ל־PrepX בלי לשנות את השמירה",i.append(s),de("start-button").after(i);return}if(n)tt=n.content,U=n.state;else{const i=new URLSearchParams(location.search).get("quiz")||zs,r=Wr.some(s=>s.id===i);tt=await Js({quizId:r?i:zs}),U=Jr(tt.questions),r||(U.notice="הקישור הפנה לתרגול לא מוכר. בחרנו תרגול זמין; אפשר לבחור אחר לפני הכניסה.")}try{St=Iu(de("maze-canvas"))}catch{de("renderer-error").hidden=!1;return}ju()}catch{de("start-button").textContent="לנסות לטעון שוב",de("start-button").disabled=!1,de("start-button").onclick=()=>location.reload(),de("notice").textContent="חומר התרגול לא נטען. אפשר לנסות שוב בלי לאבד התקדמות."}}hg();
