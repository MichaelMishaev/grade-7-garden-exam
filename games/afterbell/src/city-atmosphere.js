// Time of day and weather for Bay City, as pure functions of the shift clock (seconds).
// A full day lasts DAY seconds and a shift starts in the morning, so a normal session
// sees daylight first (about four minutes), then sunset, night with lit windows, and sunrise.
export const DAY=600;
const START=8/24; // the shift begins at 08:00 on the game clock
const keys=[
 // hour, sky, fog, sun colour, sun strength, ambient strength, ambient ground, glow (lit windows and lamps)
 [0,'#1d2c52','#243860','#9db1ee',.7,1.2,'#414f72',1],
 [4.5,'#1d2c52','#243860','#9db1ee',.7,1.2,'#414f72',1],
 [6,'#f1b48f','#f0c1a2','#ffb27a',1.5,1.7,'#8d8f95',.4],
 [7.5,'#a8dce2','#b8e1df','#ffe5bf',2.1,2.3,'#819b9a',0],
 [17,'#a8dce2','#b8e1df','#ffe5bf',2.1,2.3,'#819b9a',0],
 [18.7,'#f3a877','#f2b991','#ff9d5c',1.6,1.8,'#8f8a8c',.4],
 [20.2,'#2d3a68','#34467a','#9db1ee',.75,1.25,'#44527a',1],
 [24,'#1d2c52','#243860','#9db1ee',.7,1.2,'#414f72',1]
];
const hex=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
const mix=(a,b,t)=>'#'+hex(a).map((v,i)=>Math.round(v+(hex(b)[i]-v)*t).toString(16).padStart(2,'0')).join('');
export function hourAt(seconds){return ((seconds/DAY+START)%1+1)%1*24;}
export function clockLabel(seconds){
 const h=hourAt(seconds),minutes=Math.floor((h*60+1e-6)/10)*10;
 return String(Math.floor(minutes/60)%24).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0');
}
export function skyAt(seconds){
 const hour=hourAt(seconds);let i=0;while(i+2<keys.length&&hour>=keys[i+1][0])i++;
 const a=keys[i],b=keys[i+1],t=(hour-a[0])/(b[0]-a[0]),n=k=>a[k]+(b[k]-a[k])*t;
 // The light source circles the city: the sun by day, the moon on the opposite side at night.
 const night=n(7),angle=(hour-6)/12*Math.PI;
 const sun=night>.5?{x:.4,y:.8,z:-.45}:{x:-Math.cos(angle)*.62,y:.5+.4*Math.max(0,Math.sin(angle)),z:.45};
 return {hour,sky:mix(a[1],b[1],t),fog:mix(a[2],b[2],t),sunColor:mix(a[3],b[3],t),sun:n(4),ambient:n(5),ground:mix(a[6],b[6],t),glow:night,night:night>.5,sunDirection:sun};
}

// Showers come at fixed points of the shift clock, so a reload shows the same weather.
const SHOWERS=[[150,70],[520,80],[905,60]],CYCLE=1080,FADE=10;
export function rainAt(seconds){
 if(!Number.isFinite(seconds)||seconds<0)return 0;
 const now=seconds%CYCLE;let rain=0;
 for(const [start,length] of SHOWERS){
  const age=now-start;if(age<0||age>length)continue;
  rain=Math.max(rain,Math.min(1,age/FADE,(length-age)/FADE));
 }
 return rain;
}
// Wet asphalt: longer braking and gentler acceleration. Dry road is 1.
export const gripAt=rain=>1-.45*Math.min(1,Math.max(0,rain));
