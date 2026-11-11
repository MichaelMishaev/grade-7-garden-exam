// Small synthesised sound set for Bay City. No audio files: every cue is built from
// oscillators and filtered noise, so the game stays self-contained and works offline.
const KEY='prepx-city-sound';
export function cityAudio(){
 let ctx=null,master=null,engine=null,rainGain=null,on=true;
 try{on=localStorage.getItem(KEY)!=='0';}catch{}
 function ready(){
  if(!on)return false;
  try{
   if(!ctx){
    ctx=new (window.AudioContext||window.webkitAudioContext)();
    master=ctx.createGain();master.gain.value=.5;master.connect(ctx.destination);
   }
   if(ctx.state==='suspended')ctx.resume();
   return true;
  }catch{return false;}
 }
 function noise(seconds){
  const buffer=ctx.createBuffer(1,Math.floor(ctx.sampleRate*seconds),ctx.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
  const source=ctx.createBufferSource();source.buffer=buffer;return source;
 }
 // One note: frequency slide from a to b with a short decay.
 function tone(a,b,length,{type='sine',gain=.12,delay=0}={}){
  const t=ctx.currentTime+delay,o=ctx.createOscillator(),g=ctx.createGain();
  o.type=type;o.frequency.setValueAtTime(a,t);o.frequency.exponentialRampToValueAtTime(b,t+length);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+.012);g.gain.exponentialRampToValueAtTime(.0008,t+length);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+length+.03);
 }
 const cues={
  coin(){tone(990,1320,.11,{type:'triangle',gain:.1});tone(1480,1980,.16,{type:'triangle',gain:.08,delay:.07});},
  star(){[880,1174,1568].forEach((f,i)=>tone(f,f*1.01,.2,{type:'triangle',gain:.09,delay:i*.06}));},
  checkpoint(){tone(660,990,.16,{type:'square',gain:.05});},
  go(){tone(520,1040,.3,{type:'square',gain:.06});},
  finish(){[523,659,784,1046].forEach((f,i)=>tone(f,f,.28,{type:'triangle',gain:.1,delay:i*.11}));},
  level(){[392,523,659,784,1046,1318].forEach((f,i)=>tone(f,f,.34,{type:'triangle',gain:.11,delay:i*.09}));},
  right(){tone(620,930,.16,{gain:.1});},
  wrong(){tone(300,220,.24,{gain:.09});},
  cancel(){tone(420,260,.22,{type:'triangle',gain:.07});},
  door(){tone(180,90,.09,{type:'square',gain:.06});tone(140,70,.1,{type:'square',gain:.05,delay:.12});},
  horn(){tone(392,392,.34,{type:'sawtooth',gain:.07});tone(494,494,.34,{type:'sawtooth',gain:.06});},
  crash(power=.5){
   const t=ctx.currentTime,n=noise(.4),f=ctx.createBiquadFilter(),g=ctx.createGain();
   f.type='lowpass';f.frequency.setValueAtTime(900+1600*power,t);f.frequency.exponentialRampToValueAtTime(120,t+.35);
   g.gain.setValueAtTime(.16+.3*power,t);g.gain.exponentialRampToValueAtTime(.001,t+.38);
   n.connect(f);f.connect(g);g.connect(master);n.start(t);tone(110,45,.25,{type:'square',gain:.08+.1*power});
  }
 };
 function play(name,value){if(!ready())return;try{cues[name]?.(value);}catch{}}
 // Engine: two detuned saws through a low-pass. Pitch follows speed, loudness follows throttle.
 function drive({driving,speed=0,max=1,boosting=false,rain=0}){
  if(!on||!ctx){return;}
  try{
   const t=ctx.currentTime;
   if(driving&&!engine){
    const a=ctx.createOscillator(),b=ctx.createOscillator(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
    a.type=b.type='sawtooth';filter.type='lowpass';gain.gain.value=0;a.connect(filter);b.connect(filter);filter.connect(gain);gain.connect(master);a.start();b.start();
    engine={a,b,filter,gain};
   }
   if(engine){
    const ratio=Math.min(1.4,speed/Math.max(1,max)),f=46+ratio*74+(boosting?18:0);
    engine.a.frequency.setTargetAtTime(f,t,.09);engine.b.frequency.setTargetAtTime(f*1.506,t,.09);
    engine.filter.frequency.setTargetAtTime(260+ratio*900,t,.1);
    engine.gain.gain.setTargetAtTime(driving?.028+ratio*.035:0,t,.12);
   }
   if(rain>.02&&!rainGain){
    const n=noise(2),f=ctx.createBiquadFilter();rainGain=ctx.createGain();n.loop=true;f.type='highpass';f.frequency.value=1800;rainGain.gain.value=0;
    n.connect(f);f.connect(rainGain);rainGain.connect(master);n.start();
   }
   if(rainGain)rainGain.gain.setTargetAtTime(rain*.045,t,.5);
  }catch{}
 }
 function quiet(){try{if(engine)engine.gain.gain.setTargetAtTime(0,ctx.currentTime,.05);if(rainGain)rainGain.gain.setTargetAtTime(0,ctx.currentTime,.1);}catch{}}
 return {play,drive,quiet,start:ready,enabled:()=>on,
  toggle(){on=!on;try{localStorage.setItem(KEY,on?'1':'0');}catch{}if(on)ready();else quiet();return on;}};
}
