// These short role actions are part of the story. Only the PrepX answers affect the score.
import {currentJob,places} from './city-data.js';

export function prepareCargo(city,sheet,onReady,onBack){
 const [from,to,item]=currentJob(city),district=places[to].district;
 let step=0;
 const instructions={
  courier:['הכנת משלוח','הדביקו על הארגז את מדבקת היעד: '+places[to].name+'.'],
  tech:['בדיקת ציוד','חברו את הכבל לשקע, ואז לחצו על מתג הבדיקה כדי להדליק את נורת האישור.'],
  press:['צילום לכתבה','כוונו את המצלמה אל '+places[from].name+' ולחצו על הצמצם.']
 };
 const [title,hint]=instructions[city.role],options=Object.values(places).map(p=>p.name);
 const targets=city.role==='courier'?[places[to].name,...options.filter(n=>n!==places[to].name).slice(-2)]:['חיבור כבל','בדיקת חשמל'];
 if(city.role==='courier')targets.push(targets.shift());
 function render(message=''){
   const body=city.role==='press'
    ?`<div class="viewfinder"><span>⌜</span><strong>${step?places[from].name:'קו הרקיע'}</strong><span>⌟</span></div><div class="tool-row"><button id="lens">לכוון מצלמה ↔</button><button id="shutter">לצלם ◉</button></div>`
    :`<div class="package-tag"><small>${city.role==='courier'?'תעודת משלוח':'ערכת שירות'}</small><strong>${item}</strong><span>${city.role==='courier'?district:step?'● הכבל מחובר':'○ הכבל מנותק'}</span></div><div class="tool-row">${targets.map((v,i)=>`<button data-tool="${i}">${v}</button>`).join('')}</div>`;
   sheet(`<div class="kicker">${places[from].name} · עמדת עבודה</div><h2 id="sheet-title">${title}</h2><p>${hint}</p>${body}<p role="status" id="tool-hint">${message}</p><button id="leave-tool">חזרה לעיר</button>`,'work');
   document.getElementById('leave-tool').onclick=onBack;
   if(city.role==='press'){
     document.getElementById('lens').onclick=()=>{step=1-step;render(step?'היעד במרכז התמונה.':'');};
     document.getElementById('shutter').onclick=()=>{if(step)onReady();else render('היעד עדיין מחוץ לתמונה. כוונו את המצלמה.');};
   }else document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{
     const i=Number(b.dataset.tool);
     if(city.role==='courier'){if(targets[i]===places[to].name)onReady();else render('זו כתובת אחרת. בדקו שוב לאן מיועד המשלוח.');}
     else if(i===0){step=1;render('הכבל מחובר. עכשיו בודקים חשמל.');}
     else if(step)onReady();else render('קודם מחברים את הכבל.');
   });
 }
 render();
}
