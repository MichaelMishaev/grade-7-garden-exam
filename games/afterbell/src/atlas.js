import {HOME,landmarks,roads,skyGates} from './territory.js';

export function atlasMap(round){
  const p=round.player;
  const routes=roads.map(r=>`<polyline points="${r.map(v=>v.join(',')).join(' ')}" fill="none" stroke="#b0a27e" stroke-width="1.4"/>`).join('');
  const rings=skyGates.map(([x,z],i)=>`<circle cx="${x}" cy="${z}" r="1.65" fill="${round.skyGates.includes(i)?'#92d4b0':'#edbe66'}"/>`).join('');
  const sites=landmarks.map((s,i)=>`<circle cx="${s.x}" cy="${s.z}" r="5" fill="${s.color}"/><text x="${s.x}" y="${s.z+2.4}" text-anchor="middle" font-size="7" fill="#12242c">${i+1}</text>`).join('');
  return `<rect x="-108" y="-108" width="216" height="216" fill="#243c38"/><ellipse cx="16" cy="-73" rx="82" ry="31" fill="#41485b"/><ellipse cx="-73" cy="28" rx="35" ry="76" fill="#685646"/><path d="M45 -40V91" stroke="#559296" stroke-width="7"/>${routes}${rings}<rect x="-27" y="-27" width="54" height="54" fill="#617063" stroke="#98a88a"/>${sites}<circle cx="${p.x}" cy="${p.z}" r="3.1" stroke="#fff4c7" fill="#ed9855"/>`;
}
export function atlasPage(round){
  const count=round.stones.length;
  return `<h2 id="dialog-title">אטלס השבילים</h2><p class="dialog-copy">חפשו את אבני הדרך. אחרי ביקור ראשון אפשר לחזור אליהן בקפיצה במסילת הכוכבים.</p><svg viewBox="-110 -110 220 220" class="atlas-chart" role="img" aria-label="שלושה חבלי ארץ, השבילים וששת היעדים">${atlasMap(round)}</svg><p class="feedback-note">אבני דרך ${count}/6 · טבעות שמיים ${round.skyGates.length}/${skyGates.length}. קפצו דרך טבעת זהב לקבלת תנופה. בכל אזור שלוש טבעות ושומר רוח שמאט אתכם במגע.</p>${[HOME,...landmarks].map((s,i)=>{
    const known=s===HOME||round.stones.includes(s.id);
    return `<div class="atlas-row"><div><strong>${i?i+' · ':''}${s.name}</strong><small>${s.region||'נקודת המוצא'} · ${Math.round(Math.hypot(round.player.x-s.x,round.player.z-s.z))} צעדים</small></div><button class="secondary" data-walk="${s.id}">הליכה</button>${known&&round.relay?`<button class="secondary" data-travel="${s.id}">מעבר</button>`:''}</div>`;
  }).join('')}<button id="atlas-back" class="text-button">חזרה למסלול המשימה ←</button>`;
}
