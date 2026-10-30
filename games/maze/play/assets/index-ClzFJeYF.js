(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Dn=[{id:"scout",kind:"human",name:"אורי · סייר השבילים",title:"סייר השבילים",actionLabel:"לדבר עם אורי",x:3,y:7,path:[{x:3,y:7},{x:2,y:7},{x:1,y:7},{x:2,y:7}]},{id:"keeper",kind:"human",name:"מיה · שומרת הגן",title:"שומרת הגן",actionLabel:"לדבר עם מיה",x:19,y:3,path:[{x:19,y:3},{x:20,y:3},{x:21,y:3},{x:20,y:3}]},{id:"fox",kind:"fox",name:"שועל הגן",title:"שועל הגן",actionLabel:"להתקרב לשועל",x:19,y:7},{id:"rabbit",kind:"rabbit",name:"ארנב בין השיחים",title:"ארנב בין השיחים",actionLabel:"להתקרב בשקט",x:21,y:11},{id:"owl",kind:"owl",name:"ינשוף החורבות",title:"ינשוף החורבות",actionLabel:"להביט בינשוף",x:15,y:15},{id:"pump",kind:"pump",name:"משאבת הגן",title:"משאבת הגן",actionLabel:"למלא את קערת המים",x:17,y:11},{id:"lamp",kind:"lamp",name:"פנס הגן",title:"פנס הגן",actionLabel:"להדליק את הפנס",x:21,y:3},{id:"bench",kind:"bench",name:"ספסל בין החורבות",title:"ספסל בין החורבות",actionLabel:"לנוח לרגע",x:9,y:15}],Ur={x:19,y:11},Dl=["scoutGuided","lightsOn","waterFilled","foxFollowing","foxDrinking","rabbitCalm","owlObserved","benchRested","playerResting"],wo=(n,e)=>n.x===e.x&&n.y===e.y,fc=n=>n&&Number.isInteger(n.x)&&Number.isInteger(n.y)&&n.x>=1&&n.x<=21&&n.y>=1&&n.y<=15,Uu=n=>JSON.parse(JSON.stringify(n));function As(){return{version:1,...Object.fromEntries(Dl.map(n=>[n,!1])),interactions:{},dialogue:null,fox:{x:19,y:7,previous:{x:19,y:7},startedMs:0},foxMoveMs:0}}function Nu(n,e=()=>!0,t=1/0){var r;const i=As();if(!n||n.version!==1)return i;for(const s of Dl)i[s]=n[s]===!0;for(const s of Dn)((r=n.interactions)==null?void 0:r[s.id])===1&&(i.interactions[s.id]=1);return fc(n.fox)&&e(n.fox.x,n.fox.y)&&(i.fox={x:n.fox.x,y:n.fox.y,previous:fc(n.fox.previous)&&e(n.fox.previous.x,n.fox.previous.y)&&Math.abs(n.fox.previous.x-n.fox.x)+Math.abs(n.fox.previous.y-n.fox.y)<=1?{...n.fox.previous}:{x:n.fox.x,y:n.fox.y},startedMs:Number.isFinite(n.fox.startedMs)&&n.fox.startedMs>=0&&n.fox.startedMs<1e12&&n.fox.startedMs<=t?n.fox.startedMs:0}),i.foxMoveMs=Number.isFinite(n.foxMoveMs)&&n.foxMoveMs>=0&&n.foxMoveMs<1e12&&n.foxMoveMs<=t?n.foxMoveMs:0,i.foxFollowing=i.foxFollowing&&i.waterFilled,i.foxDrinking=i.waterFilled&&!i.foxFollowing&&wo(i.fox,Ur),i}function Si(n,e=0,t=As()){var i;if(n.id==="fox"){const r=t.fox||As().fox,s=r.previous||r,a=Math.max(0,Math.min(1,(e-r.startedMs)/550));return{x:s.x+(r.x-s.x)*a,y:s.y+(r.y-s.y)*a,heading:Math.atan2(r.x-s.x,r.y-s.y),moving:a<1&&!wo(s,r)}}if((i=n.path)!=null&&i.length){const r=Math.floor(e/2400)%n.path.length,s=n.path[r],a=n.path[(r+1)%n.path.length],o=e%2400/2400;return{x:s.x+(a.x-s.x)*o,y:s.y+(a.y-s.y)*o,heading:Math.atan2(a.x-s.x,a.y-s.y),moving:!0}}return{x:n.x,y:n.y,heading:0,moving:!1}}function Ro(n,e,t=0){var i;return!n||!Number.isFinite(n.x)||!Number.isFinite(n.y)?null:((i=Dn.map(r=>({entity:r,position:Si(r,t,e)})).map(r=>({...r,distance:Math.abs(r.position.x-n.x)+Math.abs(r.position.y-n.y)})).filter(r=>r.distance<=1.5).sort((r,s)=>r.distance-s.distance)[0])==null?void 0:i.entity)||null}function Fu(n,e,t,i=0){const r=Dn.find(l=>l.id===e);if(!r||!t||!Number.isFinite(t.x)||!Number.isFinite(t.y))return null;const s=Si(r,i,n);if(Math.abs(s.x-t.x)+Math.abs(s.y-t.y)>1.5)return null;const a=Uu(n);a.interactions[r.id]=1;let o;return r.id==="scout"?(a.scoutGuided=!0,o="שלושה חותמים, ומלכודות קצרות של עד שלוש שאלות. שביל הגן מתחבר לחורבות מדרום — אפשר להקיף ולחזור. סימנתי את הדרך ביומן שלכם."):r.id==="keeper"?(a.lightsOn=!0,o="טוב שהגעתם. הדלקתי בשבילכם את פנסי הגן. ליד החורבות יש משאבה וקערת מים — השועל יעריך את זה."):r.id==="pump"?(a.waterFilled=!0,o="המשאבה זורמת וקערת המים התמלאה. השועל מתקדם אליה בשבילי הגן."):r.id==="fox"?a.waterFilled?(a.foxFollowing=!0,a.foxDrinking=!1,o="השועל מזהה שעזרתם למלא מים, ומתקרב כדי ללכת אתכם. הוא יישאר על השבילים, במרחק בטוח."):o="השועל מרחרח את האוויר ומביט לכיוון המשאבה. נראה שהוא מחפש מים.":r.id==="rabbit"?(a.rabbitCalm=!0,o="התקרבתם בשקט. הארנב נשאר לידכם במקום לברוח, ומציץ מעבר לשיחים."):r.id==="owl"?(a.owlObserved=!0,o="הינשוף מסובב את ראשו אל המעבר הצפוני של החורבות. הדרך חוזרת למבוך — זו אינה דרך ללא מוצא."):r.id==="lamp"?(a.lightsOn=!0,o="הפנס נדלק, ואור חם מתפשט לאורך שבילי הגן."):(a.benchRested=!0,a.playerResting=!0,o="רגע שקט בין החורבות. שום התקדמות לא אבדה. אפשר לקום ולהמשיך בכל רגע."),a.dialogue={entityId:r.id,title:r.name,text:o},{world:a,notice:o,entity:r}}function hc(n,e,t){if(!n||!e)return n;if(e.type==="move")return n.playerResting?{...n,playerResting:!1}:n;if(e.type!=="tick"||!Number.isFinite(e.elapsedMs)||typeof t!="function")return n;const i=n.foxFollowing?e.player:n.waterFilled?Ur:null;if(!i)return n;const r={x:n.fox.x,y:n.fox.y},s=t(r,i);if(!s)return n;const a=n.foxFollowing?1:0;if(s.length<=a){const l=n.waterFilled&&!n.foxFollowing&&wo(r,Ur);return l===n.foxDrinking?n:{...n,foxDrinking:l}}if(e.elapsedMs-n.foxMoveMs<650)return n;const o=s[0];return{...n,foxDrinking:!1,foxMoveMs:e.elapsedMs,fox:{...o,previous:r,startedMs:e.elapsedMs}}}const Vt=["#######################","#S..#.....#....X#.....#","#.#.#.###.#.###.#.###.#","#.#...#...#...........#","#.#####.#####.#.#.#.#.#","#...A...#..B..#.#.#...#","###.#.###.#.###.#.###.#","#...#.....#...........#","#.#######.#####.#.#.#.#","#...C...#...G...#.#...#","#.###.#.###.#.#.#.###.#","#.....#.....#T........#","###.#####.#####.#.###.#","#.....#.....#.........#","#.###.#.###.#.#####.#.#","#.....................#","#######################"],rn={x:1,y:1},tr={x:15,y:1},Ca={x:4,y:9},Pa={x:13,y:11},ci=[{id:"floor",x:4,y:5,kind:"floor",title:"רצפת הסודות"},{id:"cage",x:11,y:5,kind:"cage",title:"כלוב הצללים"},{id:"guardian",x:12,y:9,kind:"guardian",title:"שומר החותם"}],Ou=[{id:"embers",x:3,y:3,kind:"floor",title:"גשר הגחלים"},{id:"echo",x:7,y:1,kind:"cage",title:"מסדרון ההד"},{id:"whisper",x:9,y:3,kind:"guardian",title:"שער הלחישות"},{id:"runes",x:1,y:7,kind:"floor",title:"אבני הרונות"},{id:"well",x:5,y:11,kind:"cage",title:"באר הצללים"},{id:"arch",x:9,y:11,kind:"guardian",title:"קשת הסודות"},{id:"vault",x:15,y:7,kind:"cage",title:"חדר הכספת"}],Co=[...ci,...Ou];function Ei(n){return Co.slice(0,Math.max(3,Math.ceil(n.length/3)))}function Ll(n){const e=Ei(n);return Object.fromEntries(e.map((t,i)=>[t.id,n.filter((r,s)=>Math.min(e.length-1,Math.floor(s*e.length/n.length))===i)]))}const Po=[{id:"prowler",kind:"shadow",encounter:"cage",path:[{x:10,y:5},{x:11,y:5},{x:12,y:5},{x:13,y:5}]},{id:"warden",kind:"guardian",encounter:"guardian",path:[{x:11,y:9},{x:12,y:9},{x:13,y:9},{x:14,y:9},{x:15,y:9}]}],Il=n=>n.id==="warden"?1900:1600;function Ul(n,e=0){var r;if(!((r=n==null?void 0:n.path)!=null&&r.length))return null;const t=n.path.length;if(t===1)return{...n.path[0]};const i=Math.floor(Math.max(0,e)/Il(n))%(t*2-2);return{...n.path[i<t?i:t*2-2-i]}}const Bu=new Set(["explore","question","feedback","capture","review","review-feedback","complete"]),Nl=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}],Fl=n=>JSON.parse(JSON.stringify(n)),ji=(n,e)=>n.x===e.x&&n.y===e.y,pc=(n,e)=>Math.abs(n.x-e.x)+Math.abs(n.y-e.y),ur=(n,e)=>Object.hasOwn(n.answers,e),Ol=n=>JSON.stringify(n.map(e=>[e.id,e.prompt,e.choices,e.correct,e.difficulty,e.explanation,e.ref])),mc=(n,e)=>{const t=[...n];for(let i=t.length-1;i>0;i--){const r=Math.floor(e()*(i+1));[t[i],t[r]]=[t[r],t[i]]}return t},an=(n,e)=>{var t;return Number.isInteger(n)&&Number.isInteger(e)&&!!((t=Vt[e])!=null&&t[n])&&Vt[e][n]!=="#"};function ws(n,e){if(!n||!e||!an(n.x,n.y)||!an(e.x,e.y))return null;const t=[{...n,path:[]}],i=new Set([`${n.x},${n.y}`]);for(let r=0;r<t.length;r++){const s=t[r];if(ji(s,e))return s.path;for(const a of Nl){const o={x:s.x+a.x,y:s.y+a.y},l=`${o.x},${o.y}`;an(o.x,o.y)&&!i.has(l)&&(i.add(l),t.push({...o,path:[...s.path,o]}))}}return null}function Bl(n){if(!Array.isArray(n)||n.length<1||n.length>30||new Set(n.map(e=>e.id)).size!==n.length||n.some(e=>typeof e.id!="string"||!Array.isArray(e.choices)||e.choices.length<2||!Number.isInteger(e.correct)||e.correct<0||e.correct>=e.choices.length))throw new Error("Invalid maze question content")}const Os=(n,e)=>n.assignments[e]||[],Do=n=>Os(n,n.activeEncounter).find(e=>!ur(n,e)),Bs=(n,e)=>Os(n,e).every(t=>ur(n,t));function Lo(n){n.resolved=Co.filter(e=>Object.hasOwn(n.assignments,e.id)&&Bs(n,e.id)).map(e=>e.id),n.sealProofs||(n.sealProofs={});for(const e of ci)n.resolved.includes(e.id)&&!Object.hasOwn(n.sealProofs,e.id)&&(n.sealProofs[e.id]=[...Os(n,e.id)]);n.seals=ci.filter(e=>n.seals.includes(e.id)||n.resolved.includes(e.id)).map(e=>e.id)}function zu(n,e){var o;const t=Object.fromEntries(ci.map((l,c)=>[l.id,n.order.filter((f,u)=>Math.min(2,Math.floor(u*3/n.order.length))===c)])),i=(l,c)=>Array.isArray(l)&&l.length===c.length&&l.every((f,u)=>f===c[u]),r=l=>e.assignments&&Object.keys(e.assignments).length===Object.keys(l).length&&Object.entries(l).every(([c,f])=>i(e.assignments[c],f)),s=r(t),a=r(n.assignments);n.seals=[],n.sealProofs={};for(const l of ci){if(!Array.isArray(e.seals)||!e.seals.includes(l.id))continue;const c=(o=e.sealProofs)==null?void 0:o[l.id],f=t[l.id],u=Os(n,l.id);let d=null;i(c,f)||i(c,u)?d=c:s?d=f:a&&(d=u),d&&d.every(p=>ur(n,p))&&(n.seals.push(l.id),n.sealProofs[l.id]=[...d])}}function ku(n,e){const t=new Set([...Co,...Po.flatMap(o=>o.path)].map(o=>`${o.x},${o.y}`)),i=o=>o&&an(o.x,o.y)&&!t.has(`${o.x},${o.y}`),r=n&&an(n.x,n.y)?n:e,s=r?[{...r}]:[],a=new Set;for(let o=0;o<s.length;o++){const l=s[o],c=`${l.x},${l.y}`;if(!a.has(c)){if(a.add(c),i(l))return l;for(const f of Nl){const u={x:l.x+f.x,y:l.y+f.y};an(u.x,u.y)&&!a.has(`${u.x},${u.y}`)&&s.push(u)}}}if(i(e))return{...e};throw new Error("No reachable recovery tile")}function Zr(n,e){Bs(n,e.id)||(n.activeEncounter=e.id,n.phase="question",n.notice=null)}function xc(n,e=n.elapsedMs,t=n.elapsedMs){if(n.phase!=="explore"||n.graceMs>t-e)return null;const i=e+n.graceMs;let r=null;for(const s of Po){const a=ci.find(l=>l.id===s.encounter);if(Bs(n,a.id))continue;const o=Il(s);for(let l=Math.floor(i/o);l<=Math.floor(t/o);l++){const c=Math.max(i,l*o);ji(n.player,Ul(s,c))&&(!r||c<r.time)&&(r={room:a,time:c})}}return r}function Da(n,e){const t=n.order.filter(r=>{var s;return((s=n.answers[r])==null?void 0:s.correct)===!1&&e.some(a=>a.id===r)}),i=t.length?[t.at(-1),t.length>1?t.at(-2):t[0]]:[];n.review={ids:i,index:0,wrong:0,hint:0,correct:null,guided:i.length===0},n.phase="review"}function Vu(n){n.hearts=3,n.player=ku(n.capturePosition||n.player,n.checkpoint),n.checkpoint={...n.player},n.graceMs=5e3,n.phase="explore",n.activeEncounter=null,n.review=null,n.captureMs=0,n.notice="הצלחתם להשתחרר! ההתקדמות נשמרה. אפשר להמשיך מאותה מלכודת."}function zs(n,e=Math.random){Bl(n);const t=mc(n.map(s=>s.id),e),i=Ll(t),r={version:1,contentKey:Ol(n),order:t,choiceOrders:Object.fromEntries(n.map(s=>[s.id,mc(s.choices.map((a,o)=>o),e)])),assignments:i,world:As(),phase:"explore",paused:!1,player:{...rn},checkpoint:{...rn},hearts:3,coins:0,seals:[],sealProofs:{},resolved:[],answers:{},activeEncounter:null,lastAnswer:null,review:null,capturePosition:null,captureMs:0,captureCount:0,graceMs:0,elapsedMs:0,clues:[],treasureCollected:!1,visited:[`${rn.x},${rn.y}`],notice:null};return Lo(r),r}function Xn(n,e){var r,s;const t=n.phase==="review"||n.phase==="review-feedback"?(r=n.review)==null?void 0:r.ids[n.review.index]:n.phase==="feedback"?(s=n.lastAnswer)==null?void 0:s.id:Do(n),i=e.find(a=>a.id===t);return i?{...i,options:(n.choiceOrders[t]||i.choices.map((a,o)=>o)).map(a=>({text:i.choices[a],original:a}))}:null}function nr(n,e){const t={easy:1,medium:1.5,hard:2},i=e.reduce((a,o)=>a+(t[o.difficulty]||1.5),0),r=e.reduce((a,o)=>{var l;return a+((l=n.answers[o.id])!=null&&l.correct?t[o.difficulty]||1.5:0)},0),s=e.filter(a=>ur(n,a.id)).length;return{answered:s,total:e.length,trapsResolved:Ei(e).filter(a=>n.resolved.includes(a.id)).length,trapsTotal:Ei(e).length,correct:e.filter(a=>{var o;return(o=n.answers[a.id])==null?void 0:o.correct}).length,score:i?Math.round(r/i*100):0,complete:s===e.length&&n.seals.length===3}}function zl(n,e,t){var r;if(!n||!e||typeof e.type!="string")return n;if(e.type==="pause")return n.paused||n.phase==="complete"?n:{...n,paused:!0};if(e.type==="resume")return n.paused?{...n,paused:!1}:n;if(n.paused||n.phase==="complete")return n;const i=Fl(n);if(e.type==="world-interact"&&i.phase==="explore"){const s=Fu(i.world,e.entityId,i.player,i.elapsedMs);return s?(i.world=s.world,i.notice=s.notice,i):n}if(e.type==="tick"){if(!Number.isFinite(e.ms)||e.ms<=0)return n;const s=Math.min(e.ms,6e4);if(i.phase==="explore"){const a=e.moving===!0?null:xc(i,i.elapsedMs,i.elapsedMs+s);i.elapsedMs=a?a.time:i.elapsedMs+s,i.graceMs=a?0:Math.max(0,i.graceMs-s),i.world=hc(i.world,{type:"tick",elapsedMs:i.elapsedMs,player:i.player},ws),a&&Zr(i,a.room)}else if(i.phase==="capture")i.captureMs+=s,i.captureMs>=3e3&&Da(i,t);else return n;return i}if(e.type==="skip-capture"&&i.phase==="capture")return Da(i,t),i;if(e.type==="move"&&i.phase==="explore"){if(!Number.isInteger(e.dx)||!Number.isInteger(e.dy)||Math.abs(e.dx)+Math.abs(e.dy)!==1)return n;const s={x:i.player.x+e.dx,y:i.player.y+e.dy};if(!an(s.x,s.y))return n;i.checkpoint={...i.player},i.player=s,i.notice=null,i.world=hc(i.world,{type:"move",player:i.player},ws);const a=`${s.x},${s.y}`;i.visited.includes(a)||i.visited.push(a),ji(s,Ca)&&!i.clues.includes("route")&&(i.clues.push("route"),i.notice="חריטה על הקיר: שלושה חותמים והשלמת המלכודות פותחים את השער. גם אחרי טעות, הדרך נשארת פתוחה."),ji(s,Pa)&&!i.treasureCollected&&(i.treasureCollected=!0,i.notice="מצאתם חדר אוצר סודי! התיבה שומרת אור לדרך חזרה.");const o=Ei(t).find(l=>ji(l,s));if(o&&Zr(i,o),i.phase==="explore"&&i.graceMs===0){const l=xc(i);l&&Zr(i,l.room)}return ji(s,tr)&&(nr(i,t).complete?i.phase="complete":i.notice="כדי לפתוח את השער, אספו את שלושת החותמים והשלימו את המלכודות. לא צריך לענות נכון על הכול."),i}if(e.type==="interact"&&i.phase==="explore"){const s=Ei(t).find(a=>pc(a,i.player)<=1&&!Bs(i,a.id));return s?(Zr(i,s),i):pc(i.player,tr)<=1?(nr(i,t).complete?i.phase="complete":i.notice="השער מחכה לשלושת החותמים ולהשלמת המלכודות. אפשר לטעות ולהמשיך.",i):n}if(e.type==="answer"&&i.phase==="question"){const s=Xn(i,t);if(!s||ur(i,s.id)||!Number.isInteger(e.choice)||e.choice<0||e.choice>=s.choices.length)return n;const a=e.choice===s.correct;return i.answers[s.id]={choice:e.choice,correct:a},i.lastAnswer={id:s.id,choice:e.choice,correct:a},a?i.coins+=10:i.hearts=Math.max(0,i.hearts-1),Lo(i),i.hearts===0?(i.phase="capture",i.capturePosition={...i.player},i.captureMs=0,i.captureCount+=1):i.phase="feedback",i}if(e.type==="continue"&&i.phase==="feedback")return Do(i)?i.phase="question":(i.phase="explore",i.activeEncounter=null,i.notice="החותם שלכם. הדרך פתוחה — ממשיכים לחקור!"),i;if(e.type==="review-answer"&&i.phase==="review"){const s=Xn(i,t);return!s||i.review.guided||!Number.isInteger(e.choice)||e.choice<0||e.choice>=s.choices.length?n:(i.review.correct=e.choice===s.correct,i.review.correct||(i.review.wrong+=1,i.review.hint=Math.min(2,i.review.wrong)),i.phase="review-feedback",i)}return(e.type==="continue"||e.type==="guided-continue")&&(i.phase==="review-feedback"||i.phase==="review"&&((r=i.review)!=null&&r.guided))?(i.review.guided||i.review.correct||i.review.wrong>=2?i.review.guided||i.review.index===1?Vu(i):(i.review.index+=1,i.review.wrong=0,i.review.hint=0,i.review.correct=null,i.phase="review"):(i.review.correct=null,i.phase="review"),i):n}function Gu(n,e){var t;try{Bl(e);const i=typeof n=="string"?JSON.parse(n):Fl(n);if(!i||i.version!==1||i.contentKey!==Ol(e)||!Array.isArray(i.order)||i.order.length!==e.length||new Set(i.order).size!==e.length||i.order.some(a=>!e.some(o=>o.id===a)))return null;const r=zs(e,()=>.999999);r.order=i.order,r.assignments=Ll(r.order),r.choiceOrders={};for(const a of e){const o=(t=i.choiceOrders)==null?void 0:t[a.id];r.choiceOrders[a.id]=Array.isArray(o)&&o.length===a.choices.length&&new Set(o).size===o.length&&o.every(l=>Number.isInteger(l)&&l>=0&&l<o.length)?o:a.choices.map((l,c)=>c)}if(!i.answers||typeof i.answers!="object"||Array.isArray(i.answers))return null;r.answers={};for(const[a,o]of Object.entries(i.answers)){const l=e.find(c=>c.id===a);if(!l||!Number.isInteger(o==null?void 0:o.choice)||o.choice<0||o.choice>=l.choices.length)return null;r.answers[a]={choice:o.choice,correct:o.choice===l.correct}}const s=a=>a&&an(a.x,a.y);if(r.player=s(i.player)?i.player:s(i.checkpoint)?i.checkpoint:{...rn},r.checkpoint=s(i.checkpoint)?i.checkpoint:{...rn},r.hearts=Number.isInteger(i.hearts)?Math.min(3,Math.max(0,i.hearts)):3,r.coins=Object.values(r.answers).filter(a=>a.correct).length*10,r.clues=Array.isArray(i.clues)&&i.clues.includes("route")?["route"]:[],r.treasureCollected=i.treasureCollected===!0,r.visited=Array.isArray(i.visited)?[...new Set(i.visited.filter(a=>typeof a=="string"&&/^\d+,\d+$/.test(a)&&an(...a.split(",").map(Number))))]:[],r.visited.includes(`${r.player.x},${r.player.y}`)||r.visited.push(`${r.player.x},${r.player.y}`),r.elapsedMs=Number.isFinite(i.elapsedMs)&&i.elapsedMs>=0&&i.elapsedMs<=Number.MAX_SAFE_INTEGER?i.elapsedMs:0,r.world=Nu(i.world,an,r.elapsedMs),r.graceMs=Number.isFinite(i.graceMs)?Math.max(0,Math.min(5e3,i.graceMs)):0,r.captureCount=Number.isInteger(i.captureCount)&&i.captureCount>=0?i.captureCount:0,r.capturePosition=s(i.capturePosition)?i.capturePosition:{...r.player},r.captureMs=Number.isFinite(i.captureMs)?Math.max(0,Math.min(3e3,i.captureMs)):0,r.phase=Bu.has(i.phase)?i.phase:"explore",r.paused=i.paused===!0,r.activeEncounter=Ei(e).some(a=>a.id===i.activeEncounter)?i.activeEncounter:null,r.lastAnswer=i.lastAnswer&&ur(r,i.lastAnswer.id)?{id:i.lastAnswer.id,...r.answers[i.lastAnswer.id]}:null,zu(r,i),Lo(r),r.phase==="complete"&&!nr(r,e).complete&&(r.phase="explore"),r.phase==="question"&&!Do(r)&&(r.phase="explore",r.activeEncounter=null),r.phase==="feedback"&&!r.lastAnswer&&(r.phase="explore",r.activeEncounter=null),(r.phase==="capture"||r.phase==="review"||r.phase==="review-feedback"||r.hearts===0&&r.phase!=="complete")&&r.phase!=="capture"){Da(r,e);const a=i.review;Array.isArray(a==null?void 0:a.ids)&&a.ids.length===2&&a.ids.every(l=>{var c;return((c=r.answers[l])==null?void 0:c.correct)===!1})&&(r.review.ids=a.ids,r.review.index=a.index===1?1:0,r.review.wrong=Number.isInteger(a.wrong)?Math.max(0,Math.min(2,a.wrong)):0,r.review.hint=r.review.wrong,r.review.correct=a.correct===!0?!0:a.correct===!1?!1:null,i.phase==="review-feedback"&&r.review.correct!==null&&(r.phase="review-feedback"))}return r}catch{return null}}const ks={quizzes:[{id:"facts",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"עובדה או דעה?",description:"מזהים מה אפשר לבדוק ומה מביע מחשבה אישית.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"facts-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"„בפעילות השתתפו שלוש כיתות.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק כמה כיתות השתתפו בפעילות.",en:"The number of participating classes can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"„שיעורים בגינה מעניינים יותר משיעורים בכיתה.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"„מעניינים יותר” הוא שיפוט אישי, ולכן זו דעה.",en:"“More interesting” is a personal judgment, so this is an opinion."},ref:{id:"garden-passage",part:"פסקה 3"}},{id:"facts-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"„התלמידים שתלו נענע, רוזמרין וחסה.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק אילו צמחים נשתלו בגינה.",en:"The plants in the garden can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"„נענע היא הצמח הכי מוצלח בגינה.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"„הכי מוצלח” מביע הערכה אישית ולא נתון מדיד שהוגדר כאן.",en:"“The best” is a personal evaluation, not a defined measurable fact here."},ref:{id:"garden-passage",part:null}},{id:"facts-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"„כל כיתה קיבלה אחריות להשקיה ביום אחר בשבוע.” מה זה?",choices:["עובדה","דעה"],correct:0,explanation:{he:"אפשר לבדוק את לוח ההשקיה של הכיתות.",en:"The class watering schedule can be checked."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"facts-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"„לדעתי, הפעילות בגינה נהדרת.” מה זה?",choices:["עובדה","דעה"],correct:1,explanation:{he:"המילה „לדעתי” מסמנת במפורש שהדובר מביע דעה.",en:"The word “in my opinion” clearly signals an opinion."},ref:{id:"garden-passage",part:null}}]},{id:"questions",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"מילות שאלה",description:"בוחרים את מילת השאלה המתאימה למידע שמחפשים.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"questions-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מועד הקמת הגינה?",choices:["מתי","מי","כמה"],correct:0,explanation:{he:"„מתי” מבקשת זמן או מועד.",en:"“When” asks about a time or date."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מספר הכיתות שהשתתפו?",choices:["כיצד","כמה","היכן"],correct:1,explanation:{he:"„כמה” מבקשת מספר או כמות.",en:"“How many” asks for a number or quantity."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לשאלה על הסיבה לכך שקראו על הצמחים?",choices:["מדוע","מתי","מי"],correct:0,explanation:{he:"„מדוע” מבקשת סיבה: למה עשו זאת?",en:"“Why” asks for the reason something happened."},ref:{id:"garden-passage",part:"פסקה 2"}},{id:"questions-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור המקום שבו הוקמה הגינה?",choices:["כמה","היכן","כיצד"],correct:1,explanation:{he:"„היכן” מבקשת מקום.",en:"“Where” asks about a place."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור האופן שבו חילקו את ההשקיה?",choices:["כיצד","מתי","מי"],correct:0,explanation:{he:"„כיצד” מבקשת דרך או אופן פעולה.",en:"“How” asks about the way something was done."},ref:{id:"garden-passage",part:"פסקה 1"}},{id:"questions-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"איזו מילת שאלה מתאימה לבירור מי הציעה להוסיף פרחים?",choices:["היכן","מי","מדוע"],correct:1,explanation:{he:"„מי” מבקשת לזהות אדם.",en:"“Who” asks which person did something."},ref:{id:"garden-passage",part:"פסקה 3"}}]},{id:"instructions",subject_id:"hebrew",exam_id:"hebrew-v1-garden",title:"מבינים הוראות",description:"מזהים מה בדיוק צריך לעשות לפי מילת ההוראה.",references:[{id:"garden-passage",kind:"passage",title:"הטקסט „תלמידי כיתה ז׳ הקימו גינה בבית הספר”",url:"garden-exam.html#article",attribution:null,parts:[{part:"הכותרת ושורת הפרטים",title:"הכותרת, הכותבת, מקום הפרסום והתאריך"},{part:"פסקה 1",title:"הקמת הגינה, הכיתות וההשקיה"},{part:"פסקה 2",title:"ההכנות לפני השתילה ומטרת הפעילות"},{part:"פסקה 3",title:"דברי התלמידים ומה יקרה בעוד חודש"},{part:"הטקסט כולו",title:"הטקסט כולו"}]}],questions:[{id:"instructions-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „העתיקו מהטקסט עובדה”. מה צריך לעשות?",choices:["לכתוב את המילים בדיוק כפי שהן בטקסט","להמציא עובדה חדשה","לכתוב מה חושבים"],correct:0,explanation:{he:"„העתיקו” פירושו להשתמש בניסוח שמופיע בטקסט.",en:"“Copy” means use the wording from the passage."},ref:{id:"garden-passage",part:null}},{id:"instructions-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „נמקו”. מה צריך להוסיף לתשובה?",choices:["כותרת בלבד","סיבה שמסבירה את הבחירה","תאריך הפרסום בלבד"],correct:1,explanation:{he:"„נמקו” מבקשת לתת סיבה או ראיה לבחירה.",en:"“Justify” asks for a reason or evidence."},ref:{id:"garden-passage",part:null}},{id:"instructions-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „ציינו”. איזו תשובה מתאימה בדרך כלל?",choices:["תשובה קצרה וברורה","סיפור ארוך שלא קשור לשאלה","שאלה חדשה"],correct:0,explanation:{he:"„ציינו” מבקשת למסור את הפרט המבוקש בקצרה.",en:"“State” usually asks for the requested detail briefly."},ref:{id:"garden-passage",part:null}},{id:"instructions-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „הסבירו”. מה צריך לעשות?",choices:["לכתוב מילה אחת בלבד","לתאר בפירוט כיצד או מדוע","להעתיק את הכותרת"],correct:1,explanation:{he:"„הסבירו” מבקשת להבהיר את הרעיון בעזרת פירוט או סיבה.",en:"“Explain” asks for details about how or why."},ref:{id:"garden-passage",part:null}},{id:"instructions-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „נסחו שאלה מלאה”. איזו תשובה מקיימת את ההוראה?",choices:["„שלוש כיתות”","„כמה כיתות השתתפו בפעילות?”","„כיתות”"],correct:1,explanation:{he:"שאלה מלאה כוללת מילת שאלה ומשפט שלם.",en:"A full question includes a question word and a complete sentence."},ref:{id:"garden-passage",part:null}},{id:"instructions-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"בשאלה כתוב „הביעו את דעתכם וכתבו נימוק”. מה צריך לכתוב?",choices:["רק עובדה מהטקסט","עמדה אישית וסיבה שתומכת בה","רק את שם הכותבת"],correct:1,explanation:{he:"צריך לציין מה חושבים ולתת סיבה אחת לפחות.",en:"State your view and give at least one supporting reason."},ref:{id:"garden-passage",part:null}}]},{id:"physics-basics",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מדידה ושיטות מדידה",description:"מזהים תוצאות ומבדילים בין מדידה ישירה לעקיפה.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-basics-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"מה חייבים לציין בתוצאת מדידה?",choices:["מספר ויחידת מידה","מספר בלבד","שם כלי המדידה בלבד"],correct:0,explanation:{he:"תוצאת מדידה כוללת מספר ויחידה, למשל 14 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"מדדתם אורך מחברת וקראתם את התוצאה מהסרגל. איזו מדידה זו?",choices:["ישירה","עקיפה","לא מדידה"],correct:0,explanation:{he:"במדידה ישירה קוראים את הגודל המבוקש מכלי המדידה.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"מדדתם עובי של ערימת דפים וחילקתם במספר הדפים. איזו מדידה זו?",choices:["ישירה","עקיפה","הערכה ללא מדידה"],correct:1,explanation:{he:"מודדים גודל אחר ומחשבים ממנו את העובי הממוצע של דף.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איך מחשבים עובי ממוצע של דף בערימה?",choices:["עובי הערימה חלקי מספר הדפים","מספר הדפים חלקי עובי הערימה","עובי הערימה כפול מספר הדפים"],correct:0,explanation:{he:"מחלקים את עובי הערימה במספר הדפים, לא במספר העמודים.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"ערימה של 100 דפים עובייה 10 מ״מ. מה העובי הממוצע של דף?",choices:["0.1 מ״מ","1 מ״מ","10 מ״מ"],correct:0,explanation:{he:"מחלקים 10 מ״מ ב־100 ומקבלים 0.1 מ״מ לדף.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"למה כדאי למדוד ערימה של דפים מאותו סוג?",choices:["כדי להעריך את העובי הממוצע של דף מהסוג הזה","כי אין צורך לספור את הדפים","כדי לקבל תמיד תוצאה מדויקת לגמרי"],correct:0,explanation:{he:"דפים מאותו סוג מאפשרים אומדן שימושי יותר של עובי דף ממוצע.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"מהי מדידה?",choices:["השוואה ליחידת מידה מוסכמת","ניחוש ללא השוואה","כתיבת שם הגוף"],correct:0,explanation:{he:"מדידה משווה גודל ליחידת מידה מוסכמת.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"מה מתאים לתיאור אורך עיפרון?",choices:["14 ס״מ","14 בלבד","ס״מ בלבד"],correct:0,explanation:{he:"תוצאת מדידה כוללת גם מספר וגם יחידת מידה.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"איזו פעולה היא מדידה עקיפה?",choices:["מדידת ערימת דפים וחלוקה במספר הדפים","קריאת אורך עיפרון מסרגל","קריאת הטמפרטורה ממדחום"],correct:0,explanation:{he:"מודדים את הערימה ומחשבים ממנה את עובי הדף הממוצע.",en:""},ref:{id:"physics-pdf",part:"עמוד 1"}},{id:"physics-basics-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"ערימה של 50 דפים היא בעובי 5 מ״מ. מה עובי דף ממוצע?",choices:["0.1 מ״מ","10 מ״מ","1 מ״מ"],correct:0,explanation:{he:"מחלקים 5 מ״מ ב־50 דפים ומקבלים 0.1 מ״מ לדף.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}},{id:"physics-basics-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"למה מודדים ערימת דפים בלי הכריכה?",choices:["כדי שהכריכה לא תוסיף עובי לתוצאה","כדי לשנות את מספר הדפים","כי הכריכה מחליפה את הסרגל"],correct:0,explanation:{he:"הכריכה אינה דף בערימה ולכן עובייה יטה את החישוב.",en:""},ref:{id:"physics-pdf",part:"עמוד 3"}}]},{id:"physics-units",subject_id:"physics",exam_id:"physics-v1-assessment",title:"המרת יחידות אורך",description:"מתרגלים קילומטרים, מטרים, סנטימטרים ומילימטרים.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-units-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים יש במטר אחד?",choices:["10","100","1,000"],correct:1,explanation:{he:"מטר אחד שווה ל־100 סנטימטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"כמה מילימטרים יש בסנטימטר אחד?",choices:["10","100","1,000"],correct:0,explanation:{he:"סנטימטר אחד שווה ל־10 מילימטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"כמה מטרים יש ב־2 קילומטרים?",choices:["200","2,000","20,000"],correct:1,explanation:{he:"קילומטר אחד הוא 1,000 מטרים, ולכן 2 ק״מ הם 2,000 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים הם 2.4 מטרים?",choices:["24","240","2,400"],correct:1,explanation:{he:"ממטר לסנטימטר כופלים ב־100: 2.4 × 100 = 240.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"כמה מטרים הם 350 סנטימטרים?",choices:["3.5","35","0.35"],correct:0,explanation:{he:"מסנטימטר למטר מחלקים ב־100: 350 ÷ 100 = 3.5.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"כמה הם מטר אחד ועוד 25 ס״מ?",choices:["1.25 מטרים","26 מטרים","1.025 מטרים"],correct:0,explanation:{he:"ממירים 25 ס״מ ל־0.25 מטר ואז מחברים: 1 + 0.25 = 1.25.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"כמה מילימטרים הם 3 ס״מ?",choices:["30 מ״מ","3 מ״מ","300 מ״מ"],correct:0,explanation:{he:"כל סנטימטר הוא 10 מ״מ, ולכן 3 ס״מ הם 30 מ״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"כמה סנטימטרים הם 12 מ״מ?",choices:["1.2 ס״מ","12 ס״מ","120 ס״מ"],correct:0,explanation:{he:"מחלקים את מספר המילימטרים ב־10: התוצאה היא 1.2 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"כמה קילומטרים הם 1,500 מטרים?",choices:["1.5 ק״מ","15 ק״מ","0.15 ק״מ"],correct:0,explanation:{he:"מחלקים ב־1,000: 1,500 מטרים הם 1.5 ק״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"מה ארוך יותר: 90 ס״מ או מטר אחד?",choices:["מטר אחד","90 ס״מ","הם שווים"],correct:0,explanation:{he:"מטר אחד הוא 100 ס״מ, ולכן הוא ארוך מ־90 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}},{id:"physics-units-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"מה קורה לאורך עצמו כשממירים אותו מס״מ למ״מ?",choices:["האורך נשאר זהה","האורך גדל פי 10","האורך קטן פי 10"],correct:0,explanation:{he:"הגוף אינו משתנה; רק המספר והיחידה שבהם מתארים אותו משתנים.",en:""},ref:{id:"physics-pdf",part:"עמוד 2"}}]},{id:"physics-precision",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מודדים נכון",description:"בוחרים כלי מתאים וקוראים את הסרגל בזהירות.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-precision-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"מאיזו נקודה בסרגל מתחילים למדוד אורך?",choices:["מסימון האפס","תמיד מקצה הסרגל","מהמספר 1"],correct:0,explanation:{he:"מצמידים את תחילת הגוף לסימון האפס, שלא תמיד נמצא בקצה הסרגל.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"גוף מתחיל ב־2.0 ס״מ ומסתיים ב־8.2 ס״מ. מה אורכו?",choices:["6.2 ס״מ","8.2 ס״מ","10.2 ס״מ"],correct:0,explanation:{he:"מחסרים את קריאת ההתחלה מקריאת הסיום: 8.2 − 2.0 = 6.2 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"איך מסתכלים על שנתות הסרגל כדי לצמצם טעות קריאה?",choices:["בניצב לסולם","באלכסון ככל האפשר","ממרחק גדול"],correct:0,explanation:{he:"מבט בניצב לסולם מצמצם שגיאת קריאה בגלל זווית ההסתכלות.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזה כלי מתאים יותר למדידת אורך של חדר?",choices:["סרט מדידה","סרגל קצר בלבד","שעון"],correct:0,explanation:{he:"סרט מדידה מתאים יותר לאורכו של חדר.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"מה מאפשרות שנתות קטנות יותר על כלי מדידה?",choices:["קריאה מפורטת יותר","ביטול מוחלט של כל טעות","שינוי האורך של הגוף"],correct:0,explanation:{he:"שנתות קטנות מאפשרות לקרוא את המדידה בפירוט רב יותר.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"מדוע חוזרים על מדידה?",choices:["כדי לזהות חריגות ולהקטין השפעת שגיאות אקראיות","כדי לתקן בהכרח כלי פגום","כדי לשנות את גודל הגוף"],correct:0,explanation:{he:"חזרות מסייעות לזהות חריגות, אך אינן מתקנות כלי פגום או שיטה שגויה.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"גוף מתחיל בסימון 3 ס״מ ומסתיים ב־9 ס״מ. מה אורכו?",choices:["6 ס״מ","9 ס״מ","12 ס״מ"],correct:0,explanation:{he:"מחסרים את קריאת ההתחלה מקריאת הסיום: 9 פחות 3 הם 6 ס״מ.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"למה לא תמיד מתחילים למדוד מקצה הסרגל?",choices:["כי סימון האפס יכול להיות רחוק מהקצה","כי הסרגל תמיד מתחיל ב־1","כי אסור להשתמש בסימון האפס"],correct:0,explanation:{he:"חשוב להתחיל מסימון האפס; קצה הסרגל לא תמיד נמצא בדיוק באפס.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"איזה כלי מתאים למדידת אורך של עיפרון?",choices:["סרגל עם שנתות קטנות","שעון עצר","מדחום"],correct:0,explanation:{he:"סרגל עם שנתות מתאימות מאפשר למדוד את אורך העיפרון.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"מה חזרה על מדידה אינה מתקנת בהכרח?",choices:["שיטה שגויה או כלי פגום","טעות אקראית בודדת","תוצאה חריגה שאפשר לזהות"],correct:0,explanation:{he:"חזרה יכולה לעזור לזהות חריגות, אך אינה מתקנת כלי פגום או שיטה שגויה.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}},{id:"physics-precision-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"מה כדאי לבדוק לפני שרושמים תוצאה?",choices:["את היחידה, נקודת האפס וזווית ההסתכלות","רק את צבע כלי המדידה","רק את שם הגוף"],correct:0,explanation:{he:"יחידה מתאימה, נקודת אפס נכונה ומבט בניצב עוזרים למדוד נכון.",en:""},ref:{id:"physics-pdf",part:"עמוד 4"}}]},{id:"physics-pole",subject_id:"physics",exam_id:"physics-v1-assessment",title:"מודדים גובה של עמוד",description:"מחשבים גובה בעזרת זווית של 45° ומרחק אופקי.",references:[{id:"physics-pdf",kind:"pdf",title:"סיכום נושא מדידות (PDF)",url:"assets/materials/physics-measurements-grade-7.pdf",attribution:"שרית שרת",parts:[{part:"עמוד 1",title:"מדידות: מהי מדידה, מדידה ישירה ומדידה עקיפה"},{part:"עמוד 2",title:"המרת יחידות אורך"},{part:"עמוד 3",title:"איך מודדים עובי של דף?"},{part:"עמוד 4",title:"דיוק ומדידה נכונה"},{part:"עמוד 5",title:"מודדים גובה של עמוד: הרעיון הגאומטרי"},{part:"עמוד 6",title:"מדידת העמוד בפועל"}]}],questions:[{id:"physics-pole-01",position:1,type:"mcq",topic:null,difficulty:null,prompt:"בשיטת העמוד, באיזו זווית לאופק מכוונים אל ראש העמוד?",choices:["45°","90°","180°"],correct:0,explanation:{he:"מכוונים את קו הראייה בזווית של 45° ביחס לאופק.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-02",position:2,type:"mcq",topic:null,difficulty:null,prompt:"מה שווה למרחק האופקי לעמוד בשיטת 45°?",choices:["גובה ראש העמוד מעל גובה העיניים","גובה העמוד כולו","גובה העיניים"],correct:0,explanation:{he:"במשולש ישר־זווית ושווה־שוקיים שני הניצבים שווים.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-03",position:3,type:"mcq",topic:null,difficulty:null,prompt:"המרחק האופקי לעמוד 6 מטרים וגובה העיניים 1.4 מטרים. מה גובה העמוד?",choices:["7.4 מטרים","6 מטרים","4.6 מטרים"],correct:0,explanation:{he:"מחברים את המרחק האופקי לגובה העיניים: 6 + 1.4 = 7.4 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-04",position:4,type:"mcq",topic:null,difficulty:null,prompt:"איזה מרחק מודדים לצורך החישוב?",choices:["המרחק האופקי אל בסיס העמוד","אורך קו הראייה האלכסוני","המרחק מראש העמוד לקרקע באומדן"],correct:0,explanation:{he:"מודדים את המרחק האופקי מהנקודה שמתחת לעין אל בסיס העמוד.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-05",position:5,type:"mcq",topic:null,difficulty:null,prompt:"איזה גובה מוסיפים למרחק האופקי?",choices:["גובה העיניים מעל הקרקע","גובה התלמיד כולו","גובה המשולש שביד"],correct:0,explanation:{he:"מוסיפים את גובה העיניים, כי המשולש מתחיל בגובה העין.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-06",position:6,type:"mcq",topic:null,difficulty:null,prompt:"איזה תנאי נדרש לשיטה המתוארת?",choices:["קרקע אופקית ובסיס העמוד באותו מפלס","העמוד חייב להיות נמוך מהתלמיד","אין צורך לדעת את זווית הראייה"],correct:0,explanation:{he:"הנוסחה מתאימה כאשר הקרקע אופקית ובסיס העמוד באותו מפלס.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-07",position:7,type:"mcq",topic:null,difficulty:null,prompt:"המרחק לעמוד 4 מטרים וגובה העיניים 1.5 מטרים. מה גובה העמוד בשיטת 45°?",choices:["5.5 מטרים","4 מטרים","2.5 מטרים"],correct:0,explanation:{he:"מחברים מרחק אופקי וגובה עיניים: 4 + 1.5 = 5.5 מטרים.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-08",position:8,type:"mcq",topic:null,difficulty:null,prompt:"מה צריך לראות דרך הגליל כשקובעים את נקודת המדידה?",choices:["את ראש העמוד","את בסיס העמוד בלבד","את הקרקע מתחת לעיניים"],correct:0,explanation:{he:"מתקדמים או מתרחקים עד שרואים את ראש העמוד דרך הגליל המכוון ב־45°.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-09",position:9,type:"mcq",topic:null,difficulty:null,prompt:"מהו תפקיד המשולש בעל זווית 45°?",choices:["לעזור לכוון את הגליל בזווית הנכונה לאופק","למדוד ישירות את גובה העמוד","למדוד את עובי העמוד"],correct:0,explanation:{he:"המשולש עוזר לקבע את הגליל בזווית של 45° ביחס לאופק.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}},{id:"physics-pole-10",position:10,type:"mcq",topic:null,difficulty:null,prompt:"אם המרחק האופקי לעמוד 5 מטרים, מה גובה ראש העמוד מעל גובה העיניים בשיטה זו?",choices:["5 מטרים","10 מטרים","2.5 מטרים"],correct:0,explanation:{he:"בזווית של 45° הניצבים במשולש שווים, ולכן הגובה מעל העיניים שווה למרחק האופקי.",en:""},ref:{id:"physics-pdf",part:"עמוד 5"}},{id:"physics-pole-11",position:11,type:"mcq",topic:null,difficulty:null,prompt:"למה זו מדידה עקיפה?",choices:["כי מודדים מרחק וגובה עיניים ומחשבים מהם את גובה העמוד","כי קוראים את גובה העמוד ישירות מסרגל","כי אין צורך למדוד דבר"],correct:0,explanation:{he:"גובה העמוד מתקבל מחישוב המבוסס על מדידות אחרות.",en:""},ref:{id:"physics-pdf",part:"עמוד 6"}}]}]},Rs="facts",Io=ks.quizzes.map(({id:n,title:e,subject_id:t,questions:i})=>({id:n,title:e,subjectId:t,count:i.length})),gc={easy:1,medium:1.5,hard:2},_c=n=>typeof n=="string"&&/^[a-z0-9-]+$/.test(n);function Hu(n){var t;if(typeof n!="string"||!n.trim())throw new Error("Invalid reference URL");const e=new URL(n,`${((t=globalThis.location)==null?void 0:t.origin)||"https://prepx.invalid"}/`);if(!["https:","http:"].includes(e.protocol))throw new Error("Invalid reference URL");return e.href}function La(n,{source:e=(n==null?void 0:n.source)||"snapshot",pinned:t=!1}={}){const i=Io.find(c=>c.id===(n==null?void 0:n.id));if(!i||typeof n.title!="string"||!n.title.trim()||!Array.isArray(n.questions)||(t?n.questions.length<1||n.questions.length>30:n.questions.length!==i.count)||!Array.isArray(n.references))throw new Error("Invalid maze content");const r=n.references.map(c=>{if(!_c(c.id)||typeof c.title!="string")throw new Error("Invalid question reference");return{...c,url:Hu(c.url)}});if(new Set(r.map(c=>c.id)).size!==r.length)throw new Error("Duplicate reference");const s=n.questions.map(c=>{var d,p;const f=r.find(x=>{var y;return x.id===((y=c.ref)==null?void 0:y.id)});if(!_c(c.id)||c.type!=="mcq"||typeof c.prompt!="string"||!c.prompt.trim()||!Array.isArray(c.choices)||c.choices.length<2||c.choices.length>8||c.choices.some(x=>typeof x!="string"||!x.trim())||!Number.isInteger(c.correct)||c.correct<0||c.correct>=c.choices.length||typeof((d=c.explanation)==null?void 0:d.he)!="string"||!c.explanation.he.trim()||!f||!(c.ref.part===null||typeof c.ref.part=="string"))throw new Error("Invalid practice question");if(c.ref.part&&!((p=f.parts)!=null&&p.some(x=>x.part===c.ref.part)))throw new Error("Unknown reference part");const u=Object.hasOwn(gc,c.difficulty)?c.difficulty:"medium";return{id:c.id,type:"mcq",prompt:c.prompt,choices:[...c.choices],correct:c.correct,difficulty:u,weight:gc[u],topic:c.topic||null,explanation:{he:c.explanation.he,en:typeof c.explanation.en=="string"?c.explanation.en:""},ref:{id:c.ref.id,part:c.ref.part},reference:{id:f.id,title:f.title,url:f.url,part:c.ref.part}}});if(new Set(s.map(c=>c.id)).size!==s.length)throw new Error("Duplicate question");const a={id:n.id,title:n.title,description:typeof n.description=="string"?n.description:"",subjectId:n.subject_id||n.subjectId||i.subjectId,questions:s,references:r,source:e==="live"?"live":"snapshot",offline:e!=="live"};let o=2166136261;const l=JSON.stringify(s.map(({id:c,prompt:f,choices:u,correct:d,difficulty:p,explanation:x,ref:y})=>({id:c,prompt:f,choices:u,correct:d,difficulty:p,explanation:x,ref:y})));for(const c of l)o=Math.imul(o^c.charCodeAt(0),16777619);return{...a,version:`maze-v1-${(o>>>0).toString(16)}`}}async function Uo({quizId:n=Rs,fetchImpl:e=globalThis.fetch}={}){const t=ks.quizzes.find(s=>s.id===n);if(!t)throw new Error("Unknown maze quiz");const i=new AbortController;let r;try{const s=new Promise((l,c)=>{r=setTimeout(()=>{i.abort(),c(new Error("Content timeout"))},2500)}),a=await Promise.race([Promise.resolve().then(()=>{var l;return e(new URL(`/api/quizzes/${encodeURIComponent(n)}`,`${((l=globalThis.location)==null?void 0:l.origin)||"https://prepx.invalid"}/`).href,{signal:i.signal,credentials:"omit"})}),s]);if(!a.ok)throw new Error("Content unavailable");const o=await Promise.race([a.json(),s]);if((o==null?void 0:o.id)!==n)throw new Error("Content mismatch");return La(o,{source:"live"})}catch{return La(t,{source:"snapshot"})}finally{clearTimeout(r)}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const No="181",Wu=0,vc=1,Xu=2,kl=1,qu=2,Gn=3,li=0,Qt=1,Hn=2,qn=0,Zi=1,Mc=2,yc=3,bc=4,Yu=5,Mi=100,$u=101,ju=102,Ku=103,Zu=104,Ju=200,Qu=201,ed=202,td=203,Ia=204,Ua=205,nd=206,id=207,rd=208,sd=209,ad=210,od=211,cd=212,ld=213,ud=214,Na=0,Fa=1,Oa=2,ir=3,Ba=4,za=5,ka=6,Va=7,Vl=0,dd=1,fd=2,oi=0,hd=1,pd=2,md=3,Gl=4,xd=5,gd=6,_d=7,Hl=300,rr=301,sr=302,Ga=303,Ha=304,Vs=306,Wa=1e3,Wn=1001,Xa=1002,on=1003,vd=1004,Jr=1005,hn=1006,js=1007,bi=1008,Ln=1009,Wl=1010,Xl=1011,Nr=1012,Fo=1013,Ti=1014,Cn=1015,dr=1016,Oo=1017,Bo=1018,Fr=1020,ql=35902,Yl=35899,$l=1021,jl=1022,_n=1023,Or=1026,Br=1027,zo=1028,ko=1029,Vo=1030,Go=1031,Ho=1033,Ms=33776,ys=33777,bs=33778,Ss=33779,qa=35840,Ya=35841,$a=35842,ja=35843,Ka=36196,Za=37492,Ja=37496,Qa=37808,eo=37809,to=37810,no=37811,io=37812,ro=37813,so=37814,ao=37815,oo=37816,co=37817,lo=37818,uo=37819,fo=37820,ho=37821,po=36492,mo=36494,xo=36495,go=36283,_o=36284,vo=36285,Mo=36286,Md=3200,yd=3201,Kl=0,bd=1,si="",sn="srgb",ar="srgb-linear",Cs="linear",xt="srgb",Li=7680,Sc=519,Sd=512,Ed=513,Td=514,Zl=515,Ad=516,wd=517,Rd=518,Cd=519,Ec=35044,Tc="300 es",Pn=2e3,Ps=2001;function Jl(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ds(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Pd(){const n=Ds("canvas");return n.style.display="block",n}const Ac={};function wc(...n){const e="THREE."+n.shift();console.log(e,...n)}function He(...n){const e="THREE."+n.shift();console.warn(e,...n)}function At(...n){const e="THREE."+n.shift();console.error(e,...n)}function zr(...n){const e=n.join(" ");e in Ac||(Ac[e]=!0,He(...n))}function Dd(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}class fr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Rc=1234567;const Dr=Math.PI/180,or=180/Math.PI;function hr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function Wo(n,e){return(n%e+e)%e}function Ld(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Id(n,e,t){return n!==e?(t-n)/(e-n):0}function Lr(n,e,t){return(1-t)*n+t*e}function Ud(n,e,t,i){return Lr(n,e,1-Math.exp(-t*i))}function Nd(n,e=1){return e-Math.abs(Wo(n,e*2)-e)}function Fd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Od(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Bd(n,e){return n+Math.floor(Math.random()*(e-n+1))}function zd(n,e){return n+Math.random()*(e-n)}function kd(n){return n*(.5-Math.random())}function Vd(n){n!==void 0&&(Rc=n);let e=Rc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gd(n){return n*Dr}function Hd(n){return n*or}function Wd(n){return(n&n-1)===0&&n!==0}function Xd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function qd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Yd(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),f=a((e+i)/2),u=s((e-i)/2),d=a((e-i)/2),p=s((i-e)/2),x=a((i-e)/2);switch(r){case"XYX":n.set(o*f,l*u,l*d,o*c);break;case"YZY":n.set(l*d,o*f,l*u,o*c);break;case"ZXZ":n.set(l*u,l*d,o*f,o*c);break;case"XZX":n.set(o*f,l*x,l*p,o*c);break;case"YXY":n.set(l*p,o*f,l*x,o*c);break;case"ZYZ":n.set(l*x,l*p,o*f,o*c);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function $i(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function qt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Qr={DEG2RAD:Dr,RAD2DEG:or,generateUUID:hr,clamp:et,euclideanModulo:Wo,mapLinear:Ld,inverseLerp:Id,lerp:Lr,damp:Ud,pingpong:Nd,smoothstep:Fd,smootherstep:Od,randInt:Bd,randFloat:zd,randFloatSpread:kd,seededRandom:Vd,degToRad:Gd,radToDeg:Hd,isPowerOfTwo:Wd,ceilPowerOfTwo:Xd,floorPowerOfTwo:qd,setQuaternionFromProperEuler:Yd,normalize:qt,denormalize:$i};class Je{constructor(e=0,t=0){Je.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],u=i[r+3],d=s[a+0],p=s[a+1],x=s[a+2],y=s[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=f,e[t+3]=u;return}if(o>=1){e[t+0]=d,e[t+1]=p,e[t+2]=x,e[t+3]=y;return}if(u!==y||l!==d||c!==p||f!==x){let m=l*d+c*p+f*x+u*y;m<0&&(d=-d,p=-p,x=-x,y=-y,m=-m);let h=1-o;if(m<.9995){const S=Math.acos(m),E=Math.sin(S);h=Math.sin(h*S)/E,o=Math.sin(o*S)/E,l=l*h+d*o,c=c*h+p*o,f=f*h+x*o,u=u*h+y*o}else{l=l*h+d*o,c=c*h+p*o,f=f*h+x*o,u=u*h+y*o;const S=1/Math.sqrt(l*l+c*c+f*f+u*u);l*=S,c*=S,f*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=f,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],u=s[a],d=s[a+1],p=s[a+2],x=s[a+3];return e[t]=o*x+f*u+l*p-c*d,e[t+1]=l*x+f*d+c*u-o*p,e[t+2]=c*x+f*p+o*d-l*u,e[t+3]=f*x-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),u=o(s/2),d=l(i/2),p=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=d*f*u+c*p*x,this._y=c*p*u-d*f*x,this._z=c*f*x+d*p*u,this._w=c*f*u-d*p*x;break;case"YXZ":this._x=d*f*u+c*p*x,this._y=c*p*u-d*f*x,this._z=c*f*x-d*p*u,this._w=c*f*u+d*p*x;break;case"ZXY":this._x=d*f*u-c*p*x,this._y=c*p*u+d*f*x,this._z=c*f*x+d*p*u,this._w=c*f*u-d*p*x;break;case"ZYX":this._x=d*f*u-c*p*x,this._y=c*p*u+d*f*x,this._z=c*f*x-d*p*u,this._w=c*f*u+d*p*x;break;case"YZX":this._x=d*f*u+c*p*x,this._y=c*p*u+d*f*x,this._z=c*f*x-d*p*u,this._w=c*f*u-d*p*x;break;case"XZY":this._x=d*f*u-c*p*x,this._y=c*p*u-d*f*x,this._z=c*f*x+d*p*u,this._w=c*f*u+d*p*x;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],f=t[6],u=t[10],d=i+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(f-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,f=t._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,t=Math.sin(t*c)/f,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*t-s*r),u=2*(s*i-a*t);return this.x=t+l*c+a*u-o*f,this.y=i+l*f+o*c-s*u,this.z=r+l*u+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ks.copy(this).projectOnVector(e),this.sub(Ks)}reflect(e){return this.sub(Ks.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ks=new F,Cc=new Gr;class Ye{constructor(e,t,i,r,s,a,o,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=t,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],u=i[7],d=i[2],p=i[5],x=i[8],y=r[0],m=r[3],h=r[6],S=r[1],E=r[4],A=r[7],R=r[2],T=r[5],P=r[8];return s[0]=a*y+o*S+l*R,s[3]=a*m+o*E+l*T,s[6]=a*h+o*A+l*P,s[1]=c*y+f*S+u*R,s[4]=c*m+f*E+u*T,s[7]=c*h+f*A+u*P,s[2]=d*y+p*S+x*R,s[5]=d*m+p*E+x*T,s[8]=d*h+p*A+x*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return t*a*f-t*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],u=f*a-o*c,d=o*l-f*s,p=c*s-a*l,x=t*u+i*d+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return e[0]=u*y,e[1]=(r*c-f*i)*y,e[2]=(o*i-r*a)*y,e[3]=d*y,e[4]=(f*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=p*y,e[7]=(i*l-c*t)*y,e[8]=(a*t-i*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Zs.makeScale(e,t)),this}rotate(e){return this.premultiply(Zs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zs=new Ye,Pc=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dc=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $d(){const n={enabled:!0,workingColorSpace:ar,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===xt&&(r.r=Yn(r.r),r.g=Yn(r.g),r.b=Yn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(r.r=Ji(r.r),r.g=Ji(r.g),r.b=Ji(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===si?Cs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return zr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return zr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ar]:{primaries:e,whitePoint:i,transfer:Cs,toXYZ:Pc,fromXYZ:Dc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:e,whitePoint:i,transfer:xt,toXYZ:Pc,fromXYZ:Dc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),n}const at=$d();function Yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ji(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ii;class jd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ii===void 0&&(Ii=Ds("canvas")),Ii.width=e.width,Ii.height=e.height;const r=Ii.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ii}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ds("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Yn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Yn(t[i]/255)*255):t[i]=Yn(t[i]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Kd=0;class Xo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=hr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Js(r[a].image)):s.push(Js(r[a]))}else s=Js(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Js(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?jd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}let Zd=0;const Qs=new F;class jt extends fr{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,i=Wn,r=Wn,s=hn,a=bi,o=_n,l=Ln,c=jt.DEFAULT_ANISOTROPY,f=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=hr(),this.name="",this.source=new Xo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Je(0,0),this.repeat=new Je(1,1),this.center=new Je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qs).x}get height(){return this.source.getSize(Qs).y}get depth(){return this.source.getSize(Qs).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wa:e.x=e.x-Math.floor(e.x);break;case Wn:e.x=e.x<0?0:1;break;case Xa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wa:e.y=e.y-Math.floor(e.y);break;case Wn:e.y=e.y<0?0:1;break;case Xa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=Hl;jt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,i=0,r=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],f=l[4],u=l[8],d=l[1],p=l[5],x=l[9],y=l[2],m=l[6],h=l[10];if(Math.abs(f-d)<.01&&Math.abs(u-y)<.01&&Math.abs(x-m)<.01){if(Math.abs(f+d)<.1&&Math.abs(u+y)<.1&&Math.abs(x+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,A=(p+1)/2,R=(h+1)/2,T=(f+d)/4,P=(u+y)/4,C=(x+m)/4;return E>A&&E>R?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=T/i,s=P/i):A>R?A<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),i=T/r,s=C/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=P/s,r=C/s),this.set(i,r,s,t),this}let S=Math.sqrt((m-x)*(m-x)+(u-y)*(u-y)+(d-f)*(d-f));return Math.abs(S)<.001&&(S=1),this.x=(m-x)/S,this.y=(u-y)/S,this.z=(d-f)/S,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jd extends fr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new jt(r);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Xo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends Jd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ql extends jt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qd extends jt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=on,this.minFilter=on,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ci{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pn):pn.fromBufferAttribute(s,a),pn.applyMatrix4(e.matrixWorld),this.expandByPoint(pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),es.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),es.copy(i.boundingBox)),es.applyMatrix4(e.matrixWorld),this.union(es)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pn),pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vr),ts.subVectors(this.max,vr),Ui.subVectors(e.a,vr),Ni.subVectors(e.b,vr),Fi.subVectors(e.c,vr),Zn.subVectors(Ni,Ui),Jn.subVectors(Fi,Ni),pi.subVectors(Ui,Fi);let t=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-pi.z,pi.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,pi.z,0,-pi.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-pi.y,pi.x,0];return!ea(t,Ui,Ni,Fi,ts)||(t=[1,0,0,0,1,0,0,0,1],!ea(t,Ui,Ni,Fi,ts))?!1:(ns.crossVectors(Zn,Jn),t=[ns.x,ns.y,ns.z],ea(t,Ui,Ni,Fi,ts))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Fn=[new F,new F,new F,new F,new F,new F,new F,new F],pn=new F,es=new Ci,Ui=new F,Ni=new F,Fi=new F,Zn=new F,Jn=new F,pi=new F,vr=new F,ts=new F,ns=new F,mi=new F;function ea(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){mi.fromArray(n,s);const o=r.x*Math.abs(mi.x)+r.y*Math.abs(mi.y)+r.z*Math.abs(mi.z),l=e.dot(mi),c=t.dot(mi),f=i.dot(mi);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const ef=new Ci,Mr=new F,ta=new F;class Hr{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):ef.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mr.subVectors(e,this.center);const t=Mr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Mr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ta.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mr.copy(e.center).add(ta)),this.expandByPoint(Mr.copy(e.center).sub(ta))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const On=new F,na=new F,is=new F,Qn=new F,ia=new F,rs=new F,ra=new F;class eu{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){na.copy(e).add(t).multiplyScalar(.5),is.copy(t).sub(e).normalize(),Qn.copy(this.origin).sub(na);const s=e.distanceTo(t)*.5,a=-this.direction.dot(is),o=Qn.dot(this.direction),l=-Qn.dot(is),c=Qn.lengthSq(),f=Math.abs(1-a*a);let u,d,p,x;if(f>0)if(u=a*l-o,d=a*o-l,x=s*f,u>=0)if(d>=-x)if(d<=x){const y=1/f;u*=y,d*=y,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-x?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=x?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(na).addScaledVector(is,d),p}intersectSphere(e,t){On.subVectors(e.center,this.origin);const i=On.dot(this.direction),r=On.dot(On)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),f>=0?(s=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,i,r,s){ia.subVectors(t,e),rs.subVectors(i,e),ra.crossVectors(ia,rs);let a=this.direction.dot(ra),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qn.subVectors(this.origin,e);const l=o*this.direction.dot(rs.crossVectors(Qn,rs));if(l<0)return null;const c=o*this.direction.dot(ia.cross(Qn));if(c<0||l+c>a)return null;const f=-o*Qn.dot(ra);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mt{constructor(e,t,i,r,s,a,o,l,c,f,u,d,p,x,y,m){Mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,f,u,d,p,x,y,m)}set(e,t,i,r,s,a,o,l,c,f,u,d,p,x,y,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=f,h[10]=u,h[14]=d,h[3]=p,h[7]=x,h[11]=y,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Oi.setFromMatrixColumn(e,0).length(),s=1/Oi.setFromMatrixColumn(e,1).length(),a=1/Oi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*f,p=a*u,x=o*f,y=o*u;t[0]=l*f,t[4]=-l*u,t[8]=c,t[1]=p+x*c,t[5]=d-y*c,t[9]=-o*l,t[2]=y-d*c,t[6]=x+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*f,p=l*u,x=c*f,y=c*u;t[0]=d+y*o,t[4]=x*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*f,t[9]=-o,t[2]=p*o-x,t[6]=y+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*f,p=l*u,x=c*f,y=c*u;t[0]=d-y*o,t[4]=-a*u,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*f,t[9]=y-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*f,p=a*u,x=o*f,y=o*u;t[0]=l*f,t[4]=x*c-p,t[8]=d*c+y,t[1]=l*u,t[5]=y*c+d,t[9]=p*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,x=o*l,y=o*c;t[0]=l*f,t[4]=y-d*u,t[8]=x*u+p,t[1]=u,t[5]=a*f,t[9]=-o*f,t[2]=-c*f,t[6]=p*u+x,t[10]=d-y*u}else if(e.order==="XZY"){const d=a*l,p=a*c,x=o*l,y=o*c;t[0]=l*f,t[4]=-u,t[8]=c*f,t[1]=d*u+y,t[5]=a*f,t[9]=p*u-x,t[2]=x*u-p,t[6]=o*f,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tf,e,nf)}lookAt(e,t,i){const r=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ei.crossVectors(i,tn),ei.lengthSq()===0&&(Math.abs(i.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ei.crossVectors(i,tn)),ei.normalize(),ss.crossVectors(tn,ei),r[0]=ei.x,r[4]=ss.x,r[8]=tn.x,r[1]=ei.y,r[5]=ss.y,r[9]=tn.y,r[2]=ei.z,r[6]=ss.z,r[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],u=i[5],d=i[9],p=i[13],x=i[2],y=i[6],m=i[10],h=i[14],S=i[3],E=i[7],A=i[11],R=i[15],T=r[0],P=r[4],C=r[8],g=r[12],_=r[1],b=r[5],O=r[9],G=r[13],q=r[2],Y=r[6],Z=r[10],ne=r[14],X=r[3],ce=r[7],ue=r[11],Ne=r[15];return s[0]=a*T+o*_+l*q+c*X,s[4]=a*P+o*b+l*Y+c*ce,s[8]=a*C+o*O+l*Z+c*ue,s[12]=a*g+o*G+l*ne+c*Ne,s[1]=f*T+u*_+d*q+p*X,s[5]=f*P+u*b+d*Y+p*ce,s[9]=f*C+u*O+d*Z+p*ue,s[13]=f*g+u*G+d*ne+p*Ne,s[2]=x*T+y*_+m*q+h*X,s[6]=x*P+y*b+m*Y+h*ce,s[10]=x*C+y*O+m*Z+h*ue,s[14]=x*g+y*G+m*ne+h*Ne,s[3]=S*T+E*_+A*q+R*X,s[7]=S*P+E*b+A*Y+R*ce,s[11]=S*C+E*O+A*Z+R*ue,s[15]=S*g+E*G+A*ne+R*Ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],u=e[6],d=e[10],p=e[14],x=e[3],y=e[7],m=e[11],h=e[15];return x*(+s*l*u-r*c*u-s*o*d+i*c*d+r*o*p-i*l*p)+y*(+t*l*p-t*c*d+s*a*d-r*a*p+r*c*f-s*l*f)+m*(+t*c*u-t*o*p-s*a*u+i*a*p+s*o*f-i*c*f)+h*(-r*o*f-t*l*u+t*o*d+r*a*u-i*a*d+i*l*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],u=e[9],d=e[10],p=e[11],x=e[12],y=e[13],m=e[14],h=e[15],S=u*m*c-y*d*c+y*l*p-o*m*p-u*l*h+o*d*h,E=x*d*c-f*m*c-x*l*p+a*m*p+f*l*h-a*d*h,A=f*y*c-x*u*c+x*o*p-a*y*p-f*o*h+a*u*h,R=x*u*l-f*y*l-x*o*d+a*y*d+f*o*m-a*u*m,T=t*S+i*E+r*A+s*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/T;return e[0]=S*P,e[1]=(y*d*s-u*m*s-y*r*p+i*m*p+u*r*h-i*d*h)*P,e[2]=(o*m*s-y*l*s+y*r*c-i*m*c-o*r*h+i*l*h)*P,e[3]=(u*l*s-o*d*s-u*r*c+i*d*c+o*r*p-i*l*p)*P,e[4]=E*P,e[5]=(f*m*s-x*d*s+x*r*p-t*m*p-f*r*h+t*d*h)*P,e[6]=(x*l*s-a*m*s-x*r*c+t*m*c+a*r*h-t*l*h)*P,e[7]=(a*d*s-f*l*s+f*r*c-t*d*c-a*r*p+t*l*p)*P,e[8]=A*P,e[9]=(x*u*s-f*y*s-x*i*p+t*y*p+f*i*h-t*u*h)*P,e[10]=(a*y*s-x*o*s+x*i*c-t*y*c-a*i*h+t*o*h)*P,e[11]=(f*o*s-a*u*s-f*i*c+t*u*c+a*i*p-t*o*p)*P,e[12]=R*P,e[13]=(f*y*r-x*u*r+x*i*d-t*y*d-f*i*m+t*u*m)*P,e[14]=(x*o*r-a*y*r-x*i*l+t*y*l+a*i*m-t*o*m)*P,e[15]=(a*u*r-f*o*r+f*i*l-t*u*l-a*i*d+t*o*d)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,f=a+a,u=o+o,d=s*c,p=s*f,x=s*u,y=a*f,m=a*u,h=o*u,S=l*c,E=l*f,A=l*u,R=i.x,T=i.y,P=i.z;return r[0]=(1-(y+h))*R,r[1]=(p+A)*R,r[2]=(x-E)*R,r[3]=0,r[4]=(p-A)*T,r[5]=(1-(d+h))*T,r[6]=(m+S)*T,r[7]=0,r[8]=(x+E)*P,r[9]=(m-S)*P,r[10]=(1-(d+y))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Oi.set(r[0],r[1],r[2]).length();const a=Oi.set(r[4],r[5],r[6]).length(),o=Oi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],mn.copy(this);const c=1/s,f=1/a,u=1/o;return mn.elements[0]*=c,mn.elements[1]*=c,mn.elements[2]*=c,mn.elements[4]*=f,mn.elements[5]*=f,mn.elements[6]*=f,mn.elements[8]*=u,mn.elements[9]*=u,mn.elements[10]*=u,t.setFromRotationMatrix(mn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Pn,l=!1){const c=this.elements,f=2*s/(t-e),u=2*s/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let x,y;if(l)x=s/(a-s),y=a*s/(a-s);else if(o===Pn)x=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Ps)x=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Pn,l=!1){const c=this.elements,f=2/(t-e),u=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let x,y;if(l)x=1/(a-s),y=a/(a-s);else if(o===Pn)x=-2/(a-s),y=-(a+s)/(a-s);else if(o===Ps)x=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Oi=new F,mn=new Mt,tf=new F(0,0,0),nf=new F(1,1,1),ei=new F,ss=new F,tn=new F,Lc=new Mt,Ic=new Gr;class In{constructor(e=0,t=0,i=0,r=In.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],u=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Lc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ic.setFromEuler(this),this.setFromQuaternion(Ic,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}In.DEFAULT_ORDER="XYZ";class qo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rf=0;const Uc=new F,Bi=new Gr,Bn=new Mt,as=new F,yr=new F,sf=new F,af=new Gr,Nc=new F(1,0,0),Fc=new F(0,1,0),Oc=new F(0,0,1),Bc={type:"added"},of={type:"removed"},zi={type:"childadded",child:null},sa={type:"childremoved",child:null};class Lt extends fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new F,t=new In,i=new Gr,r=new F(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Mt},normalMatrix:{value:new Ye}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.premultiply(Bi),this}rotateX(e){return this.rotateOnAxis(Nc,e)}rotateY(e){return this.rotateOnAxis(Fc,e)}rotateZ(e){return this.rotateOnAxis(Oc,e)}translateOnAxis(e,t){return Uc.copy(e).applyQuaternion(this.quaternion),this.position.add(Uc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nc,e)}translateY(e){return this.translateOnAxis(Fc,e)}translateZ(e){return this.translateOnAxis(Oc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?as.copy(e):as.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(yr,as,this.up):Bn.lookAt(as,yr,this.up),this.quaternion.setFromRotationMatrix(Bn),r&&(Bn.extractRotation(r.matrixWorld),Bi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Bi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(At("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bc),zi.child=e,this.dispatchEvent(zi),zi.child=null):At("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(of),sa.child=e,this.dispatchEvent(sa),sa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bc),zi.child=e,this.dispatchEvent(zi),zi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,e,sf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,af,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Lt.DEFAULT_UP=new F(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new F,zn=new F,aa=new F,kn=new F,ki=new F,Vi=new F,zc=new F,oa=new F,ca=new F,la=new F,ua=new gt,da=new gt,fa=new gt;class gn{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),xn.subVectors(e,t),r.cross(xn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){xn.subVectors(r,t),zn.subVectors(i,t),aa.subVectors(e,t);const a=xn.dot(xn),o=xn.dot(zn),l=xn.dot(aa),c=zn.dot(zn),f=zn.dot(aa),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,p=(c*l-o*f)*d,x=(a*f-o*l)*d;return s.set(1-p-x,x,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,kn.x),l.addScaledVector(a,kn.y),l.addScaledVector(o,kn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return ua.setScalar(0),da.setScalar(0),fa.setScalar(0),ua.fromBufferAttribute(e,t),da.fromBufferAttribute(e,i),fa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ua,s.x),a.addScaledVector(da,s.y),a.addScaledVector(fa,s.z),a}static isFrontFacing(e,t,i,r){return xn.subVectors(i,t),zn.subVectors(e,t),xn.cross(zn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),xn.cross(zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return gn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;ki.subVectors(r,i),Vi.subVectors(s,i),oa.subVectors(e,i);const l=ki.dot(oa),c=Vi.dot(oa);if(l<=0&&c<=0)return t.copy(i);ca.subVectors(e,r);const f=ki.dot(ca),u=Vi.dot(ca);if(f>=0&&u<=f)return t.copy(r);const d=l*u-f*c;if(d<=0&&l>=0&&f<=0)return a=l/(l-f),t.copy(i).addScaledVector(ki,a);la.subVectors(e,s);const p=ki.dot(la),x=Vi.dot(la);if(x>=0&&p<=x)return t.copy(s);const y=p*c-l*x;if(y<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(i).addScaledVector(Vi,o);const m=f*x-p*u;if(m<=0&&u-f>=0&&p-x>=0)return zc.subVectors(s,r),o=(u-f)/(u-f+(p-x)),t.copy(r).addScaledVector(zc,o);const h=1/(m+y+d);return a=y*h,o=d*h,t.copy(i).addScaledVector(ki,a).addScaledVector(Vi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},os={h:0,s:0,l:0};function ha(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class tt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=at.workingColorSpace){if(e=Wo(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ha(a,s,e+1/3),this.g=ha(a,s,e),this.b=ha(a,s,e-1/3)}return at.colorSpaceToWorking(this,r),this}setStyle(e,t=sn){function i(s){s!==void 0&&parseFloat(s)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=sn){const i=tu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=sn){return at.workingToColorSpace(kt.copy(this),e),Math.round(et(kt.r*255,0,255))*65536+Math.round(et(kt.g*255,0,255))*256+Math.round(et(kt.b*255,0,255))}getHexString(e=sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(kt.copy(this),t);const i=kt.r,r=kt.g,s=kt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=f<=.5?u/(a+o):u/(2-a-o),a){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=sn){at.workingToColorSpace(kt.copy(this),e);const t=kt.r,i=kt.g,r=kt.b;return e!==sn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(os);const i=Lr(ti.h,os.h,t),r=Lr(ti.s,os.s,t),s=Lr(ti.l,os.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new tt;tt.NAMES=tu;let cf=0;class Wr extends fr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=hr(),this.name="",this.type="Material",this.blending=Zi,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=Ua,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(i.blending=this.blending),this.side!==li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ia&&(i.blendSrc=this.blendSrc),this.blendDst!==Ua&&(i.blendDst=this.blendDst),this.blendEquation!==Mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ir&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class nu extends Wr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Vl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new F,cs=new Je;let lf=0;class Sn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ec,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)cs.fromBufferAttribute(this,t),cs.applyMatrix3(e),this.setXY(t,cs.x,cs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=$i(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$i(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$i(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$i(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),r=qt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),r=qt(r,this.array),s=qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ec&&(e.usage=this.usage),e}}class iu extends Sn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ru extends Sn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class _t extends Sn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let uf=0;const un=new Mt,pa=new Lt,Gi=new F,nn=new Ci,br=new Ci,Nt=new F;class Kt extends fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jl(e)?ru:iu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ye().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,i){return un.makeTranslation(e,t,i),this.applyMatrix4(un),this}scale(e,t,i){return un.makeScale(e,t,i),this.applyMatrix4(un),this}lookAt(e){return pa.lookAt(e),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){At("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&At('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){At("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];br.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(nn.min,br.min),nn.expandByPoint(Nt),Nt.addVectors(nn.max,br.max),nn.expandByPoint(Nt)):(nn.expandByPoint(br.min),nn.expandByPoint(br.max))}nn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Nt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Nt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)Nt.fromBufferAttribute(o,c),l&&(Gi.fromBufferAttribute(e,c),Nt.add(Gi)),r=Math.max(r,i.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&At('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){At("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<i.count;C++)o[C]=new F,l[C]=new F;const c=new F,f=new F,u=new F,d=new Je,p=new Je,x=new Je,y=new F,m=new F;function h(C,g,_){c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,g),u.fromBufferAttribute(i,_),d.fromBufferAttribute(s,C),p.fromBufferAttribute(s,g),x.fromBufferAttribute(s,_),f.sub(c),u.sub(c),p.sub(d),x.sub(d);const b=1/(p.x*x.y-x.x*p.y);isFinite(b)&&(y.copy(f).multiplyScalar(x.y).addScaledVector(u,-p.y).multiplyScalar(b),m.copy(u).multiplyScalar(p.x).addScaledVector(f,-x.x).multiplyScalar(b),o[C].add(y),o[g].add(y),o[_].add(y),l[C].add(m),l[g].add(m),l[_].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let C=0,g=S.length;C<g;++C){const _=S[C],b=_.start,O=_.count;for(let G=b,q=b+O;G<q;G+=3)h(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const E=new F,A=new F,R=new F,T=new F;function P(C){R.fromBufferAttribute(r,C),T.copy(R);const g=o[C];E.copy(g),E.sub(R.multiplyScalar(R.dot(g))).normalize(),A.crossVectors(T,g);const b=A.dot(l[C])<0?-1:1;a.setXYZW(C,E.x,E.y,E.z,b)}for(let C=0,g=S.length;C<g;++C){const _=S[C],b=_.start,O=_.count;for(let G=b,q=b+O;G<q;G+=3)P(e.getX(G+0)),P(e.getX(G+1)),P(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Sn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new F,s=new F,a=new F,o=new F,l=new F,c=new F,f=new F,u=new F;if(e)for(let d=0,p=e.count;d<p;d+=3){const x=e.getX(d+0),y=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),f.subVectors(a,s),u.subVectors(r,s),f.cross(u),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),o.add(f),l.add(f),c.add(f),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),f.subVectors(a,s),u.subVectors(r,s),f.cross(u),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,u=o.normalized,d=new c.constructor(l.length*f);let p=0,x=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*f;for(let h=0;h<f;h++)d[x++]=c[p++]}return new Sn(d,f,u)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,u=c.length;f<u;f++){const d=c[f],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(t))}const s=e.morphAttributes;for(const c in s){const f=[],u=s[c];for(let d=0,p=u.length;d<p;d++)f.push(u[d].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const kc=new Mt,xi=new eu,ls=new Hr,Vc=new F,us=new F,ds=new F,fs=new F,ma=new F,hs=new F,Gc=new F,ps=new F;class En extends Lt{constructor(e=new Kt,t=new nu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){hs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],u=s[l];f!==0&&(ma.fromBufferAttribute(u,e),a?hs.addScaledVector(ma,f):hs.addScaledVector(ma.sub(t),f))}t.add(hs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ls.copy(i.boundingSphere),ls.applyMatrix4(s),xi.copy(e.ray).recast(e.near),!(ls.containsPoint(xi.origin)===!1&&(xi.intersectSphere(ls,Vc)===null||xi.origin.distanceToSquared(Vc)>(e.far-e.near)**2))&&(kc.copy(s).invert(),xi.copy(e.ray).applyMatrix4(kc),!(i.boundingBox!==null&&xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,xi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,y=d.length;x<y;x++){const m=d[x],h=a[m.materialIndex],S=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let A=S,R=E;A<R;A+=3){const T=o.getX(A),P=o.getX(A+1),C=o.getX(A+2);r=ms(this,h,e,i,c,f,u,T,P,C),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=x,h=y;m<h;m+=3){const S=o.getX(m),E=o.getX(m+1),A=o.getX(m+2);r=ms(this,a,e,i,c,f,u,S,E,A),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,y=d.length;x<y;x++){const m=d[x],h=a[m.materialIndex],S=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let A=S,R=E;A<R;A+=3){const T=A,P=A+1,C=A+2;r=ms(this,h,e,i,c,f,u,T,P,C),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=x,h=y;m<h;m+=3){const S=m,E=m+1,A=m+2;r=ms(this,a,e,i,c,f,u,S,E,A),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function df(n,e,t,i,r,s,a,o){let l;if(e.side===Qt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===li,o),l===null)return null;ps.copy(o),ps.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ps);return c<t.near||c>t.far?null:{distance:c,point:ps.clone(),object:n}}function ms(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,us),n.getVertexPosition(l,ds),n.getVertexPosition(c,fs);const f=df(n,e,t,i,us,ds,fs,Gc);if(f){const u=new F;gn.getBarycoord(Gc,us,ds,fs,u),r&&(f.uv=gn.getInterpolatedAttribute(r,o,l,c,u,new Je)),s&&(f.uv1=gn.getInterpolatedAttribute(s,o,l,c,u,new Je)),a&&(f.normal=gn.getInterpolatedAttribute(a,o,l,c,u,new F),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new F,materialIndex:0};gn.getNormal(us,ds,fs,d.normal),f.face=d,f.barycoord=u}return f}class pr extends Kt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],u=[];let d=0,p=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(f,3)),this.setAttribute("uv",new _t(u,2));function x(y,m,h,S,E,A,R,T,P,C,g){const _=A/P,b=R/C,O=A/2,G=R/2,q=T/2,Y=P+1,Z=C+1;let ne=0,X=0;const ce=new F;for(let ue=0;ue<Z;ue++){const Ne=ue*b-G;for(let $e=0;$e<Y;$e++){const ot=$e*_-O;ce[y]=ot*S,ce[m]=Ne*E,ce[h]=q,c.push(ce.x,ce.y,ce.z),ce[y]=0,ce[m]=0,ce[h]=T>0?1:-1,f.push(ce.x,ce.y,ce.z),u.push($e/P),u.push(1-ue/C),ne+=1}}for(let ue=0;ue<C;ue++)for(let Ne=0;Ne<P;Ne++){const $e=d+Ne+Y*ue,ot=d+Ne+Y*(ue+1),ct=d+(Ne+1)+Y*(ue+1),dt=d+(Ne+1)+Y*ue;l.push($e,ot,dt),l.push(ot,ct,dt),X+=6}o.addGroup(p,X,g),p+=X,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Yt(n){const e={};for(let t=0;t<n.length;t++){const i=cr(n[t]);for(const r in i)e[r]=i[r]}return e}function ff(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function su(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const hf={clone:cr,merge:Yt};var pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends Wr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pf,this.fragmentShader=mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=ff(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class au extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ni=new F,Hc=new Je,Wc=new Je;class Jt extends au{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return or*2*Math.atan(Math.tan(Dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,Hc,Wc),t.subVectors(Wc,Hc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Dr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Hi=-90,Wi=1;class xf extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Jt(Hi,Wi,e,t);r.layers=this.layers,this.add(r);const s=new Jt(Hi,Wi,e,t);s.layers=this.layers,this.add(s);const a=new Jt(Hi,Wi,e,t);a.layers=this.layers,this.add(a);const o=new Jt(Hi,Wi,e,t);o.layers=this.layers,this.add(o);const l=new Jt(Hi,Wi,e,t);l.layers=this.layers,this.add(l);const c=new Jt(Hi,Wi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Pn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ps)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(t,f),e.setRenderTarget(u,d,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class ou extends jt{constructor(e=[],t=rr,i,r,s,a,o,l,c,f){super(e,t,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gf extends Ai{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ou(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new pr(5,5,5),s=new $n({name:"CubemapFromEquirect",uniforms:cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:qn});s.uniforms.tEquirect.value=t;const a=new En(r,s),o=t.minFilter;return t.minFilter===bi&&(t.minFilter=hn),new xf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}class st extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _f={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new st,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new st,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new st,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,i),h=this._getHandJoint(c,y);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const f=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=f.position.distanceTo(u.position),p=.02,x=.005;c.inputState.pinching&&d>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_f)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new st;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Ls{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new tt(e),this.near=t,this.far=i}clone(){return new Ls(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xc extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class cu extends jt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=on,f=on,u,d){super(null,a,o,l,c,f,r,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qc extends Sn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xi=new Mt,Yc=new Mt,xs=[],$c=new Ci,vf=new Mt,Sr=new En,Er=new Hr;class ga extends En{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new qc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,vf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ci),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xi),$c.copy(e.boundingBox).applyMatrix4(Xi),this.boundingBox.union($c)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xi),Er.copy(e.boundingSphere).applyMatrix4(Xi),this.boundingSphere.union(Er)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Sr.geometry=this.geometry,Sr.material=this.material,Sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Er.copy(this.boundingSphere),Er.applyMatrix4(i),e.ray.intersectsSphere(Er)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Xi),Yc.multiplyMatrices(i,Xi),Sr.matrixWorld=Yc,Sr.raycast(e,xs);for(let a=0,o=xs.length;a<o;a++){const l=xs[a];l.instanceId=s,l.object=this,t.push(l)}xs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new qc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new cu(new Float32Array(r*this.count),r,this.count,zo,Cn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _a=new F,Mf=new F,yf=new Ye;class ii{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=_a.subVectors(i,t).cross(Mf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(_a),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||yf.getNormalMatrix(e),r=this.coplanarPoint(_a).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new Hr,bf=new Je(.5,.5),gs=new F;class Yo{constructor(e=new ii,t=new ii,i=new ii,r=new ii,s=new ii,a=new ii){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Pn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],u=s[5],d=s[6],p=s[7],x=s[8],y=s[9],m=s[10],h=s[11],S=s[12],E=s[13],A=s[14],R=s[15];if(r[0].setComponents(c-a,p-f,h-x,R-S).normalize(),r[1].setComponents(c+a,p+f,h+x,R+S).normalize(),r[2].setComponents(c+o,p+u,h+y,R+E).normalize(),r[3].setComponents(c-o,p-u,h-y,R-E).normalize(),i)r[4].setComponents(l,d,m,A).normalize(),r[5].setComponents(c-l,p-d,h-m,R-A).normalize();else if(r[4].setComponents(c-l,p-d,h-m,R-A).normalize(),t===Pn)r[5].setComponents(c+l,p+d,h+m,R+A).normalize();else if(t===Ps)r[5].setComponents(l,d,m,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(e){gi.center.set(0,0,0);const t=bf.distanceTo(e.center);return gi.radius=.7071067811865476+t,gi.applyMatrix4(e.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(gs.x=r.normal.x>0?e.max.x:e.min.x,gs.y=r.normal.y>0?e.max.y:e.min.y,gs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(gs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lu extends jt{constructor(e,t,i=Ti,r,s,a,o=on,l=on,c,f=Or,u=1){if(f!==Or&&f!==Br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Xo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class uu extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $o extends Kt{constructor(e=1,t=1,i=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:r,heightSegments:s},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],l=[],c=[],f=t/2,u=Math.PI/2*e,d=t,p=2*u+d,x=i*2+s,y=r+1,m=new F,h=new F;for(let S=0;S<=x;S++){let E=0,A=0,R=0,T=0;if(S<=i){const g=S/i,_=g*Math.PI/2;A=-f-e*Math.cos(_),R=e*Math.sin(_),T=-e*Math.cos(_),E=g*u}else if(S<=i+s){const g=(S-i)/s;A=-f+g*t,R=e,T=0,E=u+g*d}else{const g=(S-i-s)/i,_=g*Math.PI/2;A=f+e*Math.sin(_),R=e*Math.cos(_),T=e*Math.sin(_),E=u+d+g*u}const P=Math.max(0,Math.min(1,E/p));let C=0;S===0?C=.5/r:S===x&&(C=-.5/r);for(let g=0;g<=r;g++){const _=g/r,b=_*Math.PI*2,O=Math.sin(b),G=Math.cos(b);h.x=-R*G,h.y=A,h.z=R*O,o.push(h.x,h.y,h.z),m.set(-R*G,T,R*O),m.normalize(),l.push(m.x,m.y,m.z),c.push(_+C,P)}if(S>0){const g=(S-1)*y;for(let _=0;_<r;_++){const b=g+_,O=g+_+1,G=S*y+_,q=S*y+_+1;a.push(b,O,G),a.push(O,q,G)}}}this.setIndex(a),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(l,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $o(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Is extends Kt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new F,f=new Je;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const p=i+u/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),f.x=(a[d]/e+1)/2,f.y=(a[d+1]/e+1)/2,l.push(f.x,f.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(o,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Dt extends Kt{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const f=[],u=[],d=[],p=[];let x=0;const y=[],m=i/2;let h=0;S(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(f),this.setAttribute("position",new _t(u,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(p,2));function S(){const A=new F,R=new F;let T=0;const P=(t-e)/i;for(let C=0;C<=s;C++){const g=[],_=C/s,b=_*(t-e)+e;for(let O=0;O<=r;O++){const G=O/r,q=G*l+o,Y=Math.sin(q),Z=Math.cos(q);R.x=b*Y,R.y=-_*i+m,R.z=b*Z,u.push(R.x,R.y,R.z),A.set(Y,P,Z).normalize(),d.push(A.x,A.y,A.z),p.push(G,1-_),g.push(x++)}y.push(g)}for(let C=0;C<r;C++)for(let g=0;g<s;g++){const _=y[g][C],b=y[g+1][C],O=y[g+1][C+1],G=y[g][C+1];(e>0||g!==0)&&(f.push(_,b,G),T+=3),(t>0||g!==s-1)&&(f.push(b,O,G),T+=3)}c.addGroup(h,T,0),h+=T}function E(A){const R=x,T=new Je,P=new F;let C=0;const g=A===!0?e:t,_=A===!0?1:-1;for(let O=1;O<=r;O++)u.push(0,m*_,0),d.push(0,_,0),p.push(.5,.5),x++;const b=x;for(let O=0;O<=r;O++){const q=O/r*l+o,Y=Math.cos(q),Z=Math.sin(q);P.x=g*Z,P.y=m*_,P.z=g*Y,u.push(P.x,P.y,P.z),d.push(0,_,0),T.x=Y*.5+.5,T.y=Z*.5*_+.5,p.push(T.x,T.y),x++}for(let O=0;O<r;O++){const G=R+O,q=b+O;A===!0?f.push(q,q+1,G):f.push(q+1,q,G),C+=3}c.addGroup(h,C,A===!0?1:2),h+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dn extends Dt{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new dn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class jo extends Kt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),c(i),f(),this.setAttribute("position",new _t(s,3)),this.setAttribute("normal",new _t(s.slice(),3)),this.setAttribute("uv",new _t(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const E=new F,A=new F,R=new F;for(let T=0;T<t.length;T+=3)p(t[T+0],E),p(t[T+1],A),p(t[T+2],R),l(E,A,R,S)}function l(S,E,A,R){const T=R+1,P=[];for(let C=0;C<=T;C++){P[C]=[];const g=S.clone().lerp(A,C/T),_=E.clone().lerp(A,C/T),b=T-C;for(let O=0;O<=b;O++)O===0&&C===T?P[C][O]=g:P[C][O]=g.clone().lerp(_,O/b)}for(let C=0;C<T;C++)for(let g=0;g<2*(T-C)-1;g++){const _=Math.floor(g/2);g%2===0?(d(P[C][_+1]),d(P[C+1][_]),d(P[C][_])):(d(P[C][_+1]),d(P[C+1][_+1]),d(P[C+1][_]))}}function c(S){const E=new F;for(let A=0;A<s.length;A+=3)E.x=s[A+0],E.y=s[A+1],E.z=s[A+2],E.normalize().multiplyScalar(S),s[A+0]=E.x,s[A+1]=E.y,s[A+2]=E.z}function f(){const S=new F;for(let E=0;E<s.length;E+=3){S.x=s[E+0],S.y=s[E+1],S.z=s[E+2];const A=m(S)/2/Math.PI+.5,R=h(S)/Math.PI+.5;a.push(A,1-R)}x(),u()}function u(){for(let S=0;S<a.length;S+=6){const E=a[S+0],A=a[S+2],R=a[S+4],T=Math.max(E,A,R),P=Math.min(E,A,R);T>.9&&P<.1&&(E<.2&&(a[S+0]+=1),A<.2&&(a[S+2]+=1),R<.2&&(a[S+4]+=1))}}function d(S){s.push(S.x,S.y,S.z)}function p(S,E){const A=S*3;E.x=e[A+0],E.y=e[A+1],E.z=e[A+2]}function x(){const S=new F,E=new F,A=new F,R=new F,T=new Je,P=new Je,C=new Je;for(let g=0,_=0;g<s.length;g+=9,_+=6){S.set(s[g+0],s[g+1],s[g+2]),E.set(s[g+3],s[g+4],s[g+5]),A.set(s[g+6],s[g+7],s[g+8]),T.set(a[_+0],a[_+1]),P.set(a[_+2],a[_+3]),C.set(a[_+4],a[_+5]),R.copy(S).add(E).add(A).divideScalar(3);const b=m(R);y(T,_+0,S,b),y(P,_+2,E,b),y(C,_+4,A,b)}}function y(S,E,A,R){R<0&&S.x===1&&(a[E]=S.x-1),A.x===0&&A.z===0&&(a[E]=R/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function h(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.vertices,e.indices,e.radius,e.details)}}class Ir extends jo{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ir(e.radius,e.detail)}}class Gs extends Kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,u=e/o,d=t/l,p=[],x=[],y=[],m=[];for(let h=0;h<f;h++){const S=h*d-a;for(let E=0;E<c;E++){const A=E*u-s;x.push(A,-S,0),y.push(0,0,1),m.push(E/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let S=0;S<o;S++){const E=S+c*h,A=S+c*(h+1),R=S+1+c*(h+1),T=S+1+c*h;p.push(E,A,T),p.push(A,R,T)}this.setIndex(p),this.setAttribute("position",new _t(x,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ko extends Kt{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],f=[];let u=e;const d=(t-e)/r,p=new F,x=new Je;for(let y=0;y<=r;y++){for(let m=0;m<=i;m++){const h=s+m/i*a;p.x=u*Math.cos(h),p.y=u*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,f.push(x.x,x.y)}u+=d}for(let y=0;y<r;y++){const m=y*(i+1);for(let h=0;h<i;h++){const S=h+m,E=S,A=S+i+1,R=S+i+2,T=S+1;o.push(E,A,T),o.push(A,R,T)}}this.setIndex(o),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(c,3)),this.setAttribute("uv",new _t(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ko(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Zo extends Kt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const f=[],u=new F,d=new F,p=[],x=[],y=[],m=[];for(let h=0;h<=i;h++){const S=[],E=h/i;let A=0;h===0&&a===0?A=.5/t:h===i&&l===Math.PI&&(A=-.5/t);for(let R=0;R<=t;R++){const T=R/t;u.x=-e*Math.cos(r+T*s)*Math.sin(a+E*o),u.y=e*Math.cos(a+E*o),u.z=e*Math.sin(r+T*s)*Math.sin(a+E*o),x.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),m.push(T+A,1-E),S.push(c++)}f.push(S)}for(let h=0;h<i;h++)for(let S=0;S<t;S++){const E=f[h][S+1],A=f[h][S],R=f[h+1][S],T=f[h+1][S+1];(h!==0||a>0)&&p.push(E,A,T),(h!==i-1||l<Math.PI)&&p.push(A,R,T)}this.setIndex(p),this.setAttribute("position",new _t(x,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ri extends Kt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],l=[],c=[],f=new F,u=new F,d=new F;for(let p=0;p<=i;p++)for(let x=0;x<=r;x++){const y=x/r*s,m=p/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(y),u.y=(e+t*Math.cos(m))*Math.sin(y),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),f.x=e*Math.cos(y),f.y=e*Math.sin(y),d.subVectors(u,f).normalize(),l.push(d.x,d.y,d.z),c.push(x/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let x=1;x<=r;x++){const y=(r+1)*p+x-1,m=(r+1)*(p-1)+x-1,h=(r+1)*(p-1)+x,S=(r+1)*p+x;a.push(y,m,S),a.push(m,h,S)}this.setIndex(a),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(l,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Sf extends Wr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kl,this.normalScale=new Je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ef extends Wr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tf extends Wr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Hs extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class jc extends Hs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new tt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const va=new Mt,Kc=new F,Zc=new F;class Jo{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Je(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yo,this._frameExtents=new Je(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Kc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Kc),Zc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zc),t.updateMatrixWorld(),va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Af extends Jo{constructor(){super(new Jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=or*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class wf extends Hs{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Af}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Jc=new Mt,Tr=new F,Ma=new F;class Rf extends Jo{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Je(4,2),this._viewportCount=6,this._viewports=[new gt(2,1,1,1),new gt(0,1,1,1),new gt(3,1,1,1),new gt(1,1,1,1),new gt(3,0,1,1),new gt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Tr.setFromMatrixPosition(e.matrixWorld),i.position.copy(Tr),Ma.copy(i.position),Ma.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ma),i.updateMatrixWorld(),r.makeTranslation(-Tr.x,-Tr.y,-Tr.z),Jc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jc,i.coordinateSystem,i.reversedDepth)}}class Ar extends Hs{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Rf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Qo extends au{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cf extends Jo{constructor(){super(new Qo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ya extends Hs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new Cf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Pf extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Qc=new Mt;class Df{constructor(e,t,i=0,r=1/0){this.ray=new eu(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new qo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):At("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Qc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qc),this}intersectObject(e,t=!0,i=[]){return yo(e,this,i,t),i.sort(el),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)yo(e[r],this,i,t);return i.sort(el),i}}function el(n,e){return n.distance-e.distance}function yo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)yo(s[a],e,t,!0)}}function tl(n,e,t,i){const r=Lf(i);switch(t){case $l:return n*e;case zo:return n*e/r.components*r.byteLength;case ko:return n*e/r.components*r.byteLength;case Vo:return n*e*2/r.components*r.byteLength;case Go:return n*e*2/r.components*r.byteLength;case jl:return n*e*3/r.components*r.byteLength;case _n:return n*e*4/r.components*r.byteLength;case Ho:return n*e*4/r.components*r.byteLength;case Ms:case ys:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case bs:case Ss:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ya:case ja:return Math.max(n,16)*Math.max(e,8)/4;case qa:case $a:return Math.max(n,8)*Math.max(e,8)/2;case Ka:case Za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case eo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case to:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case no:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case io:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ro:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case so:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ao:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case oo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case co:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case lo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case uo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case fo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ho:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case po:case mo:case xo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case go:case _o:return Math.ceil(n/4)*Math.ceil(e/4)*8;case vo:case Mo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lf(n){switch(n){case Ln:case Wl:return{byteLength:1,components:1};case Nr:case Xl:case dr:return{byteLength:2,components:1};case Oo:case Bo:return{byteLength:2,components:4};case Ti:case Fo:case Cn:return{byteLength:4,components:1};case ql:case Yl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:No}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=No);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function du(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function If(n){const e=new WeakMap;function t(o,l){const c=o.array,f=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const f=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,f);else{u.sort((p,x)=>p.start-x.start);let d=0;for(let p=1;p<u.length;p++){const x=u[d],y=u[p];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++d,u[d]=y)}u.length=d+1;for(let p=0,x=u.length;p<x;p++){const y=u[p];n.bufferSubData(c,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Uf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nf=`#ifdef USE_ALPHAHASH
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
#endif`,Ff=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kf=`#ifdef USE_AOMAP
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
#endif`,Vf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gf=`#ifdef USE_BATCHING
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
#endif`,Hf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yf=`#ifdef USE_IRIDESCENCE
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
#endif`,$f=`#ifdef USE_BUMPMAP
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
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,th=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ih=`#define PI 3.141592653589793
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
} // validated`,rh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sh=`vec3 transformedNormal = objectNormal;
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
#endif`,ah=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,oh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ch=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uh="gl_FragColor = linearToOutputTexel( gl_FragColor );",dh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fh=`#ifdef USE_ENVMAP
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
#endif`,hh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ph=`#ifdef USE_ENVMAP
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
#endif`,mh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xh=`#ifdef USE_ENVMAP
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
#endif`,gh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_h=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yh=`#ifdef USE_GRADIENTMAP
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
}`,bh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Eh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Th=`uniform bool receiveShadow;
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
#endif`,Ah=`#ifdef USE_ENVMAP
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
#endif`,wh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ch=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ph=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dh=`PhysicalMaterial material;
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
#endif`,Lh=`uniform sampler2D dfgLUT;
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
}`,Ih=`
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
#endif`,Uh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Nh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Oh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hh=`#if defined( USE_POINTS_UV )
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
#endif`,Wh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$h=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jh=`#ifdef USE_MORPHTARGETS
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
#endif`,Kh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,np=`#ifdef USE_NORMALMAP
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
#endif`,ip=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ap=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,op=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,up=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_p=`float getShadowMask() {
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
}`,vp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mp=`#ifdef USE_SKINNING
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
#endif`,yp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bp=`#ifdef USE_SKINNING
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
#endif`,Sp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ep=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ap=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wp=`#ifdef USE_TRANSMISSION
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
#endif`,Rp=`#ifdef USE_TRANSMISSION
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
#endif`,Cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ip=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Up=`uniform sampler2D t2D;
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
}`,Np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`#include <common>
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
}`,kp=`#if DEPTH_PACKING == 3200
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
}`,Vp=`#define DISTANCE
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
}`,Gp=`#define DISTANCE
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
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xp=`uniform float scale;
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
}`,qp=`uniform vec3 diffuse;
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
}`,Yp=`#include <common>
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
}`,$p=`uniform vec3 diffuse;
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
}`,jp=`#define LAMBERT
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
}`,Kp=`#define LAMBERT
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
}`,Zp=`#define MATCAP
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
}`,Jp=`#define MATCAP
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
}`,Qp=`#define NORMAL
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
}`,e0=`#define NORMAL
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
}`,t0=`#define PHONG
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
}`,n0=`#define PHONG
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
}`,i0=`#define STANDARD
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
}`,r0=`#define STANDARD
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
}`,s0=`#define TOON
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
}`,a0=`#define TOON
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
}`,o0=`uniform float size;
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
}`,c0=`uniform vec3 diffuse;
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
}`,l0=`#include <common>
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
}`,u0=`uniform vec3 color;
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
}`,d0=`uniform float rotation;
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
}`,f0=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:Uf,alphahash_pars_fragment:Nf,alphamap_fragment:Ff,alphamap_pars_fragment:Of,alphatest_fragment:Bf,alphatest_pars_fragment:zf,aomap_fragment:kf,aomap_pars_fragment:Vf,batching_pars_vertex:Gf,batching_vertex:Hf,begin_vertex:Wf,beginnormal_vertex:Xf,bsdfs:qf,iridescence_fragment:Yf,bumpmap_pars_fragment:$f,clipping_planes_fragment:jf,clipping_planes_pars_fragment:Kf,clipping_planes_pars_vertex:Zf,clipping_planes_vertex:Jf,color_fragment:Qf,color_pars_fragment:eh,color_pars_vertex:th,color_vertex:nh,common:ih,cube_uv_reflection_fragment:rh,defaultnormal_vertex:sh,displacementmap_pars_vertex:ah,displacementmap_vertex:oh,emissivemap_fragment:ch,emissivemap_pars_fragment:lh,colorspace_fragment:uh,colorspace_pars_fragment:dh,envmap_fragment:fh,envmap_common_pars_fragment:hh,envmap_pars_fragment:ph,envmap_pars_vertex:mh,envmap_physical_pars_fragment:Ah,envmap_vertex:xh,fog_vertex:gh,fog_pars_vertex:_h,fog_fragment:vh,fog_pars_fragment:Mh,gradientmap_pars_fragment:yh,lightmap_pars_fragment:bh,lights_lambert_fragment:Sh,lights_lambert_pars_fragment:Eh,lights_pars_begin:Th,lights_toon_fragment:wh,lights_toon_pars_fragment:Rh,lights_phong_fragment:Ch,lights_phong_pars_fragment:Ph,lights_physical_fragment:Dh,lights_physical_pars_fragment:Lh,lights_fragment_begin:Ih,lights_fragment_maps:Uh,lights_fragment_end:Nh,logdepthbuf_fragment:Fh,logdepthbuf_pars_fragment:Oh,logdepthbuf_pars_vertex:Bh,logdepthbuf_vertex:zh,map_fragment:kh,map_pars_fragment:Vh,map_particle_fragment:Gh,map_particle_pars_fragment:Hh,metalnessmap_fragment:Wh,metalnessmap_pars_fragment:Xh,morphinstance_vertex:qh,morphcolor_vertex:Yh,morphnormal_vertex:$h,morphtarget_pars_vertex:jh,morphtarget_vertex:Kh,normal_fragment_begin:Zh,normal_fragment_maps:Jh,normal_pars_fragment:Qh,normal_pars_vertex:ep,normal_vertex:tp,normalmap_pars_fragment:np,clearcoat_normal_fragment_begin:ip,clearcoat_normal_fragment_maps:rp,clearcoat_pars_fragment:sp,iridescence_pars_fragment:ap,opaque_fragment:op,packing:cp,premultiplied_alpha_fragment:lp,project_vertex:up,dithering_fragment:dp,dithering_pars_fragment:fp,roughnessmap_fragment:hp,roughnessmap_pars_fragment:pp,shadowmap_pars_fragment:mp,shadowmap_pars_vertex:xp,shadowmap_vertex:gp,shadowmask_pars_fragment:_p,skinbase_vertex:vp,skinning_pars_vertex:Mp,skinning_vertex:yp,skinnormal_vertex:bp,specularmap_fragment:Sp,specularmap_pars_fragment:Ep,tonemapping_fragment:Tp,tonemapping_pars_fragment:Ap,transmission_fragment:wp,transmission_pars_fragment:Rp,uv_pars_fragment:Cp,uv_pars_vertex:Pp,uv_vertex:Dp,worldpos_vertex:Lp,background_vert:Ip,background_frag:Up,backgroundCube_vert:Np,backgroundCube_frag:Fp,cube_vert:Op,cube_frag:Bp,depth_vert:zp,depth_frag:kp,distanceRGBA_vert:Vp,distanceRGBA_frag:Gp,equirect_vert:Hp,equirect_frag:Wp,linedashed_vert:Xp,linedashed_frag:qp,meshbasic_vert:Yp,meshbasic_frag:$p,meshlambert_vert:jp,meshlambert_frag:Kp,meshmatcap_vert:Zp,meshmatcap_frag:Jp,meshnormal_vert:Qp,meshnormal_frag:e0,meshphong_vert:t0,meshphong_frag:n0,meshphysical_vert:i0,meshphysical_frag:r0,meshtoon_vert:s0,meshtoon_frag:a0,points_vert:o0,points_frag:c0,shadow_vert:l0,shadow_frag:u0,sprite_vert:d0,sprite_frag:f0},pe={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new Je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},wn={basic:{uniforms:Yt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Yt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new tt(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Yt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Yt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Yt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new tt(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Yt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Yt([pe.points,pe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Yt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Yt([pe.common,pe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Yt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Yt([pe.sprite,pe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Yt([pe.common,pe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Yt([pe.lights,pe.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};wn.physical={uniforms:Yt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const _s={r:0,b:0,g:0},_i=new In,h0=new Mt;function p0(n,e,t,i,r,s,a){const o=new tt(0);let l=s===!0?0:1,c,f,u=null,d=0,p=null;function x(E){let A=E.isScene===!0?E.background:null;return A&&A.isTexture&&(A=(E.backgroundBlurriness>0?t:e).get(A)),A}function y(E){let A=!1;const R=x(E);R===null?h(o,l):R&&R.isColor&&(h(R,1),A=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(E,A){const R=x(A);R&&(R.isCubeTexture||R.mapping===Vs)?(f===void 0&&(f=new En(new pr(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:cr(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(T,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),_i.copy(A.backgroundRotation),_i.x*=-1,_i.y*=-1,_i.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),f.material.uniforms.envMap.value=R,f.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(h0.makeRotationFromEuler(_i)),f.material.toneMapped=at.getTransfer(R.colorSpace)!==xt,(u!==R||d!==R.version||p!==n.toneMapping)&&(f.material.needsUpdate=!0,u=R,d=R.version,p=n.toneMapping),f.layers.enableAll(),E.unshift(f,f.geometry,f.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new En(new Gs(2,2),new $n({name:"BackgroundMaterial",uniforms:cr(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=at.getTransfer(R.colorSpace)!==xt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=R,d=R.version,p=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function h(E,A){E.getRGB(_s,su(n)),i.buffers.color.setClear(_s.r,_s.g,_s.b,A,a)}function S(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,A=1){o.set(E),l=A,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,h(o,l)},render:y,addToRenderList:m,dispose:S}}function m0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(_,b,O,G,q){let Y=!1;const Z=u(G,O,b);s!==Z&&(s=Z,c(s.object)),Y=p(_,G,O,q),Y&&x(_,G,O,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,A(_,b,O,G),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function f(_){return n.deleteVertexArray(_)}function u(_,b,O){const G=O.wireframe===!0;let q=i[_.id];q===void 0&&(q={},i[_.id]=q);let Y=q[b.id];Y===void 0&&(Y={},q[b.id]=Y);let Z=Y[G];return Z===void 0&&(Z=d(l()),Y[G]=Z),Z}function d(_){const b=[],O=[],G=[];for(let q=0;q<t;q++)b[q]=0,O[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:O,attributeDivisors:G,object:_,attributes:{},index:null}}function p(_,b,O,G){const q=s.attributes,Y=b.attributes;let Z=0;const ne=O.getAttributes();for(const X in ne)if(ne[X].location>=0){const ue=q[X];let Ne=Y[X];if(Ne===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(Ne=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(Ne=_.instanceColor)),ue===void 0||ue.attribute!==Ne||Ne&&ue.data!==Ne.data)return!0;Z++}return s.attributesNum!==Z||s.index!==G}function x(_,b,O,G){const q={},Y=b.attributes;let Z=0;const ne=O.getAttributes();for(const X in ne)if(ne[X].location>=0){let ue=Y[X];ue===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(ue=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(ue=_.instanceColor));const Ne={};Ne.attribute=ue,ue&&ue.data&&(Ne.data=ue.data),q[X]=Ne,Z++}s.attributes=q,s.attributesNum=Z,s.index=G}function y(){const _=s.newAttributes;for(let b=0,O=_.length;b<O;b++)_[b]=0}function m(_){h(_,0)}function h(_,b){const O=s.newAttributes,G=s.enabledAttributes,q=s.attributeDivisors;O[_]=1,G[_]===0&&(n.enableVertexAttribArray(_),G[_]=1),q[_]!==b&&(n.vertexAttribDivisor(_,b),q[_]=b)}function S(){const _=s.newAttributes,b=s.enabledAttributes;for(let O=0,G=b.length;O<G;O++)b[O]!==_[O]&&(n.disableVertexAttribArray(O),b[O]=0)}function E(_,b,O,G,q,Y,Z){Z===!0?n.vertexAttribIPointer(_,b,O,q,Y):n.vertexAttribPointer(_,b,O,G,q,Y)}function A(_,b,O,G){y();const q=G.attributes,Y=O.getAttributes(),Z=b.defaultAttributeValues;for(const ne in Y){const X=Y[ne];if(X.location>=0){let ce=q[ne];if(ce===void 0&&(ne==="instanceMatrix"&&_.instanceMatrix&&(ce=_.instanceMatrix),ne==="instanceColor"&&_.instanceColor&&(ce=_.instanceColor)),ce!==void 0){const ue=ce.normalized,Ne=ce.itemSize,$e=e.get(ce);if($e===void 0)continue;const ot=$e.buffer,ct=$e.type,dt=$e.bytesPerElement,$=ct===n.INT||ct===n.UNSIGNED_INT||ce.gpuType===Fo;if(ce.isInterleavedBufferAttribute){const te=ce.data,ve=te.stride,ze=ce.offset;if(te.isInstancedInterleavedBuffer){for(let Pe=0;Pe<X.locationSize;Pe++)h(X.location+Pe,te.meshPerAttribute);_.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Pe=0;Pe<X.locationSize;Pe++)m(X.location+Pe);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let Pe=0;Pe<X.locationSize;Pe++)E(X.location+Pe,Ne/X.locationSize,ct,ue,ve*dt,(ze+Ne/X.locationSize*Pe)*dt,$)}else{if(ce.isInstancedBufferAttribute){for(let te=0;te<X.locationSize;te++)h(X.location+te,ce.meshPerAttribute);_.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let te=0;te<X.locationSize;te++)m(X.location+te);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let te=0;te<X.locationSize;te++)E(X.location+te,Ne/X.locationSize,ct,ue,Ne*dt,Ne/X.locationSize*te*dt,$)}}else if(Z!==void 0){const ue=Z[ne];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(X.location,ue);break;case 3:n.vertexAttrib3fv(X.location,ue);break;case 4:n.vertexAttrib4fv(X.location,ue);break;default:n.vertexAttrib1fv(X.location,ue)}}}}S()}function R(){C();for(const _ in i){const b=i[_];for(const O in b){const G=b[O];for(const q in G)f(G[q].object),delete G[q];delete b[O]}delete i[_]}}function T(_){if(i[_.id]===void 0)return;const b=i[_.id];for(const O in b){const G=b[O];for(const q in G)f(G[q].object),delete G[q];delete b[O]}delete i[_.id]}function P(_){for(const b in i){const O=i[b];if(O[_.id]===void 0)continue;const G=O[_.id];for(const q in G)f(G[q].object),delete G[q];delete O[_.id]}}function C(){g(),a=!0,s!==r&&(s=r,c(s.object))}function g(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:C,resetDefaultState:g,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:P,initAttributes:y,enableAttribute:m,disableUnusedAttributes:S}}function x0(n,e,t){let i;function r(c){i=c}function s(c,f){n.drawArrays(i,c,f),t.update(f,i,1)}function a(c,f,u){u!==0&&(n.drawArraysInstanced(i,c,f,u),t.update(f,i,u))}function o(c,f,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,u);let p=0;for(let x=0;x<u;x++)p+=f[x];t.update(p,i,1)}function l(c,f,u,d){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<c.length;x++)a(c[x],f[x],d[x]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,d,0,u);let x=0;for(let y=0;y<u;y++)x+=f[y]*d[y];t.update(x,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function g0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==_n&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const C=P===dr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Ln&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Cn&&!C)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=l(c);f!==c&&(He("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),A=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=x>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:A,vertexTextures:R,maxSamples:T}}function _0(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ii,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||i!==0||r;return r=d,i=u.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=f(u,d,0)},this.setState=function(u,d,p){const x=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,h=n.get(u);if(!r||x===null||x.length===0||s&&!m)s?f(null):c();else{const S=s?0:i,E=S*4;let A=h.clippingState||null;l.value=A,A=f(x,d,E,p);for(let R=0;R!==E;++R)A[R]=t[R];h.clippingState=A,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(u,d,p,x){const y=u!==null?u.length:0;let m=null;if(y!==0){if(m=l.value,x!==!0||m===null){const h=p+y*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<h)&&(m=new Float32Array(h));for(let E=0,A=p;E!==y;++E,A+=4)a.copy(u[E]).applyMatrix4(S,o),a.normal.toArray(m,A),m[A+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function v0(n){let e=new WeakMap;function t(a,o){return o===Ga?a.mapping=rr:o===Ha&&(a.mapping=sr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ga||o===Ha)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new gf(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ai=4,nl=[.125,.215,.35,.446,.526,.582],yi=20,M0=256,wr=new Qo,il=new tt;let ba=null,Sa=0,Ea=0,Ta=!1;const y0=new F;class rl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=y0}=s;ba=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ol(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=al(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ba,Sa,Ea),this._renderer.xr.enabled=Ta,e.scissorTest=!1,qi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rr||e.mapping===sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ba=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:dr,format:_n,colorSpace:ar,depthBuffer:!1},r=sl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=b0(s)),this._blurMaterial=E0(s,e,t),this._ggxMaterial=S0(s,e,t)}return r}_compileMaterial(e){const t=new En(new Kt,e);this._renderer.compile(t,wr)}_sceneToCubeUV(e,t,i,r,s){const l=new Jt(90,1,t,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(il),u.toneMapping=oi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new En(new pr,new nu({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let h=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,h=!0):(m.color.copy(il),h=!0);for(let E=0;E<6;E++){const A=E%3;A===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[E],s.y,s.z)):A===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[E]));const R=this._cubeSize;qi(r,A*R,E>2?R:0,R,R),u.setRenderTarget(r),h&&u.render(y,l),u.render(e,l)}u.toneMapping=p,u.autoClear=d,e.background=S}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===rr||e.mapping===sr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ol()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=al());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;qi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,wr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-f*f),d=.05+c*.95,p=u*d,{_lodMax:x}=this,y=this._sizeLods[i],m=3*y*(i>x-ai?i-x+ai:0),h=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=x-t,qi(s,m,h,3*y,2*y),r.setRenderTarget(s),r.render(o,wr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=x-i,qi(e,m,h,3*y,2*y),r.setRenderTarget(e),r.render(o,wr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&At("blur direction must be either latitudinal or longitudinal!");const f=3,u=this._lodMeshes[r];u.material=c;const d=c.uniforms,p=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*yi-1),y=s/x,m=isFinite(s)?1+Math.floor(f*y):yi;m>yi&&He(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${yi}`);const h=[];let S=0;for(let P=0;P<yi;++P){const C=P/y,g=Math.exp(-C*C/2);h.push(g),P===0?S+=g:P<m&&(S+=2*g)}for(let P=0;P<h.length;P++)h[P]=h[P]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=x,d.mipInt.value=E-i;const A=this._sizeLods[r],R=3*A*(r>E-ai?r-E+ai:0),T=4*(this._cubeSize-A);qi(t,R,T,3*A,2*A),l.setRenderTarget(t),l.render(u,wr)}}function b0(n){const e=[],t=[],i=[];let r=n;const s=n-ai+1+nl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-ai?l=nl[a-n+ai-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),f=-c,u=1+c,d=[f,f,u,f,u,u,f,f,u,u,f,u],p=6,x=6,y=3,m=2,h=1,S=new Float32Array(y*x*p),E=new Float32Array(m*x*p),A=new Float32Array(h*x*p);for(let T=0;T<p;T++){const P=T%3*2/3-1,C=T>2?0:-1,g=[P,C,0,P+2/3,C,0,P+2/3,C+1,0,P,C,0,P+2/3,C+1,0,P,C+1,0];S.set(g,y*x*T),E.set(d,m*x*T);const _=[T,T,T,T,T,T];A.set(_,h*x*T)}const R=new Kt;R.setAttribute("position",new Sn(S,y)),R.setAttribute("uv",new Sn(E,m)),R.setAttribute("faceIndex",new Sn(A,h)),i.push(new En(R,null)),r>ai&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function sl(n,e,t){const i=new Ai(n,e,t);return i.texture.mapping=Vs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function S0(n,e,t){return new $n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:M0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ws(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function E0(n,e,t){const i=new Float32Array(yi),r=new F(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ws(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function al(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ws(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function ol(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ws(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ws(){return`

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
	`}function T0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ga||l===Ha,f=l===rr||l===sr;if(c||f){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new rl(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||f&&p&&r(p)?(t===null&&(t=new rl(n)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let l=0;const c=6;for(let f=0;f<c;f++)o[f]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function A0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&zr("WebGLRenderer: "+i+" extension not supported."),r}}}function w0(n,e,t,i){const r={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function c(u){const d=[],p=u.index,x=u.attributes.position;let y=0;if(p!==null){const S=p.array;y=p.version;for(let E=0,A=S.length;E<A;E+=3){const R=S[E+0],T=S[E+1],P=S[E+2];d.push(R,T,T,P,P,R)}}else if(x!==void 0){const S=x.array;y=x.version;for(let E=0,A=S.length/3-1;E<A;E+=3){const R=E+0,T=E+1,P=E+2;d.push(R,T,T,P,P,R)}}else return;const m=new(Jl(d)?ru:iu)(d,1);m.version=y;const h=s.get(u);h&&e.remove(h),s.set(u,m)}function f(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:f}}function R0(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,p){n.drawElements(i,p,s,d*a),t.update(p,i,1)}function c(d,p,x){x!==0&&(n.drawElementsInstanced(i,p,s,d*a,x),t.update(p,i,x))}function f(d,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,d,0,x);let m=0;for(let h=0;h<x;h++)m+=p[h];t.update(m,i,1)}function u(d,p,x,y){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<d.length;h++)c(d[h]/a,p[h],y[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,y,0,x);let h=0;for(let S=0;S<x;S++)h+=p[S]*y[S];t.update(h,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=u}function C0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:At("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function P0(n,e,t){const i=new WeakMap,r=new gt;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=f!==void 0?f.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let _=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",_)};var p=_;d!==void 0&&d.texture.dispose();const x=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let A=0;x===!0&&(A=1),y===!0&&(A=2),m===!0&&(A=3);let R=o.attributes.position.count*A,T=1;R>e.maxTextureSize&&(T=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const P=new Float32Array(R*T*4*u),C=new Ql(P,R,T,u);C.type=Cn,C.needsUpdate=!0;const g=A*4;for(let b=0;b<u;b++){const O=h[b],G=S[b],q=E[b],Y=R*T*4*b;for(let Z=0;Z<O.count;Z++){const ne=Z*g;x===!0&&(r.fromBufferAttribute(O,Z),P[Y+ne+0]=r.x,P[Y+ne+1]=r.y,P[Y+ne+2]=r.z,P[Y+ne+3]=0),y===!0&&(r.fromBufferAttribute(G,Z),P[Y+ne+4]=r.x,P[Y+ne+5]=r.y,P[Y+ne+6]=r.z,P[Y+ne+7]=0),m===!0&&(r.fromBufferAttribute(q,Z),P[Y+ne+8]=r.x,P[Y+ne+9]=r.y,P[Y+ne+10]=r.z,P[Y+ne+11]=q.itemSize===4?r.w:1)}}d={count:u,texture:C,size:new Je(R,T)},i.set(o,d),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let x=0;for(let m=0;m<c.length;m++)x+=c[m];const y=o.morphTargetsRelative?1:1-x;l.getUniforms().setValue(n,"morphTargetBaseInfluence",y),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function D0(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const fu=new jt,cl=new lu(1,1),hu=new Ql,pu=new Qd,mu=new ou,ll=[],ul=[],dl=new Float32Array(16),fl=new Float32Array(9),hl=new Float32Array(4);function mr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=ll[r];if(s===void 0&&(s=new Float32Array(r),ll[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function It(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Xs(n,e){let t=ul[e];t===void 0&&(t=new Int32Array(e),ul[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function L0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function I0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function U0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function N0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function F0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,i))return;hl.set(i),n.uniformMatrix2fv(this.addr,!1,hl),Ut(t,i)}}function O0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,i))return;fl.set(i),n.uniformMatrix3fv(this.addr,!1,fl),Ut(t,i)}}function B0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(It(t,i))return;dl.set(i),n.uniformMatrix4fv(this.addr,!1,dl),Ut(t,i)}}function z0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function k0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function V0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function G0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function H0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function W0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function X0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function q0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function Y0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(cl.compareFunction=Zl,s=cl):s=fu,t.setTexture2D(e||s,r)}function $0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||pu,r)}function j0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||mu,r)}function K0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||hu,r)}function Z0(n){switch(n){case 5126:return L0;case 35664:return I0;case 35665:return U0;case 35666:return N0;case 35674:return F0;case 35675:return O0;case 35676:return B0;case 5124:case 35670:return z0;case 35667:case 35671:return k0;case 35668:case 35672:return V0;case 35669:case 35673:return G0;case 5125:return H0;case 36294:return W0;case 36295:return X0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return $0;case 35680:case 36300:case 36308:case 36293:return j0;case 36289:case 36303:case 36311:case 36292:return K0}}function J0(n,e){n.uniform1fv(this.addr,e)}function Q0(n,e){const t=mr(e,this.size,2);n.uniform2fv(this.addr,t)}function em(n,e){const t=mr(e,this.size,3);n.uniform3fv(this.addr,t)}function tm(n,e){const t=mr(e,this.size,4);n.uniform4fv(this.addr,t)}function nm(n,e){const t=mr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function im(n,e){const t=mr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function rm(n,e){const t=mr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function sm(n,e){n.uniform1iv(this.addr,e)}function am(n,e){n.uniform2iv(this.addr,e)}function om(n,e){n.uniform3iv(this.addr,e)}function cm(n,e){n.uniform4iv(this.addr,e)}function lm(n,e){n.uniform1uiv(this.addr,e)}function um(n,e){n.uniform2uiv(this.addr,e)}function dm(n,e){n.uniform3uiv(this.addr,e)}function fm(n,e){n.uniform4uiv(this.addr,e)}function hm(n,e,t){const i=this.cache,r=e.length,s=Xs(t,r);It(i,s)||(n.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||fu,s[a])}function pm(n,e,t){const i=this.cache,r=e.length,s=Xs(t,r);It(i,s)||(n.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||pu,s[a])}function mm(n,e,t){const i=this.cache,r=e.length,s=Xs(t,r);It(i,s)||(n.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||mu,s[a])}function xm(n,e,t){const i=this.cache,r=e.length,s=Xs(t,r);It(i,s)||(n.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||hu,s[a])}function gm(n){switch(n){case 5126:return J0;case 35664:return Q0;case 35665:return em;case 35666:return tm;case 35674:return nm;case 35675:return im;case 35676:return rm;case 5124:case 35670:return sm;case 35667:case 35671:return am;case 35668:case 35672:return om;case 35669:case 35673:return cm;case 5125:return lm;case 36294:return um;case 36295:return dm;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return hm;case 35679:case 36299:case 36307:return pm;case 35680:case 36300:case 36308:case 36293:return mm;case 36289:case 36303:case 36311:case 36292:return xm}}class _m{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Z0(t.type)}}class vm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gm(t.type)}}class Mm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Aa=/(\w+)(\])?(\[|\.)?/g;function pl(n,e){n.seq.push(e),n.map[e.id]=e}function ym(n,e,t){const i=n.name,r=i.length;for(Aa.lastIndex=0;;){const s=Aa.exec(i),a=Aa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){pl(t,c===void 0?new _m(o,n,e):new vm(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new Mm(o),pl(t,u)),t=u}}}class Es{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);ym(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function ml(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const bm=37297;let Sm=0;function Em(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const xl=new Ye;function Tm(n){at._getMatrix(xl,at.workingColorSpace,n);const e=`mat3( ${xl.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(n)){case Cs:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function gl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Em(n.getShaderSource(e),o)}else return s}function Am(n,e){const t=Tm(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function wm(n,e){let t;switch(e){case hd:t="Linear";break;case pd:t="Reinhard";break;case md:t="Cineon";break;case Gl:t="ACESFilmic";break;case gd:t="AgX";break;case _d:t="Neutral";break;case xd:t="Custom";break;default:He("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vs=new F;function Rm(){at.getLuminanceCoefficients(vs);const n=vs.x.toFixed(4),e=vs.y.toFixed(4),t=vs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rr).join(`
`)}function Pm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Dm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Rr(n){return n!==""}function _l(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function bo(n){return n.replace(Lm,Um)}const Im=new Map;function Um(n,e){let t=Ke[e];if(t===void 0){const i=Im.get(e);if(i!==void 0)t=Ke[i],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return bo(t)}const Nm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ml(n){return n.replace(Nm,Fm)}function Fm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function yl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Om(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===qu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function Bm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case rr:case sr:e="ENVMAP_TYPE_CUBE";break;case Vs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function zm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case sr:e="ENVMAP_MODE_REFRACTION";break}return e}function km(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Vl:e="ENVMAP_BLENDING_MULTIPLY";break;case dd:e="ENVMAP_BLENDING_MIX";break;case fd:e="ENVMAP_BLENDING_ADD";break}return e}function Vm(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Gm(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Om(t),c=Bm(t),f=zm(t),u=km(t),d=Vm(t),p=Cm(t),x=Pm(s),y=r.createProgram();let m,h,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Rr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Rr).join(`
`),h.length>0&&(h+=`
`)):(m=[yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rr).join(`
`),h=[yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?Ke.tonemapping_pars_fragment:"",t.toneMapping!==oi?wm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,Am("linearToOutputTexel",t.outputColorSpace),Rm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Rr).join(`
`)),a=bo(a),a=_l(a,t),a=vl(a,t),o=bo(o),o=_l(o,t),o=vl(o,t),a=Ml(a),o=Ml(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===Tc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Tc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const E=S+m+a,A=S+h+o,R=ml(r,r.VERTEX_SHADER,E),T=ml(r,r.FRAGMENT_SHADER,A);r.attachShader(y,R),r.attachShader(y,T),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function P(b){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(y)||"",G=r.getShaderInfoLog(R)||"",q=r.getShaderInfoLog(T)||"",Y=O.trim(),Z=G.trim(),ne=q.trim();let X=!0,ce=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,R,T);else{const ue=gl(r,R,"vertex"),Ne=gl(r,T,"fragment");At("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+Y+`
`+ue+`
`+Ne)}else Y!==""?He("WebGLProgram: Program Info Log:",Y):(Z===""||ne==="")&&(ce=!1);ce&&(b.diagnostics={runnable:X,programLog:Y,vertexShader:{log:Z,prefix:m},fragmentShader:{log:ne,prefix:h}})}r.deleteShader(R),r.deleteShader(T),C=new Es(r,y),g=Dm(r,y)}let C;this.getUniforms=function(){return C===void 0&&P(this),C};let g;this.getAttributes=function(){return g===void 0&&P(this),g};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(y,bm)),_},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sm++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=T,this}let Hm=0;class Wm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Xm(e),t.set(e,i)),i}}class Xm{constructor(e){this.id=Hm++,this.code=e,this.usedTimes=0}}function qm(n,e,t,i,r,s,a){const o=new qo,l=new Wm,c=new Set,f=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(g){return c.add(g),g===0?"uv":`uv${g}`}function m(g,_,b,O,G){const q=O.fog,Y=G.geometry,Z=g.isMeshStandardMaterial?O.environment:null,ne=(g.isMeshStandardMaterial?t:e).get(g.envMap||Z),X=ne&&ne.mapping===Vs?ne.image.height:null,ce=x[g.type];g.precision!==null&&(p=r.getMaxPrecision(g.precision),p!==g.precision&&He("WebGLProgram.getParameters:",g.precision,"not supported, using",p,"instead."));const ue=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ne=ue!==void 0?ue.length:0;let $e=0;Y.morphAttributes.position!==void 0&&($e=1),Y.morphAttributes.normal!==void 0&&($e=2),Y.morphAttributes.color!==void 0&&($e=3);let ot,ct,dt,$;if(ce){const nt=wn[ce];ot=nt.vertexShader,ct=nt.fragmentShader}else ot=g.vertexShader,ct=g.fragmentShader,l.update(g),dt=l.getVertexShaderID(g),$=l.getFragmentShaderID(g);const te=n.getRenderTarget(),ve=n.state.buffers.depth.getReversed(),ze=G.isInstancedMesh===!0,Pe=G.isBatchedMesh===!0,Ze=!!g.map,Rt=!!g.matcap,Ge=!!ne,rt=!!g.aoMap,D=!!g.lightMap,je=!!g.bumpMap,Xe=!!g.normalMap,ft=!!g.displacementMap,ye=!!g.emissiveMap,bt=!!g.metalnessMap,Le=!!g.roughnessMap,ke=g.anisotropy>0,w=g.clearcoat>0,v=g.dispersion>0,k=g.iridescence>0,K=g.sheen>0,Q=g.transmission>0,H=ke&&!!g.anisotropyMap,Re=w&&!!g.clearcoatMap,de=w&&!!g.clearcoatNormalMap,Ie=w&&!!g.clearcoatRoughnessMap,be=k&&!!g.iridescenceMap,ee=k&&!!g.iridescenceThicknessMap,ae=K&&!!g.sheenColorMap,ge=K&&!!g.sheenRoughnessMap,we=!!g.specularMap,me=!!g.specularColorMap,Be=!!g.specularIntensityMap,L=Q&&!!g.transmissionMap,he=Q&&!!g.thicknessMap,oe=!!g.gradientMap,le=!!g.alphaMap,se=g.alphaTest>0,j=!!g.alphaHash,Me=!!g.extensions;let Fe=oi;g.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Fe=n.toneMapping);const ht={shaderID:ce,shaderType:g.type,shaderName:g.name,vertexShader:ot,fragmentShader:ct,defines:g.defines,customVertexShaderID:dt,customFragmentShaderID:$,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:p,batching:Pe,batchingColor:Pe&&G._colorsTexture!==null,instancing:ze,instancingColor:ze&&G.instanceColor!==null,instancingMorph:ze&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:ar,alphaToCoverage:!!g.alphaToCoverage,map:Ze,matcap:Rt,envMap:Ge,envMapMode:Ge&&ne.mapping,envMapCubeUVHeight:X,aoMap:rt,lightMap:D,bumpMap:je,normalMap:Xe,displacementMap:d&&ft,emissiveMap:ye,normalMapObjectSpace:Xe&&g.normalMapType===bd,normalMapTangentSpace:Xe&&g.normalMapType===Kl,metalnessMap:bt,roughnessMap:Le,anisotropy:ke,anisotropyMap:H,clearcoat:w,clearcoatMap:Re,clearcoatNormalMap:de,clearcoatRoughnessMap:Ie,dispersion:v,iridescence:k,iridescenceMap:be,iridescenceThicknessMap:ee,sheen:K,sheenColorMap:ae,sheenRoughnessMap:ge,specularMap:we,specularColorMap:me,specularIntensityMap:Be,transmission:Q,transmissionMap:L,thicknessMap:he,gradientMap:oe,opaque:g.transparent===!1&&g.blending===Zi&&g.alphaToCoverage===!1,alphaMap:le,alphaTest:se,alphaHash:j,combine:g.combine,mapUv:Ze&&y(g.map.channel),aoMapUv:rt&&y(g.aoMap.channel),lightMapUv:D&&y(g.lightMap.channel),bumpMapUv:je&&y(g.bumpMap.channel),normalMapUv:Xe&&y(g.normalMap.channel),displacementMapUv:ft&&y(g.displacementMap.channel),emissiveMapUv:ye&&y(g.emissiveMap.channel),metalnessMapUv:bt&&y(g.metalnessMap.channel),roughnessMapUv:Le&&y(g.roughnessMap.channel),anisotropyMapUv:H&&y(g.anisotropyMap.channel),clearcoatMapUv:Re&&y(g.clearcoatMap.channel),clearcoatNormalMapUv:de&&y(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&y(g.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&y(g.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&y(g.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&y(g.sheenColorMap.channel),sheenRoughnessMapUv:ge&&y(g.sheenRoughnessMap.channel),specularMapUv:we&&y(g.specularMap.channel),specularColorMapUv:me&&y(g.specularColorMap.channel),specularIntensityMapUv:Be&&y(g.specularIntensityMap.channel),transmissionMapUv:L&&y(g.transmissionMap.channel),thicknessMapUv:he&&y(g.thicknessMap.channel),alphaMapUv:le&&y(g.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Xe||ke),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!Y.attributes.uv&&(Ze||le),fog:!!q,useFog:g.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:g.flatShading===!0&&g.wireframe===!1,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ve,skinning:G.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Ne,morphTextureStride:$e,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&b.length>0,shadowMapType:n.shadowMap.type,toneMapping:Fe,decodeVideoTexture:Ze&&g.map.isVideoTexture===!0&&at.getTransfer(g.map.colorSpace)===xt,decodeVideoTextureEmissive:ye&&g.emissiveMap.isVideoTexture===!0&&at.getTransfer(g.emissiveMap.colorSpace)===xt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Hn,flipSided:g.side===Qt,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Me&&g.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&g.extensions.multiDraw===!0||Pe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return ht.vertexUv1s=c.has(1),ht.vertexUv2s=c.has(2),ht.vertexUv3s=c.has(3),c.clear(),ht}function h(g){const _=[];if(g.shaderID?_.push(g.shaderID):(_.push(g.customVertexShaderID),_.push(g.customFragmentShaderID)),g.defines!==void 0)for(const b in g.defines)_.push(b),_.push(g.defines[b]);return g.isRawShaderMaterial===!1&&(S(_,g),E(_,g),_.push(n.outputColorSpace)),_.push(g.customProgramCacheKey),_.join()}function S(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)}function E(g,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),g.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),g.push(o.mask)}function A(g){const _=x[g.type];let b;if(_){const O=wn[_];b=hf.clone(O.uniforms)}else b=g.uniforms;return b}function R(g,_){let b;for(let O=0,G=f.length;O<G;O++){const q=f[O];if(q.cacheKey===_){b=q,++b.usedTimes;break}}return b===void 0&&(b=new Gm(n,_,g,s),f.push(b)),b}function T(g){if(--g.usedTimes===0){const _=f.indexOf(g);f[_]=f[f.length-1],f.pop(),g.destroy()}}function P(g){l.remove(g)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:A,acquireProgram:R,releaseProgram:T,releaseShaderCache:P,programs:f,dispose:C}}function Ym(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function $m(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function bl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Sl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u,d,p,x,y,m){let h=n[e];return h===void 0?(h={id:u.id,object:u,geometry:d,material:p,groupOrder:x,renderOrder:u.renderOrder,z:y,group:m},n[e]=h):(h.id=u.id,h.object=u,h.geometry=d,h.material=p,h.groupOrder=x,h.renderOrder=u.renderOrder,h.z=y,h.group=m),e++,h}function o(u,d,p,x,y,m){const h=a(u,d,p,x,y,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):t.push(h)}function l(u,d,p,x,y,m){const h=a(u,d,p,x,y,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):t.unshift(h)}function c(u,d){t.length>1&&t.sort(u||$m),i.length>1&&i.sort(d||bl),r.length>1&&r.sort(d||bl)}function f(){for(let u=e,d=n.length;u<d;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:f,sort:c}}function jm(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Sl,n.set(i,[a])):r>=s.length?(a=new Sl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Km(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new tt};break;case"SpotLight":t={position:new F,direction:new F,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function Zm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Je,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Jm=0;function Qm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ex(n){const e=new Km,t=Zm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const r=new F,s=new Mt,a=new Mt;function o(c){let f=0,u=0,d=0;for(let g=0;g<9;g++)i.probe[g].set(0,0,0);let p=0,x=0,y=0,m=0,h=0,S=0,E=0,A=0,R=0,T=0,P=0;c.sort(Qm);for(let g=0,_=c.length;g<_;g++){const b=c[g],O=b.color,G=b.intensity,q=b.distance,Y=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)f+=O.r*G,u+=O.g*G,d+=O.b*G;else if(b.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(b.sh.coefficients[Z],G);P++}else if(b.isDirectionalLight){const Z=e.get(b);if(Z.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const ne=b.shadow,X=t.get(b);X.shadowIntensity=ne.intensity,X.shadowBias=ne.bias,X.shadowNormalBias=ne.normalBias,X.shadowRadius=ne.radius,X.shadowMapSize=ne.mapSize,i.directionalShadow[p]=X,i.directionalShadowMap[p]=Y,i.directionalShadowMatrix[p]=b.shadow.matrix,S++}i.directional[p]=Z,p++}else if(b.isSpotLight){const Z=e.get(b);Z.position.setFromMatrixPosition(b.matrixWorld),Z.color.copy(O).multiplyScalar(G),Z.distance=q,Z.coneCos=Math.cos(b.angle),Z.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),Z.decay=b.decay,i.spot[y]=Z;const ne=b.shadow;if(b.map&&(i.spotLightMap[R]=b.map,R++,ne.updateMatrices(b),b.castShadow&&T++),i.spotLightMatrix[y]=ne.matrix,b.castShadow){const X=t.get(b);X.shadowIntensity=ne.intensity,X.shadowBias=ne.bias,X.shadowNormalBias=ne.normalBias,X.shadowRadius=ne.radius,X.shadowMapSize=ne.mapSize,i.spotShadow[y]=X,i.spotShadowMap[y]=Y,A++}y++}else if(b.isRectAreaLight){const Z=e.get(b);Z.color.copy(O).multiplyScalar(G),Z.halfWidth.set(b.width*.5,0,0),Z.halfHeight.set(0,b.height*.5,0),i.rectArea[m]=Z,m++}else if(b.isPointLight){const Z=e.get(b);if(Z.color.copy(b.color).multiplyScalar(b.intensity),Z.distance=b.distance,Z.decay=b.decay,b.castShadow){const ne=b.shadow,X=t.get(b);X.shadowIntensity=ne.intensity,X.shadowBias=ne.bias,X.shadowNormalBias=ne.normalBias,X.shadowRadius=ne.radius,X.shadowMapSize=ne.mapSize,X.shadowCameraNear=ne.camera.near,X.shadowCameraFar=ne.camera.far,i.pointShadow[x]=X,i.pointShadowMap[x]=Y,i.pointShadowMatrix[x]=b.shadow.matrix,E++}i.point[x]=Z,x++}else if(b.isHemisphereLight){const Z=e.get(b);Z.skyColor.copy(b.color).multiplyScalar(G),Z.groundColor.copy(b.groundColor).multiplyScalar(G),i.hemi[h]=Z,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=u,i.ambient[2]=d;const C=i.hash;(C.directionalLength!==p||C.pointLength!==x||C.spotLength!==y||C.rectAreaLength!==m||C.hemiLength!==h||C.numDirectionalShadows!==S||C.numPointShadows!==E||C.numSpotShadows!==A||C.numSpotMaps!==R||C.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=x,i.hemi.length=h,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=A+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,C.directionalLength=p,C.pointLength=x,C.spotLength=y,C.rectAreaLength=m,C.hemiLength=h,C.numDirectionalShadows=S,C.numPointShadows=E,C.numSpotShadows=A,C.numSpotMaps=R,C.numLightProbes=P,i.version=Jm++)}function l(c,f){let u=0,d=0,p=0,x=0,y=0;const m=f.matrixWorldInverse;for(let h=0,S=c.length;h<S;h++){const E=c[h];if(E.isDirectionalLight){const A=i.directional[u];A.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(m),u++}else if(E.isSpotLight){const A=i.spot[p];A.position.setFromMatrixPosition(E.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const A=i.rectArea[x];A.position.setFromMatrixPosition(E.matrixWorld),A.position.applyMatrix4(m),a.identity(),s.copy(E.matrixWorld),s.premultiply(m),a.extractRotation(s),A.halfWidth.set(E.width*.5,0,0),A.halfHeight.set(0,E.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(E.isPointLight){const A=i.point[d];A.position.setFromMatrixPosition(E.matrixWorld),A.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const A=i.hemi[y];A.direction.setFromMatrixPosition(E.matrixWorld),A.direction.transformDirection(m),y++}}}return{setup:o,setupView:l,state:i}}function El(n){const e=new ex(n),t=[],i=[];function r(f){c.camera=f,t.length=0,i.length=0}function s(f){t.push(f)}function a(f){i.push(f)}function o(){e.setup(t)}function l(f){e.setupView(t,f)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function tx(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new El(n),e.set(r,[o])):s>=a.length?(o=new El(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ix=`uniform sampler2D shadow_pass;
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
}`;function rx(n,e,t){let i=new Yo;const r=new Je,s=new Je,a=new gt,o=new Ef({depthPacking:yd}),l=new Tf,c={},f=t.maxTextureSize,u={[li]:Qt,[Qt]:li,[Hn]:Hn},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Je},radius:{value:4}},vertexShader:nx,fragmentShader:ix}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const x=new Kt;x.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new En(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kl;let h=this.type;this.render=function(T,P,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const g=n.getRenderTarget(),_=n.getActiveCubeFace(),b=n.getActiveMipmapLevel(),O=n.state;O.setBlending(qn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const G=h!==Gn&&this.type===Gn,q=h===Gn&&this.type!==Gn;for(let Y=0,Z=T.length;Y<Z;Y++){const ne=T[Y],X=ne.shadow;if(X===void 0){He("WebGLShadowMap:",ne,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const ce=X.getFrameExtents();if(r.multiply(ce),s.copy(X.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/ce.x),r.x=s.x*ce.x,X.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/ce.y),r.y=s.y*ce.y,X.mapSize.y=s.y)),X.map===null||G===!0||q===!0){const Ne=this.type!==Gn?{minFilter:on,magFilter:on}:{};X.map!==null&&X.map.dispose(),X.map=new Ai(r.x,r.y,Ne),X.map.texture.name=ne.name+".shadowMap",X.camera.updateProjectionMatrix()}n.setRenderTarget(X.map),n.clear();const ue=X.getViewportCount();for(let Ne=0;Ne<ue;Ne++){const $e=X.getViewport(Ne);a.set(s.x*$e.x,s.y*$e.y,s.x*$e.z,s.y*$e.w),O.viewport(a),X.updateMatrices(ne,Ne),i=X.getFrustum(),A(P,C,X.camera,ne,this.type)}X.isPointLightShadow!==!0&&this.type===Gn&&S(X,C),X.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(g,_,b)};function S(T,P){const C=e.update(y);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ai(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(P,null,C,d,y,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(P,null,C,p,y,null)}function E(T,P,C,g){let _=null;const b=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(b!==void 0)_=b;else if(_=C.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=_.uuid,G=P.uuid;let q=c[O];q===void 0&&(q={},c[O]=q);let Y=q[G];Y===void 0&&(Y=_.clone(),q[G]=Y,P.addEventListener("dispose",R)),_=Y}if(_.visible=P.visible,_.wireframe=P.wireframe,g===Gn?_.side=P.shadowSide!==null?P.shadowSide:P.side:_.side=P.shadowSide!==null?P.shadowSide:u[P.side],_.alphaMap=P.alphaMap,_.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,_.map=P.map,_.clipShadows=P.clipShadows,_.clippingPlanes=P.clippingPlanes,_.clipIntersection=P.clipIntersection,_.displacementMap=P.displacementMap,_.displacementScale=P.displacementScale,_.displacementBias=P.displacementBias,_.wireframeLinewidth=P.wireframeLinewidth,_.linewidth=P.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const O=n.properties.get(_);O.light=C}return _}function A(T,P,C,g,_){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&_===Gn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);const G=e.update(T),q=T.material;if(Array.isArray(q)){const Y=G.groups;for(let Z=0,ne=Y.length;Z<ne;Z++){const X=Y[Z],ce=q[X.materialIndex];if(ce&&ce.visible){const ue=E(T,ce,g,_);T.onBeforeShadow(n,T,P,C,G,ue,X),n.renderBufferDirect(C,null,G,ue,T,X),T.onAfterShadow(n,T,P,C,G,ue,X)}}}else if(q.visible){const Y=E(T,q,g,_);T.onBeforeShadow(n,T,P,C,G,Y,null),n.renderBufferDirect(C,null,G,Y,T,null),T.onAfterShadow(n,T,P,C,G,Y,null)}}const O=T.children;for(let G=0,q=O.length;G<q;G++)A(O[G],P,C,g,_)}function R(T){T.target.removeEventListener("dispose",R);for(const C in c){const g=c[C],_=T.target.uuid;_ in g&&(g[_].dispose(),delete g[_])}}}const sx={[Na]:Fa,[Oa]:ka,[Ba]:Va,[ir]:za,[Fa]:Na,[ka]:Oa,[Va]:Ba,[za]:ir};function ax(n,e){function t(){let L=!1;const he=new gt;let oe=null;const le=new gt(0,0,0,0);return{setMask:function(se){oe!==se&&!L&&(n.colorMask(se,se,se,se),oe=se)},setLocked:function(se){L=se},setClear:function(se,j,Me,Fe,ht){ht===!0&&(se*=Fe,j*=Fe,Me*=Fe),he.set(se,j,Me,Fe),le.equals(he)===!1&&(n.clearColor(se,j,Me,Fe),le.copy(he))},reset:function(){L=!1,oe=null,le.set(-1,0,0,0)}}}function i(){let L=!1,he=!1,oe=null,le=null,se=null;return{setReversed:function(j){if(he!==j){const Me=e.get("EXT_clip_control");j?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),he=j;const Fe=se;se=null,this.setClear(Fe)}},getReversed:function(){return he},setTest:function(j){j?te(n.DEPTH_TEST):ve(n.DEPTH_TEST)},setMask:function(j){oe!==j&&!L&&(n.depthMask(j),oe=j)},setFunc:function(j){if(he&&(j=sx[j]),le!==j){switch(j){case Na:n.depthFunc(n.NEVER);break;case Fa:n.depthFunc(n.ALWAYS);break;case Oa:n.depthFunc(n.LESS);break;case ir:n.depthFunc(n.LEQUAL);break;case Ba:n.depthFunc(n.EQUAL);break;case za:n.depthFunc(n.GEQUAL);break;case ka:n.depthFunc(n.GREATER);break;case Va:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}le=j}},setLocked:function(j){L=j},setClear:function(j){se!==j&&(he&&(j=1-j),n.clearDepth(j),se=j)},reset:function(){L=!1,oe=null,le=null,se=null,he=!1}}}function r(){let L=!1,he=null,oe=null,le=null,se=null,j=null,Me=null,Fe=null,ht=null;return{setTest:function(nt){L||(nt?te(n.STENCIL_TEST):ve(n.STENCIL_TEST))},setMask:function(nt){he!==nt&&!L&&(n.stencilMask(nt),he=nt)},setFunc:function(nt,Ft,Zt){(oe!==nt||le!==Ft||se!==Zt)&&(n.stencilFunc(nt,Ft,Zt),oe=nt,le=Ft,se=Zt)},setOp:function(nt,Ft,Zt){(j!==nt||Me!==Ft||Fe!==Zt)&&(n.stencilOp(nt,Ft,Zt),j=nt,Me=Ft,Fe=Zt)},setLocked:function(nt){L=nt},setClear:function(nt){ht!==nt&&(n.clearStencil(nt),ht=nt)},reset:function(){L=!1,he=null,oe=null,le=null,se=null,j=null,Me=null,Fe=null,ht=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},u={},d=new WeakMap,p=[],x=null,y=!1,m=null,h=null,S=null,E=null,A=null,R=null,T=null,P=new tt(0,0,0),C=0,g=!1,_=null,b=null,O=null,G=null,q=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,ne=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(X)[1]),Z=ne>=1):X.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Z=ne>=2);let ce=null,ue={};const Ne=n.getParameter(n.SCISSOR_BOX),$e=n.getParameter(n.VIEWPORT),ot=new gt().fromArray(Ne),ct=new gt().fromArray($e);function dt(L,he,oe,le){const se=new Uint8Array(4),j=n.createTexture();n.bindTexture(L,j),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Me=0;Me<oe;Me++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(he,0,n.RGBA,1,1,le,0,n.RGBA,n.UNSIGNED_BYTE,se):n.texImage2D(he+Me,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,se);return j}const $={};$[n.TEXTURE_2D]=dt(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=dt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=dt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=dt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(n.DEPTH_TEST),a.setFunc(ir),je(!1),Xe(vc),te(n.CULL_FACE),rt(qn);function te(L){f[L]!==!0&&(n.enable(L),f[L]=!0)}function ve(L){f[L]!==!1&&(n.disable(L),f[L]=!1)}function ze(L,he){return u[L]!==he?(n.bindFramebuffer(L,he),u[L]=he,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=he),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=he),!0):!1}function Pe(L,he){let oe=p,le=!1;if(L){oe=d.get(he),oe===void 0&&(oe=[],d.set(he,oe));const se=L.textures;if(oe.length!==se.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let j=0,Me=se.length;j<Me;j++)oe[j]=n.COLOR_ATTACHMENT0+j;oe.length=se.length,le=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,le=!0);le&&n.drawBuffers(oe)}function Ze(L){return x!==L?(n.useProgram(L),x=L,!0):!1}const Rt={[Mi]:n.FUNC_ADD,[$u]:n.FUNC_SUBTRACT,[ju]:n.FUNC_REVERSE_SUBTRACT};Rt[Ku]=n.MIN,Rt[Zu]=n.MAX;const Ge={[Ju]:n.ZERO,[Qu]:n.ONE,[ed]:n.SRC_COLOR,[Ia]:n.SRC_ALPHA,[ad]:n.SRC_ALPHA_SATURATE,[rd]:n.DST_COLOR,[nd]:n.DST_ALPHA,[td]:n.ONE_MINUS_SRC_COLOR,[Ua]:n.ONE_MINUS_SRC_ALPHA,[sd]:n.ONE_MINUS_DST_COLOR,[id]:n.ONE_MINUS_DST_ALPHA,[od]:n.CONSTANT_COLOR,[cd]:n.ONE_MINUS_CONSTANT_COLOR,[ld]:n.CONSTANT_ALPHA,[ud]:n.ONE_MINUS_CONSTANT_ALPHA};function rt(L,he,oe,le,se,j,Me,Fe,ht,nt){if(L===qn){y===!0&&(ve(n.BLEND),y=!1);return}if(y===!1&&(te(n.BLEND),y=!0),L!==Yu){if(L!==m||nt!==g){if((h!==Mi||A!==Mi)&&(n.blendEquation(n.FUNC_ADD),h=Mi,A=Mi),nt)switch(L){case Zi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mc:n.blendFunc(n.ONE,n.ONE);break;case yc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:At("WebGLState: Invalid blending: ",L);break}else switch(L){case Zi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case yc:At("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bc:At("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:At("WebGLState: Invalid blending: ",L);break}S=null,E=null,R=null,T=null,P.set(0,0,0),C=0,m=L,g=nt}return}se=se||he,j=j||oe,Me=Me||le,(he!==h||se!==A)&&(n.blendEquationSeparate(Rt[he],Rt[se]),h=he,A=se),(oe!==S||le!==E||j!==R||Me!==T)&&(n.blendFuncSeparate(Ge[oe],Ge[le],Ge[j],Ge[Me]),S=oe,E=le,R=j,T=Me),(Fe.equals(P)===!1||ht!==C)&&(n.blendColor(Fe.r,Fe.g,Fe.b,ht),P.copy(Fe),C=ht),m=L,g=!1}function D(L,he){L.side===Hn?ve(n.CULL_FACE):te(n.CULL_FACE);let oe=L.side===Qt;he&&(oe=!oe),je(oe),L.blending===Zi&&L.transparent===!1?rt(qn):rt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const le=L.stencilWrite;o.setTest(le),le&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ye(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):ve(n.SAMPLE_ALPHA_TO_COVERAGE)}function je(L){_!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),_=L)}function Xe(L){L!==Wu?(te(n.CULL_FACE),L!==b&&(L===vc?n.cullFace(n.BACK):L===Xu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ve(n.CULL_FACE),b=L}function ft(L){L!==O&&(Z&&n.lineWidth(L),O=L)}function ye(L,he,oe){L?(te(n.POLYGON_OFFSET_FILL),(G!==he||q!==oe)&&(n.polygonOffset(he,oe),G=he,q=oe)):ve(n.POLYGON_OFFSET_FILL)}function bt(L){L?te(n.SCISSOR_TEST):ve(n.SCISSOR_TEST)}function Le(L){L===void 0&&(L=n.TEXTURE0+Y-1),ce!==L&&(n.activeTexture(L),ce=L)}function ke(L,he,oe){oe===void 0&&(ce===null?oe=n.TEXTURE0+Y-1:oe=ce);let le=ue[oe];le===void 0&&(le={type:void 0,texture:void 0},ue[oe]=le),(le.type!==L||le.texture!==he)&&(ce!==oe&&(n.activeTexture(oe),ce=oe),n.bindTexture(L,he||$[L]),le.type=L,le.texture=he)}function w(){const L=ue[ce];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function k(){try{n.compressedTexImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function K(){try{n.texSubImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function Q(){try{n.texSubImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function Re(){try{n.compressedTexSubImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function de(){try{n.texStorage2D(...arguments)}catch(L){L("WebGLState:",L)}}function Ie(){try{n.texStorage3D(...arguments)}catch(L){L("WebGLState:",L)}}function be(){try{n.texImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function ee(){try{n.texImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function ae(L){ot.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ot.copy(L))}function ge(L){ct.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),ct.copy(L))}function we(L,he){let oe=c.get(he);oe===void 0&&(oe=new WeakMap,c.set(he,oe));let le=oe.get(L);le===void 0&&(le=n.getUniformBlockIndex(he,L.name),oe.set(L,le))}function me(L,he){const le=c.get(he).get(L);l.get(he)!==le&&(n.uniformBlockBinding(he,le,L.__bindingPointIndex),l.set(he,le))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},ce=null,ue={},u={},d=new WeakMap,p=[],x=null,y=!1,m=null,h=null,S=null,E=null,A=null,R=null,T=null,P=new tt(0,0,0),C=0,g=!1,_=null,b=null,O=null,G=null,q=null,ot.set(0,0,n.canvas.width,n.canvas.height),ct.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:ve,bindFramebuffer:ze,drawBuffers:Pe,useProgram:Ze,setBlending:rt,setMaterial:D,setFlipSided:je,setCullFace:Xe,setLineWidth:ft,setPolygonOffset:ye,setScissorTest:bt,activeTexture:Le,bindTexture:ke,unbindTexture:w,compressedTexImage2D:v,compressedTexImage3D:k,texImage2D:be,texImage3D:ee,updateUBOMapping:we,uniformBlockBinding:me,texStorage2D:de,texStorage3D:Ie,texSubImage2D:K,texSubImage3D:Q,compressedTexSubImage2D:H,compressedTexSubImage3D:Re,scissor:ae,viewport:ge,reset:Be}}function ox(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Je,f=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,v){return p?new OffscreenCanvas(w,v):Ds("canvas")}function y(w,v,k){let K=1;const Q=ke(w);if((Q.width>k||Q.height>k)&&(K=k/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const H=Math.floor(K*Q.width),Re=Math.floor(K*Q.height);u===void 0&&(u=x(H,Re));const de=v?x(H,Re):u;return de.width=H,de.height=Re,de.getContext("2d").drawImage(w,0,0,H,Re),He("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+H+"x"+Re+")."),de}else return"data"in w&&He("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function h(w){n.generateMipmap(w)}function S(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(w,v,k,K,Q=!1){if(w!==null){if(n[w]!==void 0)return n[w];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let H=v;if(v===n.RED&&(k===n.FLOAT&&(H=n.R32F),k===n.HALF_FLOAT&&(H=n.R16F),k===n.UNSIGNED_BYTE&&(H=n.R8)),v===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(H=n.R8UI),k===n.UNSIGNED_SHORT&&(H=n.R16UI),k===n.UNSIGNED_INT&&(H=n.R32UI),k===n.BYTE&&(H=n.R8I),k===n.SHORT&&(H=n.R16I),k===n.INT&&(H=n.R32I)),v===n.RG&&(k===n.FLOAT&&(H=n.RG32F),k===n.HALF_FLOAT&&(H=n.RG16F),k===n.UNSIGNED_BYTE&&(H=n.RG8)),v===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(H=n.RG8UI),k===n.UNSIGNED_SHORT&&(H=n.RG16UI),k===n.UNSIGNED_INT&&(H=n.RG32UI),k===n.BYTE&&(H=n.RG8I),k===n.SHORT&&(H=n.RG16I),k===n.INT&&(H=n.RG32I)),v===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(H=n.RGB8UI),k===n.UNSIGNED_SHORT&&(H=n.RGB16UI),k===n.UNSIGNED_INT&&(H=n.RGB32UI),k===n.BYTE&&(H=n.RGB8I),k===n.SHORT&&(H=n.RGB16I),k===n.INT&&(H=n.RGB32I)),v===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),k===n.UNSIGNED_INT&&(H=n.RGBA32UI),k===n.BYTE&&(H=n.RGBA8I),k===n.SHORT&&(H=n.RGBA16I),k===n.INT&&(H=n.RGBA32I)),v===n.RGB&&(k===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(H=n.R11F_G11F_B10F)),v===n.RGBA){const Re=Q?Cs:at.getTransfer(K);k===n.FLOAT&&(H=n.RGBA32F),k===n.HALF_FLOAT&&(H=n.RGBA16F),k===n.UNSIGNED_BYTE&&(H=Re===xt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function A(w,v){let k;return w?v===null||v===Ti||v===Fr?k=n.DEPTH24_STENCIL8:v===Cn?k=n.DEPTH32F_STENCIL8:v===Nr&&(k=n.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ti||v===Fr?k=n.DEPTH_COMPONENT24:v===Cn?k=n.DEPTH_COMPONENT32F:v===Nr&&(k=n.DEPTH_COMPONENT16),k}function R(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==on&&w.minFilter!==hn?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function T(w){const v=w.target;v.removeEventListener("dispose",T),C(v),v.isVideoTexture&&f.delete(v)}function P(w){const v=w.target;v.removeEventListener("dispose",P),_(v)}function C(w){const v=i.get(w);if(v.__webglInit===void 0)return;const k=w.source,K=d.get(k);if(K){const Q=K[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&g(w),Object.keys(K).length===0&&d.delete(k)}i.remove(w)}function g(w){const v=i.get(w);n.deleteTexture(v.__webglTexture);const k=w.source,K=d.get(k);delete K[v.__cacheKey],a.memory.textures--}function _(w){const v=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let Q=0;Q<v.__webglFramebuffer[K].length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[K][Q]);else n.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)n.deleteFramebuffer(v.__webglFramebuffer[K]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const k=w.textures;for(let K=0,Q=k.length;K<Q;K++){const H=i.get(k[K]);H.__webglTexture&&(n.deleteTexture(H.__webglTexture),a.memory.textures--),i.remove(k[K])}i.remove(w)}let b=0;function O(){b=0}function G(){const w=b;return w>=r.maxTextures&&He("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),b+=1,w}function q(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function Y(w,v){const k=i.get(w);if(w.isVideoTexture&&bt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){const K=w.image;if(K===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,w,v);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+v)}function Z(w,v){const k=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){$(k,w,v);return}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+v)}function ne(w,v){const k=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){$(k,w,v);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+v)}function X(w,v){const k=i.get(w);if(w.version>0&&k.__version!==w.version){te(k,w,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+v)}const ce={[Wa]:n.REPEAT,[Wn]:n.CLAMP_TO_EDGE,[Xa]:n.MIRRORED_REPEAT},ue={[on]:n.NEAREST,[vd]:n.NEAREST_MIPMAP_NEAREST,[Jr]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[js]:n.LINEAR_MIPMAP_NEAREST,[bi]:n.LINEAR_MIPMAP_LINEAR},Ne={[Sd]:n.NEVER,[Cd]:n.ALWAYS,[Ed]:n.LESS,[Zl]:n.LEQUAL,[Td]:n.EQUAL,[Rd]:n.GEQUAL,[Ad]:n.GREATER,[wd]:n.NOTEQUAL};function $e(w,v){if(v.type===Cn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===hn||v.magFilter===js||v.magFilter===Jr||v.magFilter===bi||v.minFilter===hn||v.minFilter===js||v.minFilter===Jr||v.minFilter===bi)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,ce[v.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,ce[v.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,ce[v.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,ue[v.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,ue[v.minFilter]),v.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,Ne[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===on||v.minFilter!==Jr&&v.minFilter!==bi||v.type===Cn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ot(w,v){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",T));const K=v.source;let Q=d.get(K);Q===void 0&&(Q={},d.set(K,Q));const H=q(v);if(H!==w.__cacheKey){Q[H]===void 0&&(Q[H]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Q[H].usedTimes++;const Re=Q[w.__cacheKey];Re!==void 0&&(Q[w.__cacheKey].usedTimes--,Re.usedTimes===0&&g(v)),w.__cacheKey=H,w.__webglTexture=Q[H].texture}return k}function ct(w,v,k){return Math.floor(Math.floor(w/k)/v)}function dt(w,v,k,K){const H=w.updateRanges;if(H.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,k,K,v.data);else{H.sort((ee,ae)=>ee.start-ae.start);let Re=0;for(let ee=1;ee<H.length;ee++){const ae=H[Re],ge=H[ee],we=ae.start+ae.count,me=ct(ge.start,v.width,4),Be=ct(ae.start,v.width,4);ge.start<=we+1&&me===Be&&ct(ge.start+ge.count-1,v.width,4)===me?ae.count=Math.max(ae.count,ge.start+ge.count-ae.start):(++Re,H[Re]=ge)}H.length=Re+1;const de=n.getParameter(n.UNPACK_ROW_LENGTH),Ie=n.getParameter(n.UNPACK_SKIP_PIXELS),be=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ee=0,ae=H.length;ee<ae;ee++){const ge=H[ee],we=Math.floor(ge.start/4),me=Math.ceil(ge.count/4),Be=we%v.width,L=Math.floor(we/v.width),he=me,oe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),n.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,Be,L,he,oe,k,K,v.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,de),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ie),n.pixelStorei(n.UNPACK_SKIP_ROWS,be)}}function $(w,v,k){let K=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=n.TEXTURE_3D);const Q=ot(w,v),H=v.source;t.bindTexture(K,w.__webglTexture,n.TEXTURE0+k);const Re=i.get(H);if(H.version!==Re.__version||Q===!0){t.activeTexture(n.TEXTURE0+k);const de=at.getPrimaries(at.workingColorSpace),Ie=v.colorSpace===si?null:at.getPrimaries(v.colorSpace),be=v.colorSpace===si||de===Ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let ee=y(v.image,!1,r.maxTextureSize);ee=Le(v,ee);const ae=s.convert(v.format,v.colorSpace),ge=s.convert(v.type);let we=E(v.internalFormat,ae,ge,v.colorSpace,v.isVideoTexture);$e(K,v);let me;const Be=v.mipmaps,L=v.isVideoTexture!==!0,he=Re.__version===void 0||Q===!0,oe=H.dataReady,le=R(v,ee);if(v.isDepthTexture)we=A(v.format===Br,v.type),he&&(L?t.texStorage2D(n.TEXTURE_2D,1,we,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,we,ee.width,ee.height,0,ae,ge,null));else if(v.isDataTexture)if(Be.length>0){L&&he&&t.texStorage2D(n.TEXTURE_2D,le,we,Be[0].width,Be[0].height);for(let se=0,j=Be.length;se<j;se++)me=Be[se],L?oe&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,me.width,me.height,ae,ge,me.data):t.texImage2D(n.TEXTURE_2D,se,we,me.width,me.height,0,ae,ge,me.data);v.generateMipmaps=!1}else L?(he&&t.texStorage2D(n.TEXTURE_2D,le,we,ee.width,ee.height),oe&&dt(v,ee,ae,ge)):t.texImage2D(n.TEXTURE_2D,0,we,ee.width,ee.height,0,ae,ge,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){L&&he&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,we,Be[0].width,Be[0].height,ee.depth);for(let se=0,j=Be.length;se<j;se++)if(me=Be[se],v.format!==_n)if(ae!==null)if(L){if(oe)if(v.layerUpdates.size>0){const Me=tl(me.width,me.height,v.format,v.type);for(const Fe of v.layerUpdates){const ht=me.data.subarray(Fe*Me/me.data.BYTES_PER_ELEMENT,(Fe+1)*Me/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,Fe,me.width,me.height,1,ae,ht)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,me.width,me.height,ee.depth,ae,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,we,me.width,me.height,ee.depth,0,me.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?oe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,me.width,me.height,ee.depth,ae,ge,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,we,me.width,me.height,ee.depth,0,ae,ge,me.data)}else{L&&he&&t.texStorage2D(n.TEXTURE_2D,le,we,Be[0].width,Be[0].height);for(let se=0,j=Be.length;se<j;se++)me=Be[se],v.format!==_n?ae!==null?L?oe&&t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,me.width,me.height,ae,me.data):t.compressedTexImage2D(n.TEXTURE_2D,se,we,me.width,me.height,0,me.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?oe&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,me.width,me.height,ae,ge,me.data):t.texImage2D(n.TEXTURE_2D,se,we,me.width,me.height,0,ae,ge,me.data)}else if(v.isDataArrayTexture)if(L){if(he&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,we,ee.width,ee.height,ee.depth),oe)if(v.layerUpdates.size>0){const se=tl(ee.width,ee.height,v.format,v.type);for(const j of v.layerUpdates){const Me=ee.data.subarray(j*se/ee.data.BYTES_PER_ELEMENT,(j+1)*se/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,ee.width,ee.height,1,ae,ge,Me)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ae,ge,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,we,ee.width,ee.height,ee.depth,0,ae,ge,ee.data);else if(v.isData3DTexture)L?(he&&t.texStorage3D(n.TEXTURE_3D,le,we,ee.width,ee.height,ee.depth),oe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ae,ge,ee.data)):t.texImage3D(n.TEXTURE_3D,0,we,ee.width,ee.height,ee.depth,0,ae,ge,ee.data);else if(v.isFramebufferTexture){if(he)if(L)t.texStorage2D(n.TEXTURE_2D,le,we,ee.width,ee.height);else{let se=ee.width,j=ee.height;for(let Me=0;Me<le;Me++)t.texImage2D(n.TEXTURE_2D,Me,we,se,j,0,ae,ge,null),se>>=1,j>>=1}}else if(Be.length>0){if(L&&he){const se=ke(Be[0]);t.texStorage2D(n.TEXTURE_2D,le,we,se.width,se.height)}for(let se=0,j=Be.length;se<j;se++)me=Be[se],L?oe&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,ae,ge,me):t.texImage2D(n.TEXTURE_2D,se,we,ae,ge,me);v.generateMipmaps=!1}else if(L){if(he){const se=ke(ee);t.texStorage2D(n.TEXTURE_2D,le,we,se.width,se.height)}oe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,ge,ee)}else t.texImage2D(n.TEXTURE_2D,0,we,ae,ge,ee);m(v)&&h(K),Re.__version=H.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function te(w,v,k){if(v.image.length!==6)return;const K=ot(w,v),Q=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+k);const H=i.get(Q);if(Q.version!==H.__version||K===!0){t.activeTexture(n.TEXTURE0+k);const Re=at.getPrimaries(at.workingColorSpace),de=v.colorSpace===si?null:at.getPrimaries(v.colorSpace),Ie=v.colorSpace===si||Re===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const be=v.isCompressedTexture||v.image[0].isCompressedTexture,ee=v.image[0]&&v.image[0].isDataTexture,ae=[];for(let j=0;j<6;j++)!be&&!ee?ae[j]=y(v.image[j],!0,r.maxCubemapSize):ae[j]=ee?v.image[j].image:v.image[j],ae[j]=Le(v,ae[j]);const ge=ae[0],we=s.convert(v.format,v.colorSpace),me=s.convert(v.type),Be=E(v.internalFormat,we,me,v.colorSpace),L=v.isVideoTexture!==!0,he=H.__version===void 0||K===!0,oe=Q.dataReady;let le=R(v,ge);$e(n.TEXTURE_CUBE_MAP,v);let se;if(be){L&&he&&t.texStorage2D(n.TEXTURE_CUBE_MAP,le,Be,ge.width,ge.height);for(let j=0;j<6;j++){se=ae[j].mipmaps;for(let Me=0;Me<se.length;Me++){const Fe=se[Me];v.format!==_n?we!==null?L?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,Fe.width,Fe.height,we,Fe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Be,Fe.width,Fe.height,0,Fe.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,Fe.width,Fe.height,we,me,Fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Be,Fe.width,Fe.height,0,we,me,Fe.data)}}}else{if(se=v.mipmaps,L&&he){se.length>0&&le++;const j=ke(ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,le,Be,j.width,j.height)}for(let j=0;j<6;j++)if(ee){L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ae[j].width,ae[j].height,we,me,ae[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Be,ae[j].width,ae[j].height,0,we,me,ae[j].data);for(let Me=0;Me<se.length;Me++){const ht=se[Me].image[j].image;L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,ht.width,ht.height,we,me,ht.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Be,ht.width,ht.height,0,we,me,ht.data)}}else{L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,we,me,ae[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Be,we,me,ae[j]);for(let Me=0;Me<se.length;Me++){const Fe=se[Me];L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,we,me,Fe.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Be,we,me,Fe.image[j])}}}m(v)&&h(n.TEXTURE_CUBE_MAP),H.__version=Q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function ve(w,v,k,K,Q,H){const Re=s.convert(k.format,k.colorSpace),de=s.convert(k.type),Ie=E(k.internalFormat,Re,de,k.colorSpace),be=i.get(v),ee=i.get(k);if(ee.__renderTarget=v,!be.__hasExternalTextures){const ae=Math.max(1,v.width>>H),ge=Math.max(1,v.height>>H);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,H,Ie,ae,ge,v.depth,0,Re,de,null):t.texImage2D(Q,H,Ie,ae,ge,0,Re,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),ye(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Q,ee.__webglTexture,0,ft(v)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,Q,ee.__webglTexture,H),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ze(w,v,k){if(n.bindRenderbuffer(n.RENDERBUFFER,w),v.depthBuffer){const K=v.depthTexture,Q=K&&K.isDepthTexture?K.type:null,H=A(v.stencilBuffer,Q),Re=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=ft(v);ye(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,H,v.width,v.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,de,H,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,H,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Re,n.RENDERBUFFER,w)}else{const K=v.textures;for(let Q=0;Q<K.length;Q++){const H=K[Q],Re=s.convert(H.format,H.colorSpace),de=s.convert(H.type),Ie=E(H.internalFormat,Re,de,H.colorSpace),be=ft(v);k&&ye(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,be,Ie,v.width,v.height):ye(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be,Ie,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Ie,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Pe(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Y(v.depthTexture,0);const Q=K.__webglTexture,H=ft(v);if(v.depthTexture.format===Or)ye(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(v.depthTexture.format===Br)ye(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ze(w){const v=i.get(w),k=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const K=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=K}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const K=w.texture.mipmaps;K&&K.length>0?Pe(v.__webglFramebuffer[0],w):Pe(v.__webglFramebuffer,w)}else if(k){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=n.createRenderbuffer(),ze(v.__webglDepthbuffer[K],w,!1);else{const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,H)}}else{const K=w.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ze(v.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,H)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Rt(w,v,k){const K=i.get(w);v!==void 0&&ve(K.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&Ze(w)}function Ge(w){const v=w.texture,k=i.get(w),K=i.get(v);w.addEventListener("dispose",P);const Q=w.textures,H=w.isWebGLCubeRenderTarget===!0,Re=Q.length>1;if(Re||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=v.version,a.memory.textures++),H){k.__webglFramebuffer=[];for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[de]=[];for(let Ie=0;Ie<v.mipmaps.length;Ie++)k.__webglFramebuffer[de][Ie]=n.createFramebuffer()}else k.__webglFramebuffer[de]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let de=0;de<v.mipmaps.length;de++)k.__webglFramebuffer[de]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(Re)for(let de=0,Ie=Q.length;de<Ie;de++){const be=i.get(Q[de]);be.__webglTexture===void 0&&(be.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&ye(w)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let de=0;de<Q.length;de++){const Ie=Q[de];k.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[de]);const be=s.convert(Ie.format,Ie.colorSpace),ee=s.convert(Ie.type),ae=E(Ie.internalFormat,be,ee,Ie.colorSpace,w.isXRRenderTarget===!0),ge=ft(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,ge,ae,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,k.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),ze(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(H){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),$e(n.TEXTURE_CUBE_MAP,v);for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ie=0;Ie<v.mipmaps.length;Ie++)ve(k.__webglFramebuffer[de][Ie],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ie);else ve(k.__webglFramebuffer[de],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(v)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let de=0,Ie=Q.length;de<Ie;de++){const be=Q[de],ee=i.get(be);let ae=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ae=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,ee.__webglTexture),$e(ae,be),ve(k.__webglFramebuffer,w,be,n.COLOR_ATTACHMENT0+de,ae,0),m(be)&&h(ae)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(de=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,K.__webglTexture),$e(de,v),v.mipmaps&&v.mipmaps.length>0)for(let Ie=0;Ie<v.mipmaps.length;Ie++)ve(k.__webglFramebuffer[Ie],w,v,n.COLOR_ATTACHMENT0,de,Ie);else ve(k.__webglFramebuffer,w,v,n.COLOR_ATTACHMENT0,de,0);m(v)&&h(de),t.unbindTexture()}w.depthBuffer&&Ze(w)}function rt(w){const v=w.textures;for(let k=0,K=v.length;k<K;k++){const Q=v[k];if(m(Q)){const H=S(w),Re=i.get(Q).__webglTexture;t.bindTexture(H,Re),h(H),t.unbindTexture()}}}const D=[],je=[];function Xe(w){if(w.samples>0){if(ye(w)===!1){const v=w.textures,k=w.width,K=w.height;let Q=n.COLOR_BUFFER_BIT;const H=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Re=i.get(w),de=v.length>1;if(de)for(let be=0;be<v.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);const Ie=w.texture.mipmaps;Ie&&Ie.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let be=0;be<v.length;be++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const ee=i.get(v[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ee,0)}n.blitFramebuffer(0,0,k,K,0,0,k,K,Q,n.NEAREST),l===!0&&(D.length=0,je.length=0,D.push(n.COLOR_ATTACHMENT0+be),w.depthBuffer&&w.resolveDepthBuffer===!1&&(D.push(H),je.push(H),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,je)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,D))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let be=0;be<v.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const ee=i.get(v[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,ee,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const v=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function ft(w){return Math.min(r.maxSamples,w.samples)}function ye(w){const v=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function bt(w){const v=a.render.frame;f.get(w)!==v&&(f.set(w,v),w.update())}function Le(w,v){const k=w.colorSpace,K=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==ar&&k!==si&&(at.getTransfer(k)===xt?(K!==_n||Q!==Ln)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):At("WebGLTextures: Unsupported texture color space:",k)),v}function ke(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=Z,this.setTexture3D=ne,this.setTextureCube=X,this.rebindTextures=Rt,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=Ze,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=ye}function cx(n,e){function t(i,r=si){let s;const a=at.getTransfer(r);if(i===Ln)return n.UNSIGNED_BYTE;if(i===Oo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Bo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ql)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Yl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Wl)return n.BYTE;if(i===Xl)return n.SHORT;if(i===Nr)return n.UNSIGNED_SHORT;if(i===Fo)return n.INT;if(i===Ti)return n.UNSIGNED_INT;if(i===Cn)return n.FLOAT;if(i===dr)return n.HALF_FLOAT;if(i===$l)return n.ALPHA;if(i===jl)return n.RGB;if(i===_n)return n.RGBA;if(i===Or)return n.DEPTH_COMPONENT;if(i===Br)return n.DEPTH_STENCIL;if(i===zo)return n.RED;if(i===ko)return n.RED_INTEGER;if(i===Vo)return n.RG;if(i===Go)return n.RG_INTEGER;if(i===Ho)return n.RGBA_INTEGER;if(i===Ms||i===ys||i===bs||i===Ss)if(a===xt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ms)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ms)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ys)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ss)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===qa||i===Ya||i===$a||i===ja)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===qa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ya)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$a)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ja)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ka||i===Za||i===Ja)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ka||i===Za)return a===xt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ja)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qa||i===eo||i===to||i===no||i===io||i===ro||i===so||i===ao||i===oo||i===co||i===lo||i===uo||i===fo||i===ho)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Qa)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===eo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===to)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===no)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===io)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ro)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===so)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ao)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===oo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===co)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===lo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===uo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===fo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ho)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===po||i===mo||i===xo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===po)return a===xt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===mo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===go||i===_o||i===vo||i===Mo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===go)return s.COMPRESSED_RED_RGTC1_EXT;if(i===_o)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===vo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Mo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const lx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ux=`
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

}`;class dx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new uu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new $n({vertexShader:lx,fragmentShader:ux,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new En(new Gs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fx extends fr{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,u=null,d=null,p=null,x=null;const y=typeof XRWebGLBinding<"u",m=new dx,h={},S=t.getContextAttributes();let E=null,A=null;const R=[],T=[],P=new Je;let C=null;const g=new Jt;g.viewport=new gt;const _=new Jt;_.viewport=new gt;const b=[g,_],O=new Pf;let G=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let te=R[$];return te===void 0&&(te=new xa,R[$]=te),te.getTargetRaySpace()},this.getControllerGrip=function($){let te=R[$];return te===void 0&&(te=new xa,R[$]=te),te.getGripSpace()},this.getHand=function($){let te=R[$];return te===void 0&&(te=new xa,R[$]=te),te.getHandSpace()};function Y($){const te=T.indexOf($.inputSource);if(te===-1)return;const ve=R[te];ve!==void 0&&(ve.update($.inputSource,$.frame,c||a),ve.dispatchEvent({type:$.type,data:$.inputSource}))}function Z(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",ne);for(let $=0;$<R.length;$++){const te=T[$];te!==null&&(T[$]=null,R[$].disconnect(te))}G=null,q=null,m.reset();for(const $ in h)delete h[$];e.setRenderTarget(E),p=null,d=null,u=null,r=null,A=null,dt.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",ne),S.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(P),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,ze=null,Pe=null;S.depth&&(Pe=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=S.stencil?Br:Or,ze=S.stencil?Fr:Ti);const Ze={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ze),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),A=new Ai(d.textureWidth,d.textureHeight,{format:_n,type:Ln,depthTexture:new lu(d.textureWidth,d.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ve={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ve),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new Ai(p.framebufferWidth,p.framebufferHeight,{format:_n,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),dt.setContext(r),dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ne($){for(let te=0;te<$.removed.length;te++){const ve=$.removed[te],ze=T.indexOf(ve);ze>=0&&(T[ze]=null,R[ze].disconnect(ve))}for(let te=0;te<$.added.length;te++){const ve=$.added[te];let ze=T.indexOf(ve);if(ze===-1){for(let Ze=0;Ze<R.length;Ze++)if(Ze>=T.length){T.push(ve),ze=Ze;break}else if(T[Ze]===null){T[Ze]=ve,ze=Ze;break}if(ze===-1)break}const Pe=R[ze];Pe&&Pe.connect(ve)}}const X=new F,ce=new F;function ue($,te,ve){X.setFromMatrixPosition(te.matrixWorld),ce.setFromMatrixPosition(ve.matrixWorld);const ze=X.distanceTo(ce),Pe=te.projectionMatrix.elements,Ze=ve.projectionMatrix.elements,Rt=Pe[14]/(Pe[10]-1),Ge=Pe[14]/(Pe[10]+1),rt=(Pe[9]+1)/Pe[5],D=(Pe[9]-1)/Pe[5],je=(Pe[8]-1)/Pe[0],Xe=(Ze[8]+1)/Ze[0],ft=Rt*je,ye=Rt*Xe,bt=ze/(-je+Xe),Le=bt*-je;if(te.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Le),$.translateZ(bt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pe[10]===-1)$.projectionMatrix.copy(te.projectionMatrix),$.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const ke=Rt+bt,w=Ge+bt,v=ft-Le,k=ye+(ze-Le),K=rt*Ge/w*ke,Q=D*Ge/w*ke;$.projectionMatrix.makePerspective(v,k,K,Q,ke,w),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Ne($,te){te===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(te.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let te=$.near,ve=$.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),O.near=_.near=g.near=te,O.far=_.far=g.far=ve,(G!==O.near||q!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),G=O.near,q=O.far),O.layers.mask=$.layers.mask|6,g.layers.mask=O.layers.mask&3,_.layers.mask=O.layers.mask&5;const ze=$.parent,Pe=O.cameras;Ne(O,ze);for(let Ze=0;Ze<Pe.length;Ze++)Ne(Pe[Ze],ze);Pe.length===2?ue(O,g,_):O.projectionMatrix.copy(g.projectionMatrix),$e($,O,ze)};function $e($,te,ve){ve===null?$.matrix.copy(te.matrixWorld):($.matrix.copy(ve.matrixWorld),$.matrix.invert(),$.matrix.multiply(te.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(te.projectionMatrix),$.projectionMatrixInverse.copy(te.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=or*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function($){return h[$]};let ot=null;function ct($,te){if(f=te.getViewerPose(c||a),x=te,f!==null){const ve=f.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let ze=!1;ve.length!==O.cameras.length&&(O.cameras.length=0,ze=!0);for(let Ge=0;Ge<ve.length;Ge++){const rt=ve[Ge];let D=null;if(p!==null)D=p.getViewport(rt);else{const Xe=u.getViewSubImage(d,rt);D=Xe.viewport,Ge===0&&(e.setRenderTargetTextures(A,Xe.colorTexture,Xe.depthStencilTexture),e.setRenderTarget(A))}let je=b[Ge];je===void 0&&(je=new Jt,je.layers.enable(Ge),je.viewport=new gt,b[Ge]=je),je.matrix.fromArray(rt.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(rt.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(D.x,D.y,D.width,D.height),Ge===0&&(O.matrix.copy(je.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),ze===!0&&O.cameras.push(je)}const Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){u=i.getBinding();const Ge=u.getDepthInformation(ve[0]);Ge&&Ge.isValid&&Ge.texture&&m.init(Ge,r.renderState)}if(Pe&&Pe.includes("camera-access")&&y){e.state.unbindTexture(),u=i.getBinding();for(let Ge=0;Ge<ve.length;Ge++){const rt=ve[Ge].camera;if(rt){let D=h[rt];D||(D=new uu,h[rt]=D);const je=u.getCameraImage(rt);D.sourceTexture=je}}}}for(let ve=0;ve<R.length;ve++){const ze=T[ve],Pe=R[ve];ze!==null&&Pe!==void 0&&Pe.update(ze,te,c||a)}ot&&ot($,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),x=null}const dt=new du;dt.setAnimationLoop(ct),this.setAnimationLoop=function($){ot=$},this.dispose=function(){}}}const vi=new In,hx=new Mt;function px(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,su(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,S,E,A){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),u(m,h)):h.isMeshPhongMaterial?(s(m,h),f(m,h)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,A)):h.isMeshMatcapMaterial?(s(m,h),x(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),y(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,S,E):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Qt&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Qt&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const S=e.get(h),E=S.envMap,A=S.envMapRotation;E&&(m.envMap.value=E,vi.copy(A),vi.x*=-1,vi.y*=-1,vi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),m.envMapRotation.value.setFromMatrix4(hx.makeRotationFromEuler(vi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,S,E){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*S,m.scale.value=E*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function f(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function u(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,S){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Qt&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,h){h.matcap&&(m.matcap.value=h.matcap)}function y(m,h){const S=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function mx(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,E){const A=E.program;i.uniformBlockBinding(S,A)}function c(S,E){let A=r[S.id];A===void 0&&(x(S),A=f(S),r[S.id]=A,S.addEventListener("dispose",m));const R=E.program;i.updateUBOMapping(S,R);const T=e.render.frame;s[S.id]!==T&&(d(S),s[S.id]=T)}function f(S){const E=u();S.__bindingPointIndex=E;const A=n.createBuffer(),R=S.__size,T=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,R,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,A),A}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return At("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const E=r[S.id],A=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let T=0,P=A.length;T<P;T++){const C=Array.isArray(A[T])?A[T]:[A[T]];for(let g=0,_=C.length;g<_;g++){const b=C[g];if(p(b,T,g,R)===!0){const O=b.__offset,G=Array.isArray(b.value)?b.value:[b.value];let q=0;for(let Y=0;Y<G.length;Y++){const Z=G[Y],ne=y(Z);typeof Z=="number"||typeof Z=="boolean"?(b.__data[0]=Z,n.bufferSubData(n.UNIFORM_BUFFER,O+q,b.__data)):Z.isMatrix3?(b.__data[0]=Z.elements[0],b.__data[1]=Z.elements[1],b.__data[2]=Z.elements[2],b.__data[3]=0,b.__data[4]=Z.elements[3],b.__data[5]=Z.elements[4],b.__data[6]=Z.elements[5],b.__data[7]=0,b.__data[8]=Z.elements[6],b.__data[9]=Z.elements[7],b.__data[10]=Z.elements[8],b.__data[11]=0):(Z.toArray(b.__data,q),q+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,b.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,E,A,R){const T=S.value,P=E+"_"+A;if(R[P]===void 0)return typeof T=="number"||typeof T=="boolean"?R[P]=T:R[P]=T.clone(),!0;{const C=R[P];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return R[P]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function x(S){const E=S.uniforms;let A=0;const R=16;for(let P=0,C=E.length;P<C;P++){const g=Array.isArray(E[P])?E[P]:[E[P]];for(let _=0,b=g.length;_<b;_++){const O=g[_],G=Array.isArray(O.value)?O.value:[O.value];for(let q=0,Y=G.length;q<Y;q++){const Z=G[q],ne=y(Z),X=A%R,ce=X%ne.boundary,ue=X+ce;A+=ce,ue!==0&&R-ue<ne.storage&&(A+=R-ue),O.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=A,A+=ne.storage}}}const T=A%R;return T>0&&(A+=R-T),S.__size=A,S.__cache={},this}function y(S){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):He("WebGLRenderer: Unsupported uniform value type.",S),E}function m(S){const E=S.target;E.removeEventListener("dispose",m);const A=a.indexOf(E.__bindingPointIndex);a.splice(A,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function h(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}const xx=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Vn=null;function gx(){return Vn===null&&(Vn=new cu(xx,32,32,Vo,dr),Vn.minFilter=hn,Vn.magFilter=hn,Vn.wrapS=Wn,Vn.wrapT=Wn,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}class _x{constructor(e={}){const{canvas:t=Pd(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const x=new Set([Ho,Go,ko]),y=new Set([Ln,Ti,Nr,Fr,Oo,Bo]),m=new Uint32Array(4),h=new Int32Array(4);let S=null,E=null;const A=[],R=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let P=!1;this._outputColorSpace=sn;let C=0,g=0,_=null,b=-1,O=null;const G=new gt,q=new gt;let Y=null;const Z=new tt(0);let ne=0,X=t.width,ce=t.height,ue=1,Ne=null,$e=null;const ot=new gt(0,0,X,ce),ct=new gt(0,0,X,ce);let dt=!1;const $=new Yo;let te=!1,ve=!1;const ze=new Mt,Pe=new F,Ze=new gt,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function rt(){return _===null?ue:1}let D=i;function je(M,I){return t.getContext(M,I)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${No}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",Me,!1),D===null){const I="webgl2";if(D=je(I,M),D===null)throw je(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw M("WebGLRenderer: "+M.message),M}let Xe,ft,ye,bt,Le,ke,w,v,k,K,Q,H,Re,de,Ie,be,ee,ae,ge,we,me,Be,L,he;function oe(){Xe=new A0(D),Xe.init(),Be=new cx(D,Xe),ft=new g0(D,Xe,e,Be),ye=new ax(D,Xe),ft.reversedDepthBuffer&&d&&ye.buffers.depth.setReversed(!0),bt=new C0(D),Le=new Ym,ke=new ox(D,Xe,ye,Le,ft,Be,bt),w=new v0(T),v=new T0(T),k=new If(D),L=new m0(D,k),K=new w0(D,k,bt,L),Q=new D0(D,K,k,bt),ge=new P0(D,ft,ke),be=new _0(Le),H=new qm(T,w,v,Xe,ft,L,be),Re=new px(T,Le),de=new jm,Ie=new tx(Xe),ae=new p0(T,w,v,ye,Q,p,l),ee=new rx(T,Q,ft),he=new mx(D,bt,ft,ye),we=new x0(D,Xe,bt),me=new R0(D,Xe,bt),bt.programs=H.programs,T.capabilities=ft,T.extensions=Xe,T.properties=Le,T.renderLists=de,T.shadowMap=ee,T.state=ye,T.info=bt}oe();const le=new fx(T,D);this.xr=le,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=Xe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Xe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(M){M!==void 0&&(ue=M,this.setSize(X,ce,!1))},this.getSize=function(M){return M.set(X,ce)},this.setSize=function(M,I,z=!0){if(le.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}X=M,ce=I,t.width=Math.floor(M*ue),t.height=Math.floor(I*ue),z===!0&&(t.style.width=M+"px",t.style.height=I+"px"),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(X*ue,ce*ue).floor()},this.setDrawingBufferSize=function(M,I,z){X=M,ce=I,ue=z,t.width=Math.floor(M*z),t.height=Math.floor(I*z),this.setViewport(0,0,M,I)},this.getCurrentViewport=function(M){return M.copy(G)},this.getViewport=function(M){return M.copy(ot)},this.setViewport=function(M,I,z,V){M.isVector4?ot.set(M.x,M.y,M.z,M.w):ot.set(M,I,z,V),ye.viewport(G.copy(ot).multiplyScalar(ue).round())},this.getScissor=function(M){return M.copy(ct)},this.setScissor=function(M,I,z,V){M.isVector4?ct.set(M.x,M.y,M.z,M.w):ct.set(M,I,z,V),ye.scissor(q.copy(ct).multiplyScalar(ue).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(M){ye.setScissorTest(dt=M)},this.setOpaqueSort=function(M){Ne=M},this.setTransparentSort=function(M){$e=M},this.getClearColor=function(M){return M.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(M=!0,I=!0,z=!0){let V=0;if(M){let U=!1;if(_!==null){const ie=_.texture.format;U=x.has(ie)}if(U){const ie=_.texture.type,fe=y.has(ie),xe=ae.getClearColor(),re=ae.getClearAlpha(),Ee=xe.r,De=xe.g,Te=xe.b;fe?(m[0]=Ee,m[1]=De,m[2]=Te,m[3]=re,D.clearBufferuiv(D.COLOR,0,m)):(h[0]=Ee,h[1]=De,h[2]=Te,h[3]=re,D.clearBufferiv(D.COLOR,0,h))}else V|=D.COLOR_BUFFER_BIT}I&&(V|=D.DEPTH_BUFFER_BIT),z&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),ae.dispose(),de.dispose(),Ie.dispose(),Le.dispose(),w.dispose(),v.dispose(),Q.dispose(),L.dispose(),he.dispose(),H.dispose(),le.dispose(),le.removeEventListener("sessionstart",cn),le.removeEventListener("sessionend",Yr),ln.stop()};function se(M){M.preventDefault(),wc("WebGLRenderer: Context Lost."),P=!0}function j(){wc("WebGLRenderer: Context Restored."),P=!1;const M=bt.autoReset,I=ee.enabled,z=ee.autoUpdate,V=ee.needsUpdate,U=ee.type;oe(),bt.autoReset=M,ee.enabled=I,ee.autoUpdate=z,ee.needsUpdate=V,ee.type=U}function Me(M){At("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Fe(M){const I=M.target;I.removeEventListener("dispose",Fe),ht(I)}function ht(M){nt(M),Le.remove(M)}function nt(M){const I=Le.get(M).programs;I!==void 0&&(I.forEach(function(z){H.releaseProgram(z)}),M.isShaderMaterial&&H.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,z,V,U,ie){I===null&&(I=Rt);const fe=U.isMesh&&U.matrixWorld.determinant()<0,xe=N(M,I,z,V,U);ye.setMaterial(V,fe);let re=z.index,Ee=1;if(V.wireframe===!0){if(re=K.getWireframeAttribute(z),re===void 0)return;Ee=2}const De=z.drawRange,Te=z.attributes.position;let Ve=De.start*Ee,lt=(De.start+De.count)*Ee;ie!==null&&(Ve=Math.max(Ve,ie.start*Ee),lt=Math.min(lt,(ie.start+ie.count)*Ee)),re!==null?(Ve=Math.max(Ve,0),lt=Math.min(lt,re.count)):Te!=null&&(Ve=Math.max(Ve,0),lt=Math.min(lt,Te.count));const Et=lt-Ve;if(Et<0||Et===1/0)return;L.setup(U,V,xe,z,re);let pt,ut=we;if(re!==null&&(pt=k.get(re),ut=me,ut.setIndex(pt)),U.isMesh)V.wireframe===!0?(ye.setLineWidth(V.wireframeLinewidth*rt()),ut.setMode(D.LINES)):ut.setMode(D.TRIANGLES);else if(U.isLine){let Ue=V.linewidth;Ue===void 0&&(Ue=1),ye.setLineWidth(Ue*rt()),U.isLineSegments?ut.setMode(D.LINES):U.isLineLoop?ut.setMode(D.LINE_LOOP):ut.setMode(D.LINE_STRIP)}else U.isPoints?ut.setMode(D.POINTS):U.isSprite&&ut.setMode(D.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)zr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Xe.get("WEBGL_multi_draw"))ut.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ue=U._multiDrawStarts,yt=U._multiDrawCounts,it=U._multiDrawCount,Bt=re?k.get(re).bytesPerElement:1,Nn=Le.get(V).currentProgram.getUniforms();for(let Ce=0;Ce<it;Ce++)Nn.setValue(D,"_gl_DrawID",Ce),ut.render(Ue[Ce]/Bt,yt[Ce])}else if(U.isInstancedMesh)ut.renderInstances(Ve,Et,U.count);else if(z.isInstancedBufferGeometry){const Ue=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,yt=Math.min(z.instanceCount,Ue);ut.renderInstances(Ve,Et,yt)}else ut.render(Ve,Et)};function Ft(M,I,z){M.transparent===!0&&M.side===Hn&&M.forceSinglePass===!1?(M.side=Qt,M.needsUpdate=!0,Pi(M,I,z),M.side=li,M.needsUpdate=!0,Pi(M,I,z),M.side=Hn):Pi(M,I,z)}this.compile=function(M,I,z=null){z===null&&(z=M),E=Ie.get(z),E.init(I),R.push(E),z.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(E.pushLight(U),U.castShadow&&E.pushShadow(U))}),M!==z&&M.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(E.pushLight(U),U.castShadow&&E.pushShadow(U))}),E.setupLights();const V=new Set;return M.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ie=U.material;if(ie)if(Array.isArray(ie))for(let fe=0;fe<ie.length;fe++){const xe=ie[fe];Ft(xe,z,U),V.add(xe)}else Ft(ie,z,U),V.add(ie)}),E=R.pop(),V},this.compileAsync=function(M,I,z=null){const V=this.compile(M,I,z);return new Promise(U=>{function ie(){if(V.forEach(function(fe){Le.get(fe).currentProgram.isReady()&&V.delete(fe)}),V.size===0){U(M);return}setTimeout(ie,10)}Xe.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Zt=null;function gr(M){Zt&&Zt(M)}function cn(){ln.stop()}function Yr(){ln.start()}const ln=new du;ln.setAnimationLoop(gr),typeof self<"u"&&ln.setContext(self),this.setAnimationLoop=function(M){Zt=M,le.setAnimationLoop(M),M===null?ln.stop():ln.start()},le.addEventListener("sessionstart",cn),le.addEventListener("sessionend",Yr),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){At("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(I),I=le.getCamera()),M.isScene===!0&&M.onBeforeRender(T,M,I,_),E=Ie.get(M,R.length),E.init(I),R.push(E),ze.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),$.setFromProjectionMatrix(ze,Pn,I.reversedDepth),ve=this.localClippingEnabled,te=be.init(this.clippingPlanes,ve),S=de.get(M,A.length),S.init(),A.push(S),le.enabled===!0&&le.isPresenting===!0){const ie=T.xr.getDepthSensingMesh();ie!==null&&Un(ie,I,-1/0,T.sortObjects)}Un(M,I,0,T.sortObjects),S.finish(),T.sortObjects===!0&&S.sort(Ne,$e),Ge=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Ge&&ae.addToRenderList(S,M),this.info.render.frame++,te===!0&&be.beginShadows();const z=E.state.shadowsArray;ee.render(z,M,I),te===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=S.opaque,U=S.transmissive;if(E.setupLights(),I.isArrayCamera){const ie=I.cameras;if(U.length>0)for(let fe=0,xe=ie.length;fe<xe;fe++){const re=ie[fe];$r(V,U,M,re)}Ge&&ae.render(M);for(let fe=0,xe=ie.length;fe<xe;fe++){const re=ie[fe];di(S,M,re,re.viewport)}}else U.length>0&&$r(V,U,M,I),Ge&&ae.render(M),di(S,M,I);_!==null&&g===0&&(ke.updateMultisampleRenderTarget(_),ke.updateRenderTargetMipmap(_)),M.isScene===!0&&M.onAfterRender(T,M,I),L.resetDefaultState(),b=-1,O=null,R.pop(),R.length>0?(E=R[R.length-1],te===!0&&be.setGlobalState(T.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?S=A[A.length-1]:S=null};function Un(M,I,z,V){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||$.intersectsSprite(M)){V&&Ze.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ze);const fe=Q.update(M),xe=M.material;xe.visible&&S.push(M,fe,xe,z,Ze.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||$.intersectsObject(M))){const fe=Q.update(M),xe=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ze.copy(M.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Ze.copy(fe.boundingSphere.center)),Ze.applyMatrix4(M.matrixWorld).applyMatrix4(ze)),Array.isArray(xe)){const re=fe.groups;for(let Ee=0,De=re.length;Ee<De;Ee++){const Te=re[Ee],Ve=xe[Te.materialIndex];Ve&&Ve.visible&&S.push(M,fe,Ve,z,Ze.z,Te)}}else xe.visible&&S.push(M,fe,xe,z,Ze.z,null)}}const ie=M.children;for(let fe=0,xe=ie.length;fe<xe;fe++)Un(ie[fe],I,z,V)}function di(M,I,z,V){const{opaque:U,transmissive:ie,transparent:fe}=M;E.setupLightsView(z),te===!0&&be.setGlobalState(T.clippingPlanes,z),V&&ye.viewport(G.copy(V)),U.length>0&&Kn(U,I,z),ie.length>0&&Kn(ie,I,z),fe.length>0&&Kn(fe,I,z),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function $r(M,I,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;E.state.transmissionRenderTarget[V.id]===void 0&&(E.state.transmissionRenderTarget[V.id]=new Ai(1,1,{generateMipmaps:!0,type:Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float")?dr:Ln,minFilter:bi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const ie=E.state.transmissionRenderTarget[V.id],fe=V.viewport||G;ie.setSize(fe.z*T.transmissionResolutionScale,fe.w*T.transmissionResolutionScale);const xe=T.getRenderTarget(),re=T.getActiveCubeFace(),Ee=T.getActiveMipmapLevel();T.setRenderTarget(ie),T.getClearColor(Z),ne=T.getClearAlpha(),ne<1&&T.setClearColor(16777215,.5),T.clear(),Ge&&ae.render(z);const De=T.toneMapping;T.toneMapping=oi;const Te=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),E.setupLightsView(V),te===!0&&be.setGlobalState(T.clippingPlanes,V),Kn(M,z,V),ke.updateMultisampleRenderTarget(ie),ke.updateRenderTargetMipmap(ie),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let lt=0,Et=I.length;lt<Et;lt++){const pt=I[lt],{object:ut,geometry:Ue,material:yt,group:it}=pt;if(yt.side===Hn&&ut.layers.test(V.layers)){const Bt=yt.side;yt.side=Qt,yt.needsUpdate=!0,jr(ut,z,V,Ue,yt,it),yt.side=Bt,yt.needsUpdate=!0,Ve=!0}}Ve===!0&&(ke.updateMultisampleRenderTarget(ie),ke.updateRenderTargetMipmap(ie))}T.setRenderTarget(xe,re,Ee),T.setClearColor(Z,ne),Te!==void 0&&(V.viewport=Te),T.toneMapping=De}function Kn(M,I,z){const V=I.isScene===!0?I.overrideMaterial:null;for(let U=0,ie=M.length;U<ie;U++){const fe=M[U],{object:xe,geometry:re,group:Ee}=fe;let De=fe.material;De.allowOverride===!0&&V!==null&&(De=V),xe.layers.test(z.layers)&&jr(xe,I,z,re,De,Ee)}}function jr(M,I,z,V,U,ie){M.onBeforeRender(T,I,z,V,U,ie),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),U.onBeforeRender(T,I,z,V,M,ie),U.transparent===!0&&U.side===Hn&&U.forceSinglePass===!1?(U.side=Qt,U.needsUpdate=!0,T.renderBufferDirect(z,I,V,U,M,ie),U.side=li,U.needsUpdate=!0,T.renderBufferDirect(z,I,V,U,M,ie),U.side=Hn):T.renderBufferDirect(z,I,V,U,M,ie),M.onAfterRender(T,I,z,V,U,ie)}function Pi(M,I,z){I.isScene!==!0&&(I=Rt);const V=Le.get(M),U=E.state.lights,ie=E.state.shadowsArray,fe=U.state.version,xe=H.getParameters(M,U.state,ie,I,z),re=H.getProgramCacheKey(xe);let Ee=V.programs;V.environment=M.isMeshStandardMaterial?I.environment:null,V.fog=I.fog,V.envMap=(M.isMeshStandardMaterial?v:w).get(M.envMap||V.environment),V.envMapRotation=V.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Ee===void 0&&(M.addEventListener("dispose",Fe),Ee=new Map,V.programs=Ee);let De=Ee.get(re);if(De!==void 0){if(V.currentProgram===De&&V.lightsStateVersion===fe)return _r(M,xe),De}else xe.uniforms=H.getUniforms(M),M.onBeforeCompile(xe,T),De=H.acquireProgram(xe,re),Ee.set(re,De),V.uniforms=xe.uniforms;const Te=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Te.clippingPlanes=be.uniform),_r(M,xe),V.needsLights=J(M),V.lightsStateVersion=fe,V.needsLights&&(Te.ambientLightColor.value=U.state.ambient,Te.lightProbe.value=U.state.probe,Te.directionalLights.value=U.state.directional,Te.directionalLightShadows.value=U.state.directionalShadow,Te.spotLights.value=U.state.spot,Te.spotLightShadows.value=U.state.spotShadow,Te.rectAreaLights.value=U.state.rectArea,Te.ltc_1.value=U.state.rectAreaLTC1,Te.ltc_2.value=U.state.rectAreaLTC2,Te.pointLights.value=U.state.point,Te.pointLightShadows.value=U.state.pointShadow,Te.hemisphereLights.value=U.state.hemi,Te.directionalShadowMap.value=U.state.directionalShadowMap,Te.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Te.spotShadowMap.value=U.state.spotShadowMap,Te.spotLightMatrix.value=U.state.spotLightMatrix,Te.spotLightMap.value=U.state.spotLightMap,Te.pointShadowMap.value=U.state.pointShadowMap,Te.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=De,V.uniformsList=null,De}function Kr(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=Es.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function _r(M,I){const z=Le.get(M);z.outputColorSpace=I.outputColorSpace,z.batching=I.batching,z.batchingColor=I.batchingColor,z.instancing=I.instancing,z.instancingColor=I.instancingColor,z.instancingMorph=I.instancingMorph,z.skinning=I.skinning,z.morphTargets=I.morphTargets,z.morphNormals=I.morphNormals,z.morphColors=I.morphColors,z.morphTargetsCount=I.morphTargetsCount,z.numClippingPlanes=I.numClippingPlanes,z.numIntersection=I.numClipIntersection,z.vertexAlphas=I.vertexAlphas,z.vertexTangents=I.vertexTangents,z.toneMapping=I.toneMapping}function N(M,I,z,V,U){I.isScene!==!0&&(I=Rt),ke.resetTextureUnits();const ie=I.fog,fe=V.isMeshStandardMaterial?I.environment:null,xe=_===null?T.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:ar,re=(V.isMeshStandardMaterial?v:w).get(V.envMap||fe),Ee=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,De=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Te=!!z.morphAttributes.position,Ve=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color;let Et=oi;V.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(Et=T.toneMapping);const pt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ut=pt!==void 0?pt.length:0,Ue=Le.get(V),yt=E.state.lights;if(te===!0&&(ve===!0||M!==O)){const mt=M===O&&V.id===b;be.setState(V,M,mt)}let it=!1;V.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==yt.state.version||Ue.outputColorSpace!==xe||U.isBatchedMesh&&Ue.batching===!1||!U.isBatchedMesh&&Ue.batching===!0||U.isBatchedMesh&&Ue.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ue.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ue.instancing===!1||!U.isInstancedMesh&&Ue.instancing===!0||U.isSkinnedMesh&&Ue.skinning===!1||!U.isSkinnedMesh&&Ue.skinning===!0||U.isInstancedMesh&&Ue.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ue.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ue.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ue.instancingMorph===!1&&U.morphTexture!==null||Ue.envMap!==re||V.fog===!0&&Ue.fog!==ie||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==be.numPlanes||Ue.numIntersection!==be.numIntersection)||Ue.vertexAlphas!==Ee||Ue.vertexTangents!==De||Ue.morphTargets!==Te||Ue.morphNormals!==Ve||Ue.morphColors!==lt||Ue.toneMapping!==Et||Ue.morphTargetsCount!==ut)&&(it=!0):(it=!0,Ue.__version=V.version);let Bt=Ue.currentProgram;it===!0&&(Bt=Pi(V,I,U));let Nn=!1,Ce=!1,St=!1;const Qe=Bt.getUniforms(),qe=Ue.uniforms;if(ye.useProgram(Bt.program)&&(Nn=!0,Ce=!0,St=!0),V.id!==b&&(b=V.id,Ce=!0),Nn||O!==M){ye.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Qe.setValue(D,"projectionMatrix",M.projectionMatrix),Qe.setValue(D,"viewMatrix",M.matrixWorldInverse);const Ct=Qe.map.cameraPosition;Ct!==void 0&&Ct.setValue(D,Pe.setFromMatrixPosition(M.matrixWorld)),ft.logarithmicDepthBuffer&&Qe.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Qe.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),O!==M&&(O=M,Ce=!0,St=!0)}if(U.isSkinnedMesh){Qe.setOptional(D,U,"bindMatrix"),Qe.setOptional(D,U,"bindMatrixInverse");const mt=U.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),Qe.setValue(D,"boneTexture",mt.boneTexture,ke))}U.isBatchedMesh&&(Qe.setOptional(D,U,"batchingTexture"),Qe.setValue(D,"batchingTexture",U._matricesTexture,ke),Qe.setOptional(D,U,"batchingIdTexture"),Qe.setValue(D,"batchingIdTexture",U._indirectTexture,ke),Qe.setOptional(D,U,"batchingColorTexture"),U._colorsTexture!==null&&Qe.setValue(D,"batchingColorTexture",U._colorsTexture,ke));const Tt=z.morphAttributes;if((Tt.position!==void 0||Tt.normal!==void 0||Tt.color!==void 0)&&ge.update(U,z,Bt),(Ce||Ue.receiveShadow!==U.receiveShadow)&&(Ue.receiveShadow=U.receiveShadow,Qe.setValue(D,"receiveShadow",U.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(qe.envMap.value=re,qe.flipEnvMap.value=re.isCubeTexture&&re.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&I.environment!==null&&(qe.envMapIntensity.value=I.environmentIntensity),qe.dfgLUT!==void 0&&(qe.dfgLUT.value=gx()),Ce&&(Qe.setValue(D,"toneMappingExposure",T.toneMappingExposure),Ue.needsLights&&W(qe,St),ie&&V.fog===!0&&Re.refreshFogUniforms(qe,ie),Re.refreshMaterialUniforms(qe,V,ue,ce,E.state.transmissionRenderTarget[M.id]),Es.upload(D,Kr(Ue),qe,ke)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Es.upload(D,Kr(Ue),qe,ke),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Qe.setValue(D,"center",U.center),Qe.setValue(D,"modelViewMatrix",U.modelViewMatrix),Qe.setValue(D,"normalMatrix",U.normalMatrix),Qe.setValue(D,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const mt=V.uniformsGroups;for(let Ct=0,An=mt.length;Ct<An;Ct++){const en=mt[Ct];he.update(en,Bt),he.bind(en,Bt)}}return Bt}function W(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function J(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return g},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(M,I,z){const V=Le.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),Le.get(M.texture).__webglTexture=I,Le.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,I){const z=Le.get(M);z.__webglFramebuffer=I,z.__useDefaultFramebuffer=I===void 0};const _e=D.createFramebuffer();this.setRenderTarget=function(M,I=0,z=0){_=M,C=I,g=z;let V=!0,U=null,ie=!1,fe=!1;if(M){const re=Le.get(M);if(re.__useDefaultFramebuffer!==void 0)ye.bindFramebuffer(D.FRAMEBUFFER,null),V=!1;else if(re.__webglFramebuffer===void 0)ke.setupRenderTarget(M);else if(re.__hasExternalTextures)ke.rebindTextures(M,Le.get(M.texture).__webglTexture,Le.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Te=M.depthTexture;if(re.__boundDepthTexture!==Te){if(Te!==null&&Le.has(Te)&&(M.width!==Te.image.width||M.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ke.setupDepthRenderbuffer(M)}}const Ee=M.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(fe=!0);const De=Le.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(De[I])?U=De[I][z]:U=De[I],ie=!0):M.samples>0&&ke.useMultisampledRTT(M)===!1?U=Le.get(M).__webglMultisampledFramebuffer:Array.isArray(De)?U=De[z]:U=De,G.copy(M.viewport),q.copy(M.scissor),Y=M.scissorTest}else G.copy(ot).multiplyScalar(ue).floor(),q.copy(ct).multiplyScalar(ue).floor(),Y=dt;if(z!==0&&(U=_e),ye.bindFramebuffer(D.FRAMEBUFFER,U)&&V&&ye.drawBuffers(M,U),ye.viewport(G),ye.scissor(q),ye.setScissorTest(Y),ie){const re=Le.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+I,re.__webglTexture,z)}else if(fe){const re=I;for(let Ee=0;Ee<M.textures.length;Ee++){const De=Le.get(M.textures[Ee]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ee,De.__webglTexture,z,re)}}else if(M!==null&&z!==0){const re=Le.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,re.__webglTexture,z)}b=-1},this.readRenderTargetPixels=function(M,I,z,V,U,ie,fe,xe=0){if(!(M&&M.isWebGLRenderTarget)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let re=Le.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&fe!==void 0&&(re=re[fe]),re){ye.bindFramebuffer(D.FRAMEBUFFER,re);try{const Ee=M.textures[xe],De=Ee.format,Te=Ee.type;if(!ft.textureFormatReadable(De)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Te)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-V&&z>=0&&z<=M.height-U&&(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xe),D.readPixels(I,z,V,U,Be.convert(De),Be.convert(Te),ie))}finally{const Ee=_!==null?Le.get(_).__webglFramebuffer:null;ye.bindFramebuffer(D.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(M,I,z,V,U,ie,fe,xe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let re=Le.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&fe!==void 0&&(re=re[fe]),re)if(I>=0&&I<=M.width-V&&z>=0&&z<=M.height-U){ye.bindFramebuffer(D.FRAMEBUFFER,re);const Ee=M.textures[xe],De=Ee.format,Te=Ee.type;if(!ft.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.bufferData(D.PIXEL_PACK_BUFFER,ie.byteLength,D.STREAM_READ),M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xe),D.readPixels(I,z,V,U,Be.convert(De),Be.convert(Te),0);const lt=_!==null?Le.get(_).__webglFramebuffer:null;ye.bindFramebuffer(D.FRAMEBUFFER,lt);const Et=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Dd(D,Et,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ie),D.deleteBuffer(Ve),D.deleteSync(Et),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,I=null,z=0){const V=Math.pow(2,-z),U=Math.floor(M.image.width*V),ie=Math.floor(M.image.height*V),fe=I!==null?I.x:0,xe=I!==null?I.y:0;ke.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,z,0,0,fe,xe,U,ie),ye.unbindTexture()};const Se=D.createFramebuffer(),Oe=D.createFramebuffer();this.copyTextureToTexture=function(M,I,z=null,V=null,U=0,ie=null){ie===null&&(U!==0?(zr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=U,U=0):ie=0);let fe,xe,re,Ee,De,Te,Ve,lt,Et;const pt=M.isCompressedTexture?M.mipmaps[ie]:M.image;if(z!==null)fe=z.max.x-z.min.x,xe=z.max.y-z.min.y,re=z.isBox3?z.max.z-z.min.z:1,Ee=z.min.x,De=z.min.y,Te=z.isBox3?z.min.z:0;else{const Tt=Math.pow(2,-U);fe=Math.floor(pt.width*Tt),xe=Math.floor(pt.height*Tt),M.isDataArrayTexture?re=pt.depth:M.isData3DTexture?re=Math.floor(pt.depth*Tt):re=1,Ee=0,De=0,Te=0}V!==null?(Ve=V.x,lt=V.y,Et=V.z):(Ve=0,lt=0,Et=0);const ut=Be.convert(I.format),Ue=Be.convert(I.type);let yt;I.isData3DTexture?(ke.setTexture3D(I,0),yt=D.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(ke.setTexture2DArray(I,0),yt=D.TEXTURE_2D_ARRAY):(ke.setTexture2D(I,0),yt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,I.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,I.unpackAlignment);const it=D.getParameter(D.UNPACK_ROW_LENGTH),Bt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Nn=D.getParameter(D.UNPACK_SKIP_PIXELS),Ce=D.getParameter(D.UNPACK_SKIP_ROWS),St=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,pt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,pt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ee),D.pixelStorei(D.UNPACK_SKIP_ROWS,De),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Te);const Qe=M.isDataArrayTexture||M.isData3DTexture,qe=I.isDataArrayTexture||I.isData3DTexture;if(M.isDepthTexture){const Tt=Le.get(M),mt=Le.get(I),Ct=Le.get(Tt.__renderTarget),An=Le.get(mt.__renderTarget);ye.bindFramebuffer(D.READ_FRAMEBUFFER,Ct.__webglFramebuffer),ye.bindFramebuffer(D.DRAW_FRAMEBUFFER,An.__webglFramebuffer);for(let en=0;en<re;en++)Qe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Le.get(M).__webglTexture,U,Te+en),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Le.get(I).__webglTexture,ie,Et+en)),D.blitFramebuffer(Ee,De,fe,xe,Ve,lt,fe,xe,D.DEPTH_BUFFER_BIT,D.NEAREST);ye.bindFramebuffer(D.READ_FRAMEBUFFER,null),ye.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(U!==0||M.isRenderTargetTexture||Le.has(M)){const Tt=Le.get(M),mt=Le.get(I);ye.bindFramebuffer(D.READ_FRAMEBUFFER,Se),ye.bindFramebuffer(D.DRAW_FRAMEBUFFER,Oe);for(let Ct=0;Ct<re;Ct++)Qe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tt.__webglTexture,U,Te+Ct):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Tt.__webglTexture,U),qe?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.__webglTexture,ie,Et+Ct):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,mt.__webglTexture,ie),U!==0?D.blitFramebuffer(Ee,De,fe,xe,Ve,lt,fe,xe,D.COLOR_BUFFER_BIT,D.NEAREST):qe?D.copyTexSubImage3D(yt,ie,Ve,lt,Et+Ct,Ee,De,fe,xe):D.copyTexSubImage2D(yt,ie,Ve,lt,Ee,De,fe,xe);ye.bindFramebuffer(D.READ_FRAMEBUFFER,null),ye.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else qe?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(yt,ie,Ve,lt,Et,fe,xe,re,ut,Ue,pt.data):I.isCompressedArrayTexture?D.compressedTexSubImage3D(yt,ie,Ve,lt,Et,fe,xe,re,ut,pt.data):D.texSubImage3D(yt,ie,Ve,lt,Et,fe,xe,re,ut,Ue,pt):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ie,Ve,lt,fe,xe,ut,Ue,pt.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ie,Ve,lt,pt.width,pt.height,ut,pt.data):D.texSubImage2D(D.TEXTURE_2D,ie,Ve,lt,fe,xe,ut,Ue,pt);D.pixelStorei(D.UNPACK_ROW_LENGTH,it),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Bt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Nn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ce),D.pixelStorei(D.UNPACK_SKIP_IMAGES,St),ie===0&&I.generateMipmaps&&D.generateMipmap(yt),ye.unbindTexture()},this.initRenderTarget=function(M){Le.get(M).__webglFramebuffer===void 0&&ke.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ke.setTextureCube(M,0):M.isData3DTexture?ke.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ke.setTexture2DArray(M,0):ke.setTexture2D(M,0),ye.unbindTexture()},this.resetState=function(){C=0,g=0,_=null,ye.reset(),L.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}function vx(n){var _r;const e=new _x({canvas:n,antialias:!0,alpha:!1,powerPreference:"low-power"});e.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),e.outputColorSpace=sn,e.toneMapping=Gl,e.toneMappingExposure=1.08;const t=new Xc;t.background=new tt("#101e26"),t.fog=new Ls("#101e26",19,36);const i=new Qo(-5,5,5,-5,.1,70),r=new Df,s=new ii(new F(0,1,0),0),a=new F,o=new F(rn.x,0,rn.y),l=new Mt,c=new Set;let f="",u=0,d="maze";const p=(N,W={})=>{const J=new Sf({color:N,roughness:.9,...W});return c.add(J),J},x=p("#34515a"),y=p("#405c65"),m=p("#22373e"),h=p("#304850"),S=p("#c09550",{metalness:.45,roughness:.55}),E=p("#111b26"),A=p("#ffd78a",{emissive:"#ffb541",emissiveIntensity:1.5}),R=p("#9ce9d7",{emissive:"#3aaf9d",emissiveIntensity:1}),T=p("#aa8cde",{emissive:"#7250a2",emissiveIntensity:.65}),P=p("#dd766c",{emissive:"#b13932",emissiveIntensity:.4}),C=N=>(c.add(N),N),g=(N,W,J)=>C(new pr(N,W,J)),_=N=>C(new Zo(N,12,8)),b=(N,W,J,_e=0,Se=0,Oe=0)=>{const M=new En(N,W);return M.position.set(_e,Se,Oe),J.add(M),M};t.add(new jc("#c6e9e5","#263a49",2.1));const O=new ya("#b6d4e4",1.9);O.position.set(-5,12,5),t.add(O);const G=new ya("#ffd2a1",.9);G.position.set(7,4,-3),t.add(G);const q=[],Y=[],Z=[];Vt.forEach((N,W)=>[...N].forEach((J,_e)=>{(J==="#"?q:Y).push({x:_e,y:W}),J!=="#"&&(_e*7+W*11)%9===0&&Z.push({x:_e,y:W})}));const ne=(N,W,J,_e)=>{const Se=new ga(N,W,J.length);return J.forEach((Oe,M)=>{l.makeTranslation(Oe.x,_e,Oe.y),Se.setMatrixAt(M,l)}),Se.instanceMatrix.needsUpdate=!0,t.add(Se),Se},X=ne(g(.98,.14,.98),p("#ffffff"),Y,-.08);Y.forEach((N,W)=>X.setColorAt(W,new tt(N.x>=16?"#2b413b":N.y>=13?"#3d4344":"#22373e"))),X.instanceColor&&(X.instanceColor.needsUpdate=!0),ne(g(.95,.72,.95),x,q,.28),ne(g(1,.08,1),y,q,.66),ne(g(.014,.01,.97),x,q,.705),ne(g(.98,.01,.012),x,q,.705),ne(g(.86,.018,.86),h,Z,.005);const ce=b(g(Vt[0].length+.8,.35,Vt.length+.8),E,t,(Vt[0].length-1)/2,-.3,(Vt.length-1)/2);ce.name="maze-foundation";function ue(N,W=!1){const J=new st;J.position.set(N.x,0,N.y),t.add(J);const _e=g(.15,1.4,.22);b(_e,x,J,-.39,.65,0),b(_e,x,J,.39,.65,0),b(g(.95,.2,.28),y,J,0,1.34,0);const Se=b(g(.62,1.08,.035),W?T:R,J,0,.6,0);Se.material=p(W?"#8066bd":"#2e8a80",{emissive:W?"#51337e":"#217b73",emissiveIntensity:.8,transparent:!0,opacity:.5});for(const Oe of[-.39,.39])b(g(.06,.65,.25),W?T:R,J,Oe,.75,0);return{group:J,glow:Se}}ue(rn);const Ne=ue(tr,!0),$e=new Map;function ot(N,W){const J=new st;J.position.set(N.x,.04,N.y),t.add(J);const _e=b(C(new ri(.36,.035,5,24)),T,J,0,.035,0);_e.rotation.x=Math.PI/2;const Se=b(C(new Ir(.15)),A,J,0,.45,0);for(let Oe=-1;Oe<=1;Oe+=2)b(g(.08,.3,.08),S,J,Oe*.37,.17,-.3),b(_(.055),A,J,Oe*.37,.37,-.3);if(N.kind==="floor"){const Oe=new st;J.add(Oe);for(const M of[-.7,.6,1.8]){const I=b(g(.04,.02,.63),E,Oe,0,.01,0);I.rotation.y=M}}else if(N.kind==="cage"){for(const Oe of[-.33,.33])b(g(.035,.65,.035),S,J,Oe,.32,.3);b(g(.72,.035,.035),S,J,0,.65,.3)}else b(g(.22,.48,.2),x,J,0,.2,.28),b(C(new Ir(.12)),T,J,0,.54,.28);return{group:J,ring:_e,seal:Se,encounter:N,index:W}}ci.forEach((N,W)=>$e.set(N.id,ot(N,W)));const ct=new st;ct.position.set(Ca.x,0,Ca.y),t.add(ct),b(g(.45,.25,.4),x,ct,0,.12,0);const dt=b(g(.3,.045,.24),R,ct,0,.29,0);dt.rotation.y=-.2;const $=new st;$.position.set(Pa.x,0,Pa.y),t.add($),b(g(.49,.3,.35),p("#745443"),$,0,.16,0);const te=b(g(.51,.12,.38),S,$,0,.35,0);b(g(.075,.16,.37),A,$,0,.27,0);const ve=p("#e6b268"),ze=p("#dfb99a"),Pe=p("#243348");function Ze(N,W="#282b34",J=ze,_e=!1){const Se=new st,Oe=typeof N=="string"?p(N):N,M=p(W),I=b(C(new Dt(.145,.13,.34,9)),Oe,Se,0,.62,0);b(C(new Dt(.045,.05,.08,7)),J,Se,0,.83,0);const z=b(_(.115),J,Se,0,.96,-.01);z.scale.set(.94,1.1,.94),b(_(.119),M,Se,0,1.025,.005).scale.set(1,.55,.92);for(const re of[-.043,.043])b(_(.013),E,Se,re,.98,-.111);b(_(.024),J,Se,0,.955,-.125),b(g(.04,.008,.009),M,Se,0,.925,-.114),b(g(.22,.26,.09),p("#705c4c"),Se,0,.62,.145);const U=[],ie=[],fe=[];for(const re of[-1,1]){const Ee=new st;Ee.position.set(re*.083,.43,0),Se.add(Ee),U.push(Ee),b(C(new Dt(.055,.047,.19,7)),Pe,Ee,0,-.09,0);const De=new st;De.position.y=-.19,Ee.add(De),ie.push(De),b(C(new Dt(.046,.038,.18,7)),Pe,De,0,-.085,0),b(g(.09,.055,.15),E,De,0,-.18,-.025);const Te=new st;Te.position.set(re*.18,.75,0),Se.add(Te),fe.push(Te),b(C(new Dt(.045,.04,.18,7)),Oe,Te,0,-.09,0);const Ve=new st;Ve.position.y=-.17,Ve.rotation.x=-.12,Te.add(Ve),b(C(new Dt(.037,.032,.15,7)),Oe,Ve,0,-.075,0),b(_(.039),J,Ve,0,-.16,0)}let xe=null;if(_e){xe=b(g(.1,.145,.1),A,Se,.22,.31,-.05),b(C(new ri(.055,.012,4,10)),S,Se,.22,.43,-.05);const re=new Ar("#ffc271",2,4.5,2);re.position.set(.28,.6,-.18),Se.add(re)}return{group:Se,torso:I,head:z,legs:U,knees:ie,arms:fe,lantern:xe}}function Rt(N,W,J,_e=1){const Se=J?Math.min(1,_e/2.4):0;N.legs.forEach((Oe,M)=>{Oe.rotation.x=Math.sin(W+M*Math.PI)*.55*Se}),N.knees.forEach((Oe,M)=>{Oe.rotation.x=Math.max(0,-Math.sin(W+M*Math.PI))*.65*Se}),N.arms.forEach((Oe,M)=>{Oe.rotation.x=-Math.sin(W+M*Math.PI)*.34*Se}),N.torso.position.y=.62+Math.abs(Math.sin(W))*.018*Se,N.torso.rotation.z=Math.sin(W)*.025*Se,N.head.position.y=.96+Math.abs(Math.sin(W))*.009*Se}const Ge=Ze(ve,"#252b32",ze,!0),rt=Ge.group;t.add(rt);let D=0,je=null,Xe={...rn},ft=!1;const ye=b(C(new Ko(.26,.3,32)),R,t,rn.x,.015,rn.y);ye.rotation.x=-Math.PI/2;function bt(){const N=new st,W=p("#45425c");b(_(.23),W,N,0,.27,.03),b(_(.14),E,N,0,.21,-.2);for(const J of[-.065,.065])b(_(.035),P,N,J,.25,-.33);for(let J=-1;J<=1;J+=2)for(let _e=0;_e<4;_e++){const Se=new st;Se.position.set(J*.12,.24,-.16+_e*.12),N.add(Se);const Oe=b(g(.3,.035,.035),W,Se,J*.14,.02,0);Oe.rotation.z=J*.35;const M=b(g(.22,.035,.035),W,Se,J*.35,-.07,0);M.rotation.z=J*-.65}return N}function Le(){const N=new st,W=p("#8175a0",{emissive:"#332540",emissiveIntensity:.45});b(C(new dn(.29,.65,9)),W,N,0,.42,0),b(_(.19),E,N,0,.73,0);for(const J of[-.065,.065])b(_(.028),R,N,J,.76,-.17);for(const J of[-1,1]){const _e=b(g(.14,.4,.14),W,N,J*.29,.55,0);_e.rotation.z=J*.55}return N}const ke=Po.map((N,W)=>{const J=W===0?bt():Le();return t.add(J),{...N,group:J,index:W}}),w=p("#e0d5b8"),v=p("#a85d36"),k=p("#695442"),K=p("#365949"),Q=p("#61aeb9",{transparent:!0,opacity:.85,metalness:.3,roughness:.25}),H=new Map;function Re(N){const W=new st,J=[];let _e,Se=null,Oe=[];if(N==="fox"){b(_(.22),v,W,0,.23,.02).scale.set(.63,.75,1.35),_e=new st,_e.position.set(0,.3,-.27),W.add(_e),b(_(.115),v,_e);const I=b(C(new dn(.073,.17,7)),w,_e,0,-.02,-.13);I.rotation.x=-Math.PI/2,b(_(.026),E,_e,0,-.02,-.22);for(const z of[-1,1])b(C(new dn(.055,.14,5)),v,_e,z*.072,.12,0),b(_(.015),E,_e,z*.07,.035,-.09);Se=new st,Se.position.set(0,.2,.27),Se.rotation.x=1.05,W.add(Se),b(C(new Dt(.065,.09,.32,7)),v,Se,0,.12,0),b(C(new dn(.065,.17,7)),w,Se,0,.36,0);for(const z of[-.1,.1])for(const V of[-.16,.19]){const U=new st;U.position.set(z,.21,V),W.add(U),J.push(U),b(C(new Dt(.03,.023,.18,6)),v,U,0,-.075,0),b(_(.035),E,U,0,-.15,-.015)}}else if(N==="rabbit"){b(_(.18),w,W,0,.18,.035).scale.set(.78,.9,1.2),_e=new st,_e.position.set(0,.27,-.17),W.add(_e),b(_(.1),w,_e);for(const I of[-1,1]){const z=b(C(new $o(.026,.15,3,7)),w,_e,I*.043,.16,0);z.rotation.z=I*-.12,Oe.push(z),b(_(.013),E,_e,I*.06,.02,-.075),b(g(.07,.04,.14),w,W,I*.085,.035,-.08)}b(_(.018),p("#c7908c"),_e,0,-.015,-.096),b(_(.055),w,W,0,.16,.23)}else{b(C(new Dt(.14,.19,.52,9)),x,W,0,.26,0),b(_(.17),k,W,0,.71,0).scale.set(.9,1.22,.83);for(const z of[-1,1])b(_(.12),k,W,z*.14,.72,0).scale.set(.4,1.25,.8);_e=new st,_e.position.set(0,.96,-.01),W.add(_e),b(_(.145),k,_e);for(const z of[-1,1])b(_(.055),w,_e,z*.063,.01,-.115),b(_(.024),E,_e,z*.063,.01,-.16),b(C(new dn(.04,.1,5)),k,_e,z*.1,.13,0);const I=b(C(new dn(.035,.08,5)),S,_e,0,-.035,-.15);I.rotation.x=-Math.PI/2}return{group:W,head:_e,tail:Se,ears:Oe,feet:J}}Dn.forEach(N=>{let W;if(N.kind==="human"){W=Ze(N.id==="scout"?"#688ba0":"#80976c",N.id==="scout"?"#34302c":"#4f352c");const J=b(C(new Ir(.065)),N.id==="scout"?R:A,W.group,0,1.28,0);W.marker=J}else if(["fox","rabbit","owl"].includes(N.kind))W=Re(N.kind);else if(W={group:new st},N.kind==="pump"){b(g(.35,.12,.35),x,W.group,-.24,.06,.14),b(C(new Dt(.075,.11,.48,8)),K,W.group,-.24,.33,.14);const J=b(C(new Dt(.035,.035,.27,7)),S,W.group,-.08,.48,.14);J.rotation.z=Math.PI/2,b(g(.05,.36,.04),S,W.group,-.31,.64,.14).rotation.z=-.5,W.stream=b(C(new Dt(.016,.025,.33,6)),Q,W.group,.045,.27,.14),W.drops=Array.from({length:3},()=>b(_(.025),Q,W.group,.045,.3,.14))}else if(N.kind==="lamp")b(C(new Dt(.035,.06,1.45,8)),S,W.group,.3,.72,.22),b(g(.3,.07,.28),E,W.group,.3,1.5,.22),W.bulb=b(g(.18,.25,.18),p("#554d35",{emissive:"#ffba5a",emissiveIntensity:0}),W.group,.3,1.33,.22),W.light=new Ar("#ffd395",0,6,2),W.light.position.set(.3,1.33,.22),W.group.add(W.light);else{for(const J of[-.29,.29])b(g(.06,.3,.26),x,W.group,J,.15,.22);b(g(.85,.07,.31),k,W.group,0,.32,.22),b(g(.85,.23,.05),k,W.group,0,.49,.37)}W.group.position.set(N.x,0,N.y),t.add(W.group),W.distance=0,W.last={x:N.x,y:N.y},H.set(N.id,{entity:N,...W})});const de=new st;de.position.set(Ur.x+.3,0,Ur.y),t.add(de),b(C(new Dt(.18,.15,.09,12,1,!0)),S,de,0,.05,0),b(C(new Dt(.145,.145,.015,12)),E,de,0,.015,0);const Ie=b(C(new Is(.147,16)),Q,de,0,.075,0);Ie.rotation.x=-Math.PI/2;const be=new ga(C(new Is(.055,8)),A,48);t.add(be),be.count=0,q.filter(N=>(N.x>=17||N.y>=13)&&N.x>0&&N.x<Vt[0].length-1&&N.y>0&&N.y<Vt.length-1&&(N.x*3+N.y)%5===0).forEach(N=>{const W=new st;W.position.set(N.x,.7,N.y),t.add(W),b(C(new Dt(.06,.09,.7,6)),k,W,0,.35,0),b(C(new dn(.42,.8,7)),K,W,0,.95,0),b(C(new dn(.31,.7,7)),K,W,0,1.37,0)});for(const N of[{x:6,y:13},{x:12,y:13},{x:18,y:14}])((_r=Vt[N.y])==null?void 0:_r[N.x])==="#"&&(b(g(.42,1.1,.4),x,t,N.x,1.2,N.y),b(g(.7,.18,.58),y,t,N.x+.13,1.82,N.y));const ee=new st;t.add(ee);const ae=p("#8b8399",{metalness:.7,roughness:.3});for(let N=0;N<10;N++){const W=N/10*Math.PI*2;b(g(.035,1.35,.035),ae,ee,Math.cos(W)*.43,.65,Math.sin(W)*.43)}b(C(new Dt(.46,.46,.07,10)),ae,ee,0,1.34,0),b(C(new ri(.43,.035,4,20)),ae,ee,0,.15,0).rotation.x=Math.PI/2;const ge=new Xc;ge.background=new tt("#0b161d"),ge.fog=new Ls("#0b161d",5,10);const we=new Jt(60,1,.04,20);we.position.set(0,1.27,1.75),we.lookAt(0,1.24,-2.8),ge.add(new jc("#94c8ce","#15212b",1.45));const me=new ya("#91b3cf",1.4);me.position.set(-2,3,1),ge.add(me);const Be=p("#2b414b"),L=p("#15262f"),he=p("#60676b",{metalness:.72,roughness:.38}),oe=p("#8d9290",{metalness:.65,roughness:.35});b(g(5,.15,7),m,ge,0,-.08,-1);for(const N of[-2.35,2.35])b(g(.3,3.1,7),Be,ge,N,1.5,-1);b(g(5,3.1,.35),L,ge,0,1.5,-4.2),b(g(5,.2,7),L,ge,0,3.05,-1);const le=g(.84,.4,.17);for(const N of[0,1]){const W=[];for(let _e=N;_e<7;_e+=2)for(let Se=0;Se<6;Se++)W.push([-2.1+Se*.87+(N?.12:0),.2+_e*.43,-3.94]);const J=new ga(le,N?x:Be,W.length);W.forEach((_e,Se)=>{l.makeTranslation(..._e),J.setMatrixAt(Se,l)}),J.instanceMatrix.needsUpdate=!0,ge.add(J)}for(let N=0;N<9;N++)b(g(4.4,.008,.015),L,ge,0,.006,-3.7+N*.6);const se=[];for(const N of[-1,1]){const W=N*1.55;b(g(.09,.55,.1),S,ge,W,1.5,-3.65),b(C(new dn(.13,.32,7)),A,ge,W,1.91,-3.65);const J=new Ar("#ffad56",8,5,2);J.position.set(W,1.91,-3.45),ge.add(J),se.push(J)}const j=Le();j.scale.setScalar(2.35),j.position.set(0,0,-2.55),j.rotation.y=Math.PI,ge.add(j);for(const N of[-1,1]){const W=b(C(new dn(.07,.24,5)),T,j,N*.14,.93,0);W.rotation.z=N*-.3}const Me=new Ar("#9a74d0",3,3.5,2);Me.position.set(0,1.8,-2.2),ge.add(Me);const Fe=new st;ge.add(Fe);const ht=g(.065,2.75,.065);for(const N of[-1.62,-1.08,1.08,1.62])b(ht,he,Fe,N,1.38,-.55);for(const N of[.15,2.65])b(g(3.5,.1,.12),oe,Fe,0,N,-.55);for(const N of[-1,1])for(const W of[.1,.7,1.3])b(ht,he,Fe,N*1.75,1.38,W);const nt=new st;nt.position.set(-.56,0,-.55),Fe.add(nt);for(const N of[0,1.12])b(ht,oe,nt,N,1.38,0);for(const N of[.38,2.4])b(g(1.16,.075,.075),he,nt,.56,N,0);const Ft=new st;Ft.position.set(.56,.9,.07),nt.add(Ft);const Zt=b(g(.25,.3,.12),p("#c09550",{metalness:.45,roughness:.5}),Ft);b(C(new ri(.085,.023,6,14,Math.PI)),oe,Ft,0,.16,0),b(g(.025,.075,.013),E,Ft,0,0,.07);const gr=[];for(const N of[-1,1]){const W=new st;W.position.set(N*.76,.72,-.43),Fe.add(W);for(let J=0;J<5;J++){const _e=b(C(new ri(.05,.014,4,10)),oe,W,N*J*.07,J*.07,0);_e.rotation.y=J%2?.8:0}gr.push(W)}const cn=new st;cn.position.set(.42,.85,.5),ge.add(cn);const Yr=b(g(.2,.5,.23),p("#314b55"),cn,0,-.2,.11);Yr.rotation.x=-.3,b(_(.105),p("#b99276"),cn,0,.08,-.04),b(g(.17,.24,.17),A,cn,-.03,-.13,-.22);for(const N of[-1,1])b(g(.018,.26,.19),S,cn,-.03+N*.09,-.13,-.22);b(C(new ri(.08,.018,5,12)),S,cn,-.03,.07,-.22);const ln=new Ar("#ffca81",2,4,2);ln.position.set(.1,.95,-.2),ge.add(ln);const Un=new wf("#ffd59a",0,7,.38,.6,1.7);Un.position.set(.5,1.05,.75),Un.target.position.set(0,1.25,-3.3),ge.add(Un,Un.target);let di=0;function $r(N,W,J,_e=null){var U,ie,fe,xe;N.paused||(di=W?0:((N.elapsedMs||0)+(N.captureMs||0))/1e3);const Se=Qr.clamp(Number(J.lookYaw)||0,-.3,.3);we.lookAt(-Math.sin(Se)*4.5,1.24,-2.8);const Oe=!!J.lanternRaised;if(cn.position.y=Oe?1.05:.85,ln.position.y=Oe?1.25:.95,ln.intensity=Oe?4:2,Un.intensity=Oe?14:0,Zt.material.emissive.set(J.lockInspected?"#ab6f21":"#000000"),Zt.material.emissiveIntensity=J.lockInspected?.65:0,!N.paused){const re=J.rattleMs>0;Fe.position.x=re&&!W?Math.sin(J.rattleMs*.055)*.018:0,j.rotation.z=re&&!W?-.06:0,j.position.z=re?-2.38:-2.55,Me.color.set(re?"#c27683":"#9a74d0")}const M=((U=N.review)==null?void 0:U.index)||0;gr[0].visible=M<1,gr[1].visible=!0;const I=N.phase==="feedback"&&((ie=N.resolved)==null?void 0:ie.includes(N.activeEncounter))||N.phase==="review-feedback"&&M>=1&&(((fe=N.review)==null?void 0:fe.correct)||((xe=N.review)==null?void 0:xe.wrong)>=2),z=!W&&Number.isFinite(_e),V=z?1-(1-Qr.clamp(_e,0,1))**3:1;nt.rotation.y=z?-1.35*(1-V):I?-.28:0,Fe.position.y=z?1.4*(1-V):0,we.position.z=1.75+(z?.28*(1-V):0),Ft.visible=!I,j.position.y=W?0:Math.sin(di*1.5)*.025,cn.rotation.z=W?0:Math.sin(di*1.2)*.015,se.forEach((re,Ee)=>{re.intensity=8+Math.sin(di*3+Ee)*.4}),ge.updateMatrixWorld(),e.render(ge,we)}function Kn(){const{width:N,height:W}=n.getBoundingClientRect(),J=`${N}/${W}`;if(J===f||N<=0||W<=0)return;f=J,e.setSize(N,W,!1);const _e=N/W;we.aspect=_e,we.updateProjectionMatrix();const Se=_e<.9?5.3:_e>1.6?5:5.7;i.left=-Se*_e,i.right=Se*_e,i.top=Se,i.bottom=-Se,i.updateProjectionMatrix()}function jr(N,{intro:W=!1,reducedMotion:J=!1,encounters:_e=ci,interaction:Se={},movement:Oe=null,guidePath:M=[],trapEntry:I=null,greeting:z=null}={}){var ut,Ue,yt,it,Bt,Nn;Kn();const V=["question","feedback","capture","review","review-feedback"].includes(N.phase);if(d=V&&!W?"first-person-cage":"maze",V&&!W){$r(N,J,Se,I);return}_e.forEach((Ce,St)=>{$e.has(Ce.id)||$e.set(Ce.id,ot(Ce,St))});const U=new Set(_e.map(Ce=>Ce.id));$e.forEach(Ce=>{Ce.group.visible=U.has(Ce.encounter.id)});const ie=J?0:(N.elapsedMs||0)/1e3,fe=N.elapsedMs||0,xe=je===null?0:Math.min(.1,Math.max(0,fe-je)/1e3);je=fe;const re=Oe&&Number.isFinite(Oe.x)&&Number.isFinite(Oe.y)?Oe:N.player||rn,Ee=Math.hypot(re.x-Xe.x,re.y-Xe.y),De=!N.paused&&(Oe?!!Oe.moving:Ee>.001);Ee>1e-4&&Ee<2&&(D+=Ee,u=Math.atan2(Xe.x-re.x,Xe.y-re.y)),Oe&&Number.isFinite(Oe.heading)&&(u=Oe.heading),Xe={x:re.x,y:re.y};const Te=new F(re.x,0,re.y);rt.position.copy(Te);const Ve=Math.atan2(Math.sin(u-rt.rotation.y),Math.cos(u-rt.rotation.y));Oe||J?rt.rotation.y=u:rt.rotation.y+=Ve*(1-Math.exp(-14*xe)),Rt(Ge,D*Math.PI*2/1.15,De&&!J,(Oe==null?void 0:Oe.speed)||2.4),(ut=N.world)!=null&&ut.playerResting&&!De&&(Ge.legs.forEach(Ce=>{Ce.rotation.x=-.65}),Ge.knees.forEach(Ce=>{Ce.rotation.x=1.2}),rt.position.y=-.1),H.forEach(Ce=>{var en,ac,oc,cc,lc,uc;const{entity:St,group:Qe}=Ce,qe=Si(St,fe,N.world),Tt=Math.hypot(qe.x-Ce.last.x,qe.y-Ce.last.y);Tt<2&&(Ce.distance+=Tt),Ce.last={x:qe.x,y:qe.y},Qe.position.set(qe.x,0,qe.y);const mt=!N.paused&&(z==null?void 0:z.entityId)===St.id,Ct=mt?Math.atan2(qe.x-re.x,qe.y-re.y):(qe.heading||0)+Math.PI,An=Math.atan2(Math.sin(Ct-Qe.rotation.y),Math.cos(Ct-Qe.rotation.y));if(Qe.rotation.y+=An*(J?1:1-Math.exp(-9*xe)),St.kind==="human")Rt(Ce,Ce.distance*Math.PI*2/1.15,qe.moving&&!J,1.15),Ce.arms[1].rotation.z=mt?-1.7:0,mt&&(Ce.arms[1].rotation.x=J?-.3:-.3+Math.sin(ie*9)*.18),Ce.marker.rotation.y=ie*.5;else if(St.kind==="fox"){const Di=Ce.distance*Math.PI*2/.7;Ce.feet.forEach((hi,dc)=>{hi.rotation.x=qe.moving&&!J?Math.sin(Di+(dc===0||dc===3?0:Math.PI))*.5:0}),Ce.tail.rotation.z=J?0:Math.sin(ie*(mt?8:2))*(mt?.3:.12);const fi=((en=N.world)==null?void 0:en.foxDrinking)&&!mt;Ce.head.rotation.x=fi?.45:0,Ce.head.position.y=fi?.23:.3,fi&&(Qe.rotation.y=-Math.PI/2)}else St.kind==="rabbit"?(Ce.head.rotation.x=mt?-.12:(ac=N.world)!=null&&ac.rabbitCalm?.15:0,Ce.ears.forEach((Di,fi)=>{var hi;Di.rotation.z=(fi?1:-1)*(mt?.04:(hi=N.world)!=null&&hi.rabbitCalm?.32:.12)})):St.kind==="owl"?Ce.head.rotation.y=mt||(oc=N.world)!=null&&oc.owlObserved?Math.atan2(qe.x-re.x,qe.y-re.y)-Qe.rotation.y:J?0:Math.sin(ie*.45)*.45:St.kind==="pump"?(Ce.stream.visible=!!((cc=N.world)!=null&&cc.waterFilled),Ce.drops.forEach((Di,fi)=>{var hi;Di.visible=!!((hi=N.world)!=null&&hi.waterFilled),Di.position.y=.43-(ie*.6+fi*.11)%.33})):St.kind==="lamp"&&(Ce.bulb.material.emissiveIntensity=(lc=N.world)!=null&&lc.lightsOn?1.5:0,Ce.light.intensity=(uc=N.world)!=null&&uc.lightsOn?9:0)}),Ie.visible=!!((Ue=N.world)!=null&&Ue.waterFilled);const lt=(yt=N.world)!=null&&yt.scoutGuided?M.slice(0,48):[];be.count=lt.length,lt.forEach((Ce,St)=>{l.makeRotationX(-Math.PI/2),l.setPosition(Ce.x,.025,Ce.y),be.setMatrixAt(St,l)}),be.instanceMatrix.needsUpdate=!0,Ge.lantern.material.emissiveIntensity=1.5+Math.sin(ie*3)*.08,ye.position.set(rt.position.x,.017,rt.position.z),ye.visible=N.graceMs>0||W,$e.forEach(({group:Ce,ring:St,seal:Qe,encounter:qe,index:Tt})=>{var Ct,An,en;const mt=((Ct=N.seals)==null?void 0:Ct.includes(qe.id))||((en=(An=N.resolved)==null?void 0:An.includes)==null?void 0:en.call(An,qe.id));St.material=mt?R:T,Qe.visible=!mt,Qe.rotation.y=ie*.8+Tt,Qe.position.y=.45+Math.sin(ie*2+Tt)*.05,Ce.visible=U.has(qe.id)}),ke.forEach(Ce=>{const{group:St,index:Qe}=Ce,qe=Ul(Ce,N.elapsedMs||0);if(!qe)return;const Tt=St.userData.tile;Tt&&(Tt.x!==qe.x||Tt.y!==qe.y)&&(St.rotation.y=Math.atan2(Tt.x-qe.x,Tt.y-qe.y)),St.userData.tile=qe,St.position.set(qe.x,Qe?Math.sin(ie*1.8)*.07:0,qe.y)}),dt.material=(it=N.clues)!=null&&it.includes("route")?S:R,te.rotation.x=N.treasureCollected?-.65:0,Ne.glow.material.opacity=((Bt=N.seals)==null?void 0:Bt.length)>=3&&Object.keys(N.answers||{}).length===((Nn=N.order)==null?void 0:Nn.length)?.8:.3;const Et=["capture","review","review-feedback"].includes(N.phase);ee.visible=Et,ee.position.set(re.x,0,re.y),N.phase==="capture"&&!J&&(ee.position.y=Math.max(0,1.6-(N.captureMs??0)/900));const pt=Te.clone();pt.x=Qr.clamp(pt.x,2.8,Vt[0].length-3.8),pt.z=Qr.clamp(pt.z,2.8,Vt.length-3.8),!ft||J?(o.copy(pt),ft=!0):o.lerp(pt,1-Math.exp(-8*xe)),i.position.set(o.x+3.8,12,o.z+7.8),i.lookAt(o.x,0,o.z),t.updateMatrixWorld(),e.render(t,i)}function Pi(N,W){const J=n.getBoundingClientRect();return r.setFromCamera(new Je((N-J.left)/J.width*2-1,-(W-J.top)/J.height*2+1),i),r.ray.intersectPlane(s,a)?{x:Math.round(a.x),y:Math.round(a.z)}:null}function Kr(){for(const N of c)N.dispose();e.dispose()}return Kn(),{render:jr,resize:Kn,cellFromPointer:Pi,dispose:Kr,getView:()=>d}}(function(n){const e={easy:1,medium:1.5,hard:2},t=d=>d&&Object.hasOwn(e,d.difficulty)?e[d.difficulty]:e.medium,i=d=>Number.isFinite(d)?Math.min(1,Math.max(0,d)):0;function r(d,p){const x=d||[],y=p||{},m=x.reduce((R,T)=>R+t(T),0);if(!m)return{earned:0,pending:0,max:100,percent:0};let h=0,S=0;for(const R of x){const T=t(R)/m*100;R.type==="open"?S+=T:h+=i(y[R.id])*T}h=Math.round(h),S=Math.round(S);const E=100-S,A=E>0?Math.min(100,Math.round(h/E*100)):0;return{earned:h,pending:S,max:100,percent:A}}function s(d){return d>=90?3:d>=75?2:d>=50?1:0}function a(d){return d>=90?"great":d>=50?"ok":"low"}function o(d,p=Math.random){const x=d.slice();for(let y=x.length-1;y>0;y--){const m=Math.floor(p()*(y+1));[x[y],x[m]]=[x[m],x[y]]}return x}function l(d,p=Math.random){const x=o(d.choices.map((y,m)=>m),p);return{...d,choices:x.map(y=>d.choices[y]),correct:x.indexOf(d.correct),order:x}}function c(d,p){const x=p||{};return d.filter(y=>y.type!=="open"&&!(i(x[y.id])>=1))}function f(d,p,x,y=3){const m=d.slice();return m.splice(Math.min(p+1+y,d.length),0,{...x,reask:!0}),m}function u(d){return d>0&&d%3===0}n.QuizCore={WEIGHT:e,scoreQuiz:r,starsFor:s,feedbackTier:a,shuffled:o,shuffleChoices:l,missedQuestions:c,scheduleReask:f,streakCelebrates:u}})(globalThis);const Tl=2.7,Yi=12,xu=n=>n&&Number.isInteger(n.x)&&Number.isInteger(n.y),Mx=(n,e)=>n.x===e.x&&n.y===e.y;function kr(n){if(!xu(n))throw new TypeError("Movement needs an integer player tile");return{position:{...n},origin:{...n},target:null,speed:0,heading:0,moving:!1,elapsed:0}}function yx(n,e){return Mx(n.origin,e)?n:{...kr(e),heading:n.heading}}function bx(n,e){let t=e.nextCell;if(e.direction){const{dx:i,dy:r}=e.direction;if(!Number.isInteger(i)||!Number.isInteger(r)||Math.abs(i)+Math.abs(r)!==1)return null;t={x:n.origin.x+i,y:n.origin.y+r}}return!xu(t)||Math.abs(t.x-n.origin.x)+Math.abs(t.y-n.origin.y)!==1||typeof e.canWalk!="function"||!e.canWalk(t.x,t.y)?null:{x:t.x,y:t.y}}function Sx(n,e,t,i){const r=Math.max(Yi,e**2/(2*n)),s=i?Tl:Math.min(Tl,Math.sqrt((2*n+e**2/Yi)/(1/Yi+1/r))),a=Math.max(0,(s-e)/Yi),o=(e+s)*a/2,l=i?0:s**2/(2*r),c=Math.max(0,(n-o-l)/s),f=i?0:s/r;if(t>=a+c+f-1e-10)return{distance:n,speed:i?s:0,arrived:!0};let u=0,d=e;const p=Math.min(t,a);u+=e*p+Yi*p**2/2,d+=Yi*p,t-=p;const x=Math.min(t,c);return u+=s*x,t-=x,t>0&&(u+=s*t-r*t**2/2,d=s-r*t),{distance:u,speed:d,arrived:!1}}function Ex(n,e={}){const t={movement:n,arrived:null};if(e.paused||!Number.isFinite(e.dt)||e.dt<=0)return t;const i=Math.min(e.dt,.1),r=n.target||bx(n,e);if(!r)return n.speed?{movement:{...n,speed:0},arrived:null}:t;const s=r.x-n.origin.x,a=r.y-n.origin.y,o=Math.atan2(-s,-a),l=Math.atan2(Math.sin(o-n.heading),Math.cos(o-n.heading)),c=n.heading+l*(1-Math.exp(-14*i)),f=Math.abs(n.position.x-n.origin.x)+Math.abs(n.position.y-n.origin.y),u=!e.direction||e.direction.dx===s&&e.direction.dy===a,d=e.continuous===!0&&u&&typeof e.canWalk=="function"&&e.canWalk(r.x+s,r.y+a),p=Sx(1-f,n.speed,i,d),x=Math.min(1,f+p.distance);return p.arrived?{movement:{position:{...r},origin:{...r},target:null,speed:p.speed,heading:c,moving:!1,elapsed:0},arrived:{...r,dx:s,dy:a}}:{movement:{...n,position:{x:n.origin.x+s*x,y:n.origin.y+a*x},target:r,speed:p.speed,heading:c,moving:!0,elapsed:n.elapsed+i},arrived:null}}const Tx=Object.freeze(["look-left","look-center","look-right","lantern","rattle","inspect"]),gu=Object.freeze({"look-left":"מבט שמאלה","look-center":"מבט קדימה","look-right":"מבט ימינה",lantern:"הרמה / הורדה של הפנס",rattle:"ניעור הסורגים",inspect:"בדיקת המנעול"}),Ax=new Set(["question","feedback","capture","review","review-feedback"]),Al=.42,wl=.21,wx=480;function ec(){return{lookYaw:0,lanternRaised:!1,rattleMs:0,lockInspected:!1,notice:""}}function _u(n,e,t={}){const i=typeof e=="string"?e:e==null?void 0:e.type;if(i==="reset")return ec();if(t.paused||!Ax.has(t.phase))return n;if(i==="tick"){const l=e.ms??e.dt;return!Number.isFinite(l)||l<=0||n.rattleMs===0?n:{...n,rattleMs:t.reducedMotion?0:Math.max(0,n.rattleMs-l)}}if(!Tx.includes(i))return n;if(i.startsWith("look-")){const l=i==="look-center"?0:Math.max(-Al,Math.min(Al,n.lookYaw+(i==="look-left"?wl:-wl)));return{...n,lookYaw:l,notice:gu[i]}}if(i==="lantern"){const l=!n.lanternRaised;return{...n,lanternRaised:l,notice:l?"הפנס מורם ומאיר את הסורגים והמנעול.":"הפנס הונמך."}}if(i==="rattle")return{...n,rattleMs:t.reducedMotion?0:wx,notice:"הסורגים חזקים. השומר שמע את הרעש והביט לכאן. השאלות הן הדרך החוצה."};const r=Math.max(0,Math.floor(Number(t.total)||0)),s=Math.min(r,Math.max(0,Math.floor(Number(t.answered)||0))),a=Math.max(1,Math.floor(Number(t.reviewIndex)||0)+1),o=t.phase==="capture"?"המנעול סגור. שלבי החילוץ ייפתחו מיד; אפשר לדלג על סצנת הלכידה.":t.phase.startsWith("review")?`המנעול מחכה לשלב חילוץ ${a}. ממשיכים דרך שאלות החזרה.`:`נענו ${s} מתוך ${r} שאלות. המנעול ייפתח בסיום שאלות המלכודת.`;return{...n,lockInspected:!0,notice:o}}const Rx=new Map(ks.quizzes.flatMap(n=>n.questions).map(n=>[n.id,n])),vu={"questions-01":{context:"רוצים לברר את זמן הקמת הגינה בבית הספר.",prompt:"באיזו מילת שאלה נשתמש?"},"questions-02":{context:"רוצים לברר את מספר הכיתות שהשתתפו בהקמת הגינה.",prompt:"באיזו מילת שאלה נשתמש?"},"questions-03":{context:"התלמידים קראו על צמחים לפני השתילה.",prompt:"איזו מילת שאלה מבקשת סיבה?"},"questions-04":{context:"תלמידים הקימו גינה בבית הספר.",prompt:"איזו מילת שאלה מבקשת מקום?"},"questions-05":{context:"שלוש כיתות חילקו ביניהן את ימי ההשקיה.",prompt:"איזו מילת שאלה מבקשת דרך פעולה?"},"questions-06":{context:"עלתה הצעה להוסיף פרחים לגינה.",prompt:"איזו מילת שאלה מבקשת לזהות אדם?"},"instructions-01":{context:"ההוראה: ״העתיקו מהטקסט עובדה״.",prompt:"מה צריך לעשות?"},"instructions-02":{context:"ההוראה: ״נמקו״.",prompt:"מה צריך להוסיף לתשובה?"},"instructions-03":{context:"ההוראה: ״ציינו״.",prompt:"איזו תשובה מתאימה?"},"instructions-04":{context:"ההוראה: ״הסבירו״.",prompt:"מה צריך לעשות?"},"instructions-05":{context:"ההוראה: ״נסחו שאלה מלאה״.",prompt:"איזו תשובה מקיימת את ההוראה?"},"instructions-06":{context:"ההוראה: ״הביעו את דעתכם וכתבו נימוק״.",prompt:"מה צריך לכתוב?"},"physics-pole-01":{context:"מודדים גובה עמוד בעזרת גליל חלול ומשולש ישר־זווית ושווה־שוקיים.",prompt:"באיזו זווית לאופק מכוונים לראש העמוד?"},"physics-pole-02":{context:"מביטים לראש עמוד בזווית 45° לאופק, על קרקע אופקית.",prompt:"מה שווה למרחק האופקי לעמוד?"},"physics-pole-03":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 6 מ׳. גובה העיניים: 1.4 מ׳.",prompt:"מה גובה העמוד?"},"physics-pole-04":{context:"מודדים גובה עמוד בעזרת גליל המכוון לראשו ב־45° לאופק.",prompt:"איזה מרחק מודדים לצורך החישוב?"},"physics-pole-05":{context:"מביטים לראש עמוד ב־45° לאופק, על קרקע אופקית.",prompt:"איזה גובה מוסיפים למרחק האופקי?"},"physics-pole-06":{context:"מביטים לראש עמוד ב־45°. מחשבים את גובהו ממרחק אופקי וגובה העיניים.",prompt:"איזה תנאי קרקע נדרש לחישוב?"},"physics-pole-07":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי: 4 מ׳. גובה העיניים: 1.5 מ׳.",prompt:"מה גובה העמוד?"},"physics-pole-08":{context:"למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.",prompt:"מה צריך לראות דרך הגליל?"},"physics-pole-09":{context:"למדידת גובה עמוד נעזרים בגליל חלול, במשולש 45° ובסרט מדידה.",prompt:"מה תפקיד המשולש?"},"physics-pole-10":{context:"מביטים לראש עמוד ב־45°, על קרקע אופקית. המרחק האופקי לעמוד: 5 מ׳.",prompt:"מה גובה ראש העמוד מעל העיניים?"},"physics-pole-11":{context:"מודדים מרחק אופקי לעמוד וגובה עיניים, ואז מחשבים את גובה העמוד.",prompt:"למה זו מדידה עקיפה?"}};for(const n of ks.quizzes.find(e=>e.id==="facts").questions)vu[n.id]={context:n.prompt.slice(0,-7),prompt:"עובדה או דעה?"};function Cx(n,e){var t,i;return e&&n.prompt===e.prompt&&n.correct===e.correct&&JSON.stringify(n.choices)===JSON.stringify(e.choices)&&((t=n.ref)==null?void 0:t.id)===e.ref.id&&((i=n.ref)==null?void 0:i.part)===e.ref.part}function Px(n){const e={prompt:typeof(n==null?void 0:n.prompt)=="string"?n.prompt:"",context:"",sourceLabel:"",adapted:!1},t=Rx.get(n==null?void 0:n.id);if(!Cx(n,t))return e;const i=vu[n.id],r=n.ref.id==="garden-passage"?"הגינה בבית הספר":`מדידות · ${n.ref.part}`;return{...e,...i,sourceLabel:r,adapted:!!i}}const Dx=1.65,Rl=2.35,Lx=12e3,Ix=3400,Ux=new Set(["human","fox","rabbit","owl"]);function Mu(){return{clockMs:0,sequence:0,nearby:{},lastSpoken:{},active:null}}function Nx(n,e){return n.id==="scout"?"היי! אני אורי. צריכים עזרה למצוא דרך?":n.id==="keeper"?"שלום! אני מיה. ברוכים הבאים לגן.":n.id==="fox"?e!=null&&e.foxFollowing?"השועל מכשכש בזנב ומתקרב אליכם.":e!=null&&e.waterFilled?"השועל מרים את ראשו ומרחרח לשלום.":"השועל מרים אוזניים ומרחרח לעברכם.":n.id==="rabbit"?e!=null&&e.rabbitCalm?"הארנב מזהה אתכם ומציץ מבין השיחים.":"הארנב מזקיף אוזניים ומביט בכם.":"הוּ־הוּ! הינשוף מסובב אליכם את ראשו."}function Fx(n,{dt:e=0,player:t,world:i,elapsedMs:r=0,phase:s="explore",paused:a=!1}={}){if(s!=="explore")return n.active?{...n,active:null}:n;if(a||!t||!Number.isFinite(t.x)||!Number.isFinite(t.y)||!Number.isFinite(e)||e<0)return n;const o=Math.min(e,6e4),l=n.clockMs+o,c={...n,clockMs:l,nearby:{...n.nearby},lastSpoken:{...n.lastSpoken}};if(c.active=n.active&&n.active.remainingMs>o?{...n.active,remainingMs:n.active.remainingMs-o}:null,c.active){const u=Dn.find(p=>p.id===c.active.entityId),d=Si(u,r,i);Math.abs(d.x-t.x)+Math.abs(d.y-t.y)>=Rl&&(c.active=null)}const f=[];for(const u of Dn.filter(d=>Ux.has(d.kind))){const d=Si(u,r,i),p=Math.abs(d.x-t.x)+Math.abs(d.y-t.y);p>=Rl?c.nearby[u.id]=!1:p<=Dx&&!n.nearby[u.id]&&(c.nearby[u.id]=!0,(n.lastSpoken[u.id]===void 0||l-n.lastSpoken[u.id]>=Lx)&&(f.push({entity:u,distance:p}),c.nearby[u.id]=!1))}if(!c.active&&f.length){const{entity:u}=f.sort((d,p)=>d.distance-p.distance)[0];c.sequence++,c.nearby[u.id]=!0,c.lastSpoken[u.id]=l,c.active={entityId:u.id,kind:u.kind,name:u.name,text:Nx(u,i),sequence:c.sequence,remainingMs:Ix}}return c}const Ae=n=>document.getElementById(n),tc="prepx-shadow-maze-session-v1",Vr=matchMedia("(prefers-reduced-motion: reduce)"),Gt=Ae("game-dialog");let vt,B,Wt,wt=!1,Xt=null,So=null,lr=!1,wi=!0,$t=[],wa=0,Cr=null,Ra=0,We=null,vn=null,Qi=null,Us=!1,Ki=[],Mn=ec(),Ns=Mu(),Ot=null;const nc=900,qs=new Set(["question","feedback","capture","review","review-feedback"]),jn=new Set,Ts=new Map;function Xr(){Ts.clear(),Qi=null}const xr=()=>Ei(vt.questions),ic=()=>wt&&(B==null?void 0:B.phase)==="explore"&&!B.paused&&!Xt?Ns.active:null;function yu(){const n=ic(),e=Ae("nearby-greeting");e.hidden=!n,n&&e.dataset.sequence!==String(n.sequence)&&(Ae("greeting-name").textContent=n.name,Ae("greeting-text").textContent=n.text,e.dataset.sequence=String(n.sequence))}const Ys=()=>({intro:!wt,reducedMotion:Vr.matches,encounters:xr(),interaction:Mn,guidePath:Ki,greeting:ic(),trapEntry:Ot?1-Ot.remaining/nc:null,movement:We?{x:We.position.x,y:We.position.y,speed:We.speed,heading:We.heading,moving:We.moving||We.speed>0}:void 0});function bu(){var e;const n=B.assignments[B.activeEncounter]||[];return{phase:B.phase,paused:B.paused,reducedMotion:Vr.matches,reviewIndex:((e=B.review)==null?void 0:e.index)||0,answered:n.filter(t=>B.answers[t]).length,total:n.length}}function Ox(){return`<details class="cell-tools" id="cell-tools"><summary>לבדוק את הכלוב</summary><div class="cell-controls" aria-label="פעולות בתוך הכלוב">${["look-left","look-right","lantern","rattle","inspect"].map(n=>`<button type="button" data-cell-action="${n}" aria-label="${er(gu[n])}"${n==="lantern"?` aria-pressed="${Mn.lanternRaised}"`:""}>${er({"look-left":"שמאלה","look-right":"ימינה",lantern:"פנס",rattle:"סורגים",inspect:"מנעול"}[n])}</button>`).join("")}</div><p id="cell-notice" class="cell-notice" role="status">${er(Mn.notice||"בחרו פעולה כדי להסתכל סביב.")}</p></details>`}function Bx(n){var e;B.phase==="feedback"&&(lr=!0,qr(),Ae("read-feedback")&&(Ae("read-feedback").textContent="המעבר נעצר בזמן שבודקים את הכלוב.")),Mn=_u(Mn,n,bu()),Ae("cell-notice")&&(Ae("cell-notice").textContent=Mn.notice),(e=document.querySelector('[data-cell-action="lantern"]'))==null||e.setAttribute("aria-pressed",String(Mn.lanternRaised)),Wt==null||Wt.render(B,Ys())}const Su={up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]},er=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function zx(n){const e=document.createElement("template");return e.innerHTML=String(n??""),e.content.textContent||""}const Ht=n=>er(zx(n));function kx(n){try{const e=new URL(n==null?void 0:n.url,new URL("../../",location.href));return["http:","https:"].includes(e.protocol)?e.href:null}catch{return null}}function Eu(n){var r,s;const e=n==null?void 0:n.reference,t=Ht([(e==null?void 0:e.title)||((r=n==null?void 0:n.ref)==null?void 0:r.id),(e==null?void 0:e.part)||((s=n==null?void 0:n.ref)==null?void 0:s.part)].filter(Boolean).join(" · ")),i=kx(e);return t?`<div class="reference">מקור: ${i?`<a href="${er(i)}" target="_blank" rel="noopener noreferrer">${t} ↗</a>`:t}</div>`:""}function Eo(n){var e,t;return`<p class="explanation">${Ht(((e=n==null?void 0:n.explanation)==null?void 0:e.he)||"")}</p>${(t=n==null?void 0:n.explanation)!=null&&t.en?`<p class="small-note" dir="ltr">${Ht(n.explanation.en)}</p>`:""}${Eu(n)}`}const To="ההתקדמות אינה נשמרת בדפדפן הזה. אפשר להמשיך עכשיו, אבל יציאה או רענון עלולים לאבד אותה.";function rc(){wi=!1,Ae("storage-warning").hidden=!1;const n=document.querySelector(".privacy");if(n&&(n.textContent=To+" אין שליחת תשובות או שם."),Ae("encounter-menu")&&(Ae("encounter-menu").textContent="השהיה או יציאה · ללא שמירה"),Gt.open&&!document.querySelector(".dialog-save-warning")){const e=document.createElement("p");e.className="dialog-save-warning",e.setAttribute("role","status"),e.textContent=To,Ae("dialog-content").prepend(e)}}function $s(){if(!(!vt||!B||!wi))try{sessionStorage.setItem(tc,JSON.stringify({content:vt,state:B}))}catch{rc()}}function qr(){clearTimeout(So),So=null}function Tn(n){var r,s;if(!B)return;const e=zl(B,n,vt.questions);if(e===B)return;const t=B.phase,i=(r=Xn(B,vt.questions))==null?void 0:r.id;B=e,We&&(We=yx(We,B.player)),B.phase!=="explore"&&(jn.clear(),Xr(),vn=null,Us=!1,We&&(We={...kr(B.player),heading:We.heading})),t==="explore"&&qs.has(B.phase)&&(Mn=ec()),t==="explore"&&B.phase==="question"&&!Vr.matches&&(Ot={remaining:nc,encounter:B.activeEncounter}),B.phase!=="question"&&(Ot=null),(n.type!=="tick"||B.phase!==t)&&$s(),B.phase!=="explore"&&($t=[]),(t!==B.phase||i!==((s=Xn(B,vt.questions))==null?void 0:s.id)||n.type!=="tick")&&(qr(),Ri())}function Tu(){Gt.open&&Gt.close(),Cr!=null&&Cr.isConnected&&Cr.focus({preventScroll:!0})}function yn(n,e="button"){const t=qs.has(B.phase)&&!Xt;Gt.classList.toggle("cell-sheet",t),Gt.classList.toggle("trap-entry",t&&!!Ot);const i=wi?"":`<p class="dialog-save-warning" role="status">${To}</p>`,r=wt&&!Xt&&B.phase!=="complete"?`<button id="encounter-menu" class="reading-button">${Ot?"השהיה":`השהיה או יציאה · ${wi?"ההתקדמות נשמרת":"ללא שמירה"}`}</button>`:"";Ae("dialog-content").innerHTML=i+n+(t&&!Ot?Ox():"")+r,fn("encounter-menu",()=>ui("pause")),document.querySelectorAll("[data-cell-action]").forEach(s=>s.addEventListener("click",()=>Bx(s.dataset.cellAction))),document.querySelectorAll(".cell-tools,.feedback-explanation").forEach(s=>s.addEventListener("toggle",()=>{s.open&&B.phase==="feedback"&&(lr=!0,qr())})),Gt.open||(Cr=document.activeElement,Gt.showModal()),Gt.scrollTop=0,queueMicrotask(()=>{var s;return(s=Ae("dialog-content").querySelector("#skip-trap-entry,[data-choice],#continue-button,#skip-capture,#guided-continue,#close-panel,#resume-button"))==null?void 0:s.focus({preventScroll:!0})})}const Rn=(n,e,t=!0)=>`<button id="${n}" class="button ${t?"primary":""}">${e}</button>`,bn=(n,e)=>`<div class="dialog-kicker"><span>${n}</span><span>מבוך הצללים</span></div>${e?`<h2 id="dialog-title">${e}</h2>`:""}`;function fn(n,e){var t;(t=Ae(n))==null||t.addEventListener("click",e)}function Cl(){lr=!1,Tn({type:"continue"})}function Au(){Ot=null,Ri(),Wt==null||Wt.render(B,Ys())}function Vx(){const n=xr().find(e=>e.id===B.activeEncounter);yn(bn("מלכודת הופעלה",Ht((n==null?void 0:n.title)||"הכלוב נסגר"))+'<p class="trap-entry-message">השער נסגר. עונים ומשתחררים.</p>'+Rn("skip-trap-entry","לשאלות ←")),fn("skip-trap-entry",Au)}function Gx(){var o;const n=B.phase.startsWith("review"),e=Xn(B,vt.questions);if(n&&((o=B.review)!=null&&o.guided)){yn(bn("חדר ההיחלצות","הדרך החוצה פתוחה")+"<p>הרימו את הידית. ההתקדמות נשמרת.</p>"+Rn("guided-continue","לפתוח ולהשתחרר")),fn("guided-continue",()=>Tn({type:"guided-continue"}));return}if(!e){yn(bn("אפשר להמשיך","חומר התרגול אינו זמין")+'<p>אפשר לחזור לעמוד הבית. ההתקדמות התקינה נשמרה בלשונית הזו.</p><a class="dialog-link" href="/index.html">חזרה ל־PrepX</a>');return}const t=xr().find(l=>l.id===B.activeEncounter),i=B.assignments[B.activeEncounter]||[],r=i.filter(l=>B.answers[l]).length,s=Px(e),a=n&&B.review.hint?`<p class="explanation">רמז: ${Ht(e.explanation.he)}</p>`:"";yn(bn(n?`חדר ההיחלצות · שלב ${B.review.index+1} מתוך 2`:`${Ht(t==null?void 0:t.title)} · שאלה ${r+1} מתוך ${i.length}`,"")+(s.context?`<p class="question-context" id="question-context">${Ht(s.context)}</p>`:"")+`<h2 id="dialog-title">${Ht(s.prompt)}</h2>`+(n?'<p class="small-note">חזרה עם רמזים · בלי איבוד לבבות</p>':"")+a+`<div class="answers">${e.options.map((l,c)=>`<button class="answer" data-choice="${l.original}"><span class="answer-index">${c+1}</span><span>${Ht(l.text)}</span></button>`).join("")}</div><details class="question-source" id="question-source"><summary>מקור השאלה</summary>${Eu(e)}</details>`),document.querySelectorAll("[data-choice]").forEach(l=>l.addEventListener("click",()=>{["question","review"].includes(B.phase)&&(lr=!1,Tn({type:n?"review-answer":"answer",choice:Number(l.dataset.choice)}))}))}function Hx(){var o;const n=B.phase==="review-feedback",e=Xn(B,vt.questions),t=n?B.review.correct:(o=B.lastAnswer)==null?void 0:o.correct,i=n&&!t&&B.review.wrong>=2,r=t?n?"השרשרת משתחררת!":"תשובה נכונה!":n?"יש עוד דרך לפתור":"תשובה לא נכונה",s=t?n?"עוד שרשרת השתחררה.":"+10 מטבעות":n?"מנסים שוב עם רמז.":"לב אחד ירד · ממשיכים מכאן",a=e?`<p>התשובה הנכונה: <strong>${Ht(e.choices[e.correct])}</strong></p>`:"";yn(bn(n?"חדר ההיחלצות":"תוצאת המלכודת","")+`<div class="feedback-label"><span class="feedback-mark ${t?"":"wrong"}" aria-hidden="true">${t?"✓":"↘"}</span><h2 id="dialog-title">${r}</h2></div><p>${s}</p>`+(i||!n||t?a:"")+(n?Eo(e):`<details class="feedback-explanation" id="feedback-explanation"><summary>למה זו התשובה?</summary>${Eo(e)}</details>`)+`<div class="dialog-actions">${Rn("continue-button",i?"הבנתי, לשחרר את השרשרת":n&&!t?"לנסות עם רמז":n?"לשלב הבא":"להמשיך בדרך")}</div>`+(n?"":'<button id="read-feedback" class="reading-button">לעצור ולקרוא</button>')),fn("continue-button",Cl),fn("read-feedback",()=>{lr=!0,qr(),Ae("feedback-explanation").open=!0,Ae("read-feedback").textContent="המעבר נעצר"}),!n&&!lr&&(So=setTimeout(()=>{B.phase==="feedback"&&!B.paused&&!Xt&&Cl()},1500))}function Wx(){yn(bn("נתפסתם","שתי שרשראות. דרך אחת החוצה.")+"<p>שתי שאלות עם רמזים ישחררו אתכם. ההתקדמות נשמרת.</p>"+Rn("skip-capture","להשתחרר עם רמזים")),fn("skip-capture",()=>Tn({type:"skip-capture"}))}function wu(n=!1){var r;const e=nr(B,vt.questions),t=((r=globalThis.QuizCore)==null?void 0:r.starsFor(e.score))||0,i=vt.questions.filter(s=>B.answers[s.id]).map(s=>`<div class="review-item"><strong>${B.answers[s.id].correct?"✓":"↘"} ${Ht(s.prompt)}</strong><p>התשובה שלכם: ${Ht(s.choices[B.answers[s.id].choice])}</p><p>התשובה הנכונה: ${Ht(s.choices[s.correct])}</p>${Eo(s)}</div>`).join("");yn(bn("השער פתוח","יצאתם ממבוך הצללים!")+`<p>כל שלושת החותמים שלכם. גם דרך עם טעויות מובילה החוצה.</p><div class="result-grid"><div><strong>${e.score}</strong><small>ציון ידע מתוך 100</small></div><div><strong>${B.coins}</strong><small>מטבעות משחק</small></div><div><strong>${B.captureCount}</strong><small>היחלצויות</small></div></div><p class="small-note">${"★".repeat(t)}${"☆".repeat(3-t)} · הציון מבוסס על התשובות הראשונות בלבד. החזרה בחדר ההיחלצות אינה משנה אותו.</p>`+(n?i:Rn("review-result","לעבור על התשובות",!1))+'<a class="dialog-link" href="/index.html">בחזרה ל־PrepX · לבחור הרפתקה אחרת</a>'),fn("review-result",()=>wu(!0))}function ui(n){!wt||B.phase==="complete"||(qr(),$t=[],jn.clear(),Xr(),vn=null,Xt=n,Tn({type:"pause"}),Ri())}function Pr(){Xt=null,Tn({type:"resume"}),Ri()}function Pl(){if(Xt==="map"){const n=Vt.map((e,t)=>[...e].map((i,r)=>{const s=r===B.player.x&&t===B.player.y,a=xr().find(c=>c.x===r&&c.y===t),o=Dn.find(c=>{const f=Si(c,B.elapsedMs,B.world);return Math.round(f.x)===r&&Math.round(f.y)===t}),l=s?"●":o?o.kind==="human"?"♟":"·":a?B.resolved.includes(a.id)?"✓":"✧":r===tr.x&&t===tr.y?"↗":i==="S"?"⌂":"";return`<span class="map-cell ${i==="#"?"wall":""} ${B.visited.includes(`${r},${t}`)?"visited":""} ${a?"seal":""} ${s?"player":""}" aria-hidden="true">${l}</span>`}).join("")).join("");yn(bn("מפה · הזמן נעצר","מצאו את הדרך שלכם")+`<div class="map-grid" style="grid-template-columns:repeat(${Vt[0].length},1fr);aspect-ratio:${Vt[0].length}/${Vt.length}" role="img" aria-label="מפת המבוך. נקודה מסמנת אתכם, כוכב מסמן מלכודת, חץ מסמן יציאה.">${n}</div><p class="map-legend">● אתם כאן · ✧ מלכודת · ✓ הושלמה · ♟ דמות · ↗ יציאה<br>הגן המזרחי והחורבות בדרום מחוברים למבוך בכמה מעברים. חפשו דמויות, חיות ומשאבת מים.</p>`+Rn("close-panel","חזרה למבוך")),fn("close-panel",Pr)}else if(Xt==="world"){const n=B.world.dialogue,e=(n==null?void 0:n.entityId)==="scout";yn(bn(e?"מפגש עם סייר השבילים":"מפגש בגן",Ht((n==null?void 0:n.title)||"אורח בשביל"))+`<p>${Ht((n==null?void 0:n.text)||"יש עוד הרבה לגלות בין השבילים.")}</p><p class="small-note" id="world-topic-text">אפשר לעצור, לשאול ולהכיר את המקום. אין כאן שאלת מבחן.</p><div class="dialog-actions">${Rn("world-topic","מה עוד יש באזור?",!1)}${Rn("close-panel","להמשיך לחקור")}</div>`),fn("close-panel",Pr),fn("world-topic",()=>{Ae("world-topic-text").textContent=e?"השביל המואר מוביל למלכודת שטרם סיימתם. בגן המזרחי תמצאו שומרת, משאבה ובעלי חיים. המעברים הדרומיים חוזרים לחצר — אין צורך להתחיל מחדש.":"כשממלאים את קערת המים, השועל מגיע לשתות. אפשר להתקרב אליו ולהציע לו ללכת איתכם. בחורבות מחכה ינשוף, ובין השיחים מסתתר ארנב."})}else Xt==="journal"?(yn(bn("יומן הדרך · הזמן נעצר","רמזים שנשארים איתכם")+`<ul class="hint-list"><li>מצאו את המלכודות המסומנות בחותם זוהר. בכל אחת עד שלוש שאלות.</li><li>השלמת השאלות נותנת חותם, גם אחרי טעות.</li><li>כדי להשתחרר מכלוב, אפשר להיעזר ברמזים. אחרי שתי טעויות תקבלו פתרון מודרך.</li>${B.clues.length?"<li>החריטה שגיליתם: שלושה חותמים פותחים את השער. לא צריך לענות נכון על הכול.</li>":"<li>חפשו חריטה מוארת על קיר המבוך.</li>"}${B.treasureCollected?"<li>גיליתם את חדר האוצר הסודי!</li>":""}<li>מפגשים בגנים ובחורבות: ${Object.keys(B.world.interactions).length} מתוך ${Dn.length}.</li>${B.world.scoutGuided?"<li>הסייר סימן את הדרך למלכודת הקרובה שטרם הושלמה.</li>":""}${B.world.waterFilled?"<li>מילאתם את קערת המים בגן.</li>":""}${B.world.foxFollowing?"<li>השועל מכיר אתכם ומלווה אתכם בשביל.</li>":""}</ul>`+Rn("close-panel","חזרה להרפתקה")),fn("close-panel",Pr)):(yn(bn("המשחק בהשהיה","הדרך תחכה לכם")+`<p>${wi?"ההתקדמות נשמרת בלשונית הזו.":"ההתקדמות אינה נשמרת. הישארו בלשונית הזו כדי להמשיך."} הלבבות, היצורים והמלכודות מחכים עד שתחזרו.</p><p class="small-note">תנועה: החצים או WASD. אפשר ללחוץ על שביל. E לבדיקה מקרוב. F למסך מלא.</p>`+Rn("resume-button","להמשיך מאותו מקום")+`<a class="dialog-link" href="/index.html">חזרה ל־PrepX · ${wi?"ההתקדמות תישמר":"ללא שמירה"}</a>`),fn("resume-button",Pr))}function Ri(){if(!B)return;yu();const n=wt&&qs.has(B.phase);document.body.dataset.encounter=String(n),Ae("maze-canvas").setAttribute("aria-label",n?"מבט מגוף ראשון בתוך כלוב. מעבר לסורגים עומד השומר. השתמשו בכפתורי הכלוב כדי להביט, להאיר ולבדוק.":"מבוך תלת־ממדי. תנועה עם החצים או WASD, או לחיצה על שביל."),Ae("hearts").textContent=Array.from({length:3},(t,i)=>i<B.hearts?"♥":"♡").join(" "),Ae("hearts").setAttribute("aria-label",`${B.hearts} לבבות מתוך 3`),Ae("coins").textContent=B.coins,Ae("seals").textContent=`${B.seals.length} / 3`,Ae("offline-badge").hidden=!vt.offline;const e=nr(B,vt.questions);if(Ki=[],B.world.scoutGuided)for(const t of xr().filter(i=>!B.resolved.includes(i.id))){const i=ws(B.player,t);i&&(!Ki.length||i.length<Ki.length)&&(Ki=i)}if(Ae("location-label").textContent=n?"בתוך הכלוב · מבט מגוף ראשון":e.complete?"שער היציאה מחכה":"מסדרונות הצללים",Ae("objective-text").textContent=e.complete?"סיימתם את המלכודות. מצאו את השער הזוהר.":`מלכודות ${e.trapsResolved} מתוך ${e.trapsTotal} · ${e.answered} מתוך ${e.total} שאלות`,Ae("notice").textContent=B.notice||`מפגשים בעולם: ${Object.keys(B.world.interactions).length} מתוך ${Dn.length}. הסייר מחכה בשבילים, ובגן המזרחי יש עוד דמויות ובעלי חיים.`,document.querySelectorAll("[data-direction],#interact-button").forEach(t=>t.disabled=!wt||B.paused||B.phase!=="explore"),!!wt){if(Xt){Pl();return}if(B.paused){Xt="pause",Pl();return}Ot&&B.phase==="question"?Vx():B.phase==="question"||B.phase==="review"?Gx():B.phase==="feedback"||B.phase==="review-feedback"?Hx():B.phase==="capture"?Wx():B.phase==="complete"?wu():Tu()}}function Ao(n){!wt||Gt.open||Xt||B.phase!=="explore"||Su[n]&&($t=[],vn=n)}function sc(){if(!wt||B.paused||B.phase!=="explore")return;if(We!=null&&We.target){Us=!0,jn.clear(),Xr(),$t=[],vn=null;return}Us=!1;const n=Ro(B.player,B.world,B.elapsedMs);n?(Tn({type:"world-interact",entityId:n.id}),n.kind==="human"&&ui("world")):Tn({type:"interact"})}function Ru(){if(!wt||B.phase!=="explore"||B.paused)return;const n=Ro(B.player,B.world,B.elapsedMs),e=(n==null?void 0:n.actionLabel)||"לבדוק מקרוב";Ae("interact-button").textContent!==e&&(Ae("interact-button").textContent=e)}function Cu(n){var a,o;if(!We||!wt)return;const e=Qi||[...jn].at(-1)||vn,t=e?Su[e]:null,i=We.target;let r=!!(Qi||jn.size);if(!t&&$t.length>1){const l=$t[0],c=$t[1];r=c.x-l.x===l.x-We.origin.x&&c.y-l.y===l.y-We.origin.y}const s=Ex(We,{direction:t?{dx:t[0],dy:t[1]}:void 0,nextCell:t?void 0:$t[0],continuous:r,canWalk:an,paused:B.paused||B.phase!=="explore"||Gt.open,dt:n/1e3});We=s.movement,vn&&(We.target||s.arrived||!an(We.origin.x+((t==null?void 0:t[0])||0),We.origin.y+((t==null?void 0:t[1])||0)))&&(vn=null),s.arrived&&(((a=$t[0])==null?void 0:a.x)===s.arrived.x&&((o=$t[0])==null?void 0:o.y)===s.arrived.y&&$t.shift(),Tn({type:"move",dx:s.arrived.dx,dy:s.arrived.dy}),Us&&sc()),!i&&!We.target&&!s.arrived&&t&&(vn=null),Ru()}function Pu(){!B||!Wt||(Ns=Mu(),Ae("nearby-greeting").removeAttribute("data-sequence"),wt=!0,document.body.dataset.intro="false",Ae("intro").hidden=!0,B.paused&&(B=zl(B,{type:"resume"},vt.questions)),Xt=null,We=kr(B.player),$s(),Ri(),Ru(),Wt.resize(),Ae("maze-canvas").focus({preventScroll:!0}))}Ae("start-button").addEventListener("click",Pu);Ae("pause-button").addEventListener("click",()=>ui("pause"));Ae("map-button").addEventListener("click",()=>ui("map"));Ae("journal-button").addEventListener("click",()=>ui("journal"));Ae("world-map-button").addEventListener("click",()=>ui("map"));Ae("interact-button").addEventListener("click",sc);document.querySelectorAll("[data-direction]").forEach(n=>{n.addEventListener("pointerdown",e=>{e.button!==0||n.disabled||(e.preventDefault(),n.setPointerCapture(e.pointerId),Ts.set(e.pointerId,n.dataset.direction),Qi=n.dataset.direction,Ao(Qi))});for(const e of["pointerup","pointercancel","lostpointercapture"])n.addEventListener(e,t=>{Ts.delete(t.pointerId)&&(Qi=[...Ts.values()].at(-1)||null,e!=="pointerup"&&(vn=null))});n.addEventListener("click",e=>{e.detail===0&&Ao(n.dataset.direction)})});Gt.addEventListener("cancel",n=>{n.preventDefault(),Xt?Pr():B.phase==="explore"&&Tu()});const Fs={ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",ArrowLeft:"left",w:"up",d:"right",s:"down",a:"left"};window.addEventListener("keydown",n=>{var t,i,r;if(n.ctrlKey||n.metaKey||n.altKey)return;const e=Fs[n.key]||Fs[n.key.toLowerCase()];e&&wt&&!Gt.open&&(n.preventDefault(),n.repeat||($t=[],Ao(e),jn.add(e))),n.key==="Escape"&&wt&&!Gt.open&&(n.preventDefault(),ui("pause")),n.key.toLowerCase()==="e"&&wt&&!Gt.open&&sc(),n.key.toLowerCase()==="f"&&wt&&!Gt.open&&(document.fullscreenElement?(t=document.exitFullscreen)==null||t.call(document):(r=(i=document.querySelector(".game-shell")).requestFullscreen)==null||r.call(i).catch(()=>{}))});window.addEventListener("keyup",n=>jn.delete(Fs[n.key]||Fs[n.key.toLowerCase()]));window.addEventListener("blur",()=>{jn.clear(),Xr(),vn=null,$t=[]});document.addEventListener("visibilitychange",()=>{document.hidden&&wt&&!B.paused&&B.phase!=="complete"&&ui("pause")});Ae("maze-canvas").addEventListener("click",n=>{if(!wt||Gt.open||B.phase!=="explore")return;const e=Wt.cellFromPointer(n.clientX,n.clientY);if(e&&an(e.x,e.y)){jn.clear(),Xr(),vn=null;const t=(We==null?void 0:We.target)||B.player;$t=ws(t,e)||[],We!=null&&We.target&&$t.unshift({...We.target})}});function Du(n){!B||!wt||(Ot&&!B.paused&&!Xt&&(Ot.remaining=Math.max(0,Ot.remaining-n),(Ot.remaining===0||Vr.matches)&&Au()),Mn=_u(Mn,{type:"tick",dt:n},bu()),Tn({type:"tick",ms:n,moving:!!(We!=null&&We.target)}),Vr.matches&&B.phase==="capture"&&Tn({type:"skip-capture"}),Ns=Fx(Ns,{dt:n,player:(We==null?void 0:We.position)||B.player,world:B.world,elapsedMs:B.elapsedMs,phase:B.phase,paused:B.paused||!wt}),yu())}window.advanceTime=n=>{for(let e=Math.min(n,6e4);e>0;e-=16.667){const t=Math.min(16.667,e);Cu(t),Du(t)}Wt==null||Wt.render(B,Ys())};window.render_game_to_text=()=>{var n;return JSON.stringify(B?{coordinates:"tile origin upper-left; x right/east, y down/south; directions are world axes",started:wt,phase:B.phase,paused:B.paused,player:B.player,movement:We,greeting:ic(),world:B.world,worldEntities:Dn.map(e=>({...e,position:Si(e,B.elapsedMs,B.world)})),nearbyEntity:((n=Ro(B.player,B.world,B.elapsedMs))==null?void 0:n.id)||null,hearts:B.hearts,coins:B.coins,seals:B.seals,progress:nr(B,vt.questions),activeEncounter:B.activeEncounter,review:B.review,captureCount:B.captureCount,captureMs:B.captureMs,elapsedMs:B.elapsedMs,graceMs:B.graceMs,currentQuestion:Xn(B,vt.questions)?{id:Xn(B,vt.questions).id,options:Xn(B,vt.questions).options}:null,encounters:xr().map(e=>({...e,resolved:B.resolved.includes(e.id),questions:B.assignments[e.id].length,answered:B.assignments[e.id].filter(t=>B.answers[t]).length})),exit:tr,clues:B.clues,treasureCollected:B.treasureCollected,notice:B.notice,source:vt.source,contentVersion:vt.version,storageAvailable:wi,panel:Xt,trapEntry:Ot?{active:!0,elapsedMs:nc-Ot.remaining,remainingMs:Ot.remaining,encounter:Ot.encounter}:null,view:qs.has(B.phase)&&wt?"first-person-cage":"maze",interaction:Mn}:{phase:"loading"})};function Lu(n){const e=wa?Math.min(100,n-wa):0;wa=n,B&&(Cu(e),Du(e),Ra+=e,Ra>1500&&($s(),Ra=0),Wt==null||Wt.render(B,Ys())),requestAnimationFrame(Lu)}function Iu(){We=kr(B.player),Ki=[];const n=Ae("quiz-select");n.innerHTML=Io.map(t=>`<option value="${er(t.id)}">${Ht(t.title)}</option>`).join(""),n.value=vt.id;const e=Object.keys(B.answers).length>0||B.visited.length>1;n.disabled=e,Ae("start-button").textContent=e?"להמשיך מאותו מקום":"להיכנס למבוך ←",Ae("start-button").disabled=!1,n.addEventListener("change",async()=>{n.disabled=!0,Ae("start-button").disabled=!0,Ae("start-button").textContent="טוענים את חומר התרגול…";try{vt=await Uo({quizId:n.value}),B=zs(vt.questions),We=kr(B.player),$s(),Ri(),Ae("start-button").textContent="להיכנס למבוך ←"}catch{Ae("notice").textContent="לא הצלחנו לטעון תרגול. אפשר לנסות שוב או לחזור ל־PrepX."}finally{n.disabled=!1,Ae("start-button").disabled=!1}}),Ri(),requestAnimationFrame(Lu)}async function Xx(n,e){var t;e.disabled=!0;try{const i=await Uo({quizId:Rs});try{const r=tc+"-unrestorable-"+Date.now();if(sessionStorage.setItem(r,n),sessionStorage.getItem(r)!==n)throw new Error("Backup verification failed")}catch{rc()}vt=i,B=zs(vt.questions),Ae("start-button").onclick=null,Ae("quiz-select").hidden=!1,(t=document.querySelector(".recovery-actions"))==null||t.remove(),Iu(),Pu()}catch{e.disabled=!1,Ae("notice").textContent="לא הצלחנו לפתוח הרפתקה נפרדת. השמירה הקודמת נשארה ללא שינוי."}}async function qx(){document.body.dataset.intro="true";try{Wt=vx(Ae("maze-canvas"))}catch{Ae("renderer-error").hidden=!1;return}try{let n=null,e=!1,t=null;try{t=sessionStorage.getItem(tc)}catch{rc()}if(t)try{const i=JSON.parse(t),r=La(i.content,{pinned:!0}),s=Gu(i.state,r.questions);s?n={content:r,state:s}:e=!0}catch{e=!0}if(e){Ae("start-button").textContent="לנסות לשחזר שוב",Ae("start-button").disabled=!1,Ae("notice").textContent="לא הצלחנו לשחזר את ההרפתקה. השמירה הקודמת נשארה ללא שינוי.",Ae("start-button").onclick=()=>location.reload(),Ae("quiz-select").hidden=!0;const i=document.createElement("div");i.className="recovery-actions";const r=document.createElement("button");r.id="new-expedition-button",r.className="button",r.textContent="הרפתקה נפרדת · שמירת העותק הישן",r.addEventListener("click",()=>Xx(t,r)),i.append(r);const s=document.createElement("a");s.className="dialog-link",s.href="/index.html",s.textContent="חזרה ל־PrepX בלי לשנות את השמירה",i.append(s),Ae("start-button").after(i);return}if(n)vt=n.content,B=n.state;else{const i=new URLSearchParams(location.search).get("quiz")||Rs,r=Io.some(s=>s.id===i);vt=await Uo({quizId:r?i:Rs}),B=zs(vt.questions),r||(B.notice="הקישור הפנה לתרגול לא מוכר. בחרנו תרגול זמין; אפשר לבחור אחר לפני הכניסה.")}Iu()}catch{Ae("start-button").textContent="לנסות לטעון שוב",Ae("start-button").disabled=!1,Ae("start-button").onclick=()=>location.reload(),Ae("notice").textContent="חומר התרגול לא נטען. אפשר לנסות שוב בלי לאבד התקדמות."}}qx();
