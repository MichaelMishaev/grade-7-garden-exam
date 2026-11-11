import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {buildCar,poseCarWheels,CAR_BRANDS} from './city-cars.js';
// Close-up of one car for the garage: a small second WebGL canvas that exists only while the
// garage is open. It reuses the shared car geometry; the materials are cloned because the city's
// reflection map belongs to the other WebGL context. Drag to turn; auto-rotation stops under
// reduced motion. The returned function disposes everything; hiding or removing the container
// does the same on the next frame.
export function mountCarPreview(container,brand,paint,{angle=-.65,rotate=true}={}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,canvas=document.createElement('canvas');
 canvas.className='car-preview-canvas';canvas.setAttribute('role','img');
 canvas.setAttribute('aria-label','תצוגה מקרוב: '+(CAR_BRANDS[brand]?.name||'רכב')+' · גררו כדי לסובב');
 Object.assign(canvas.style,{display:'block',width:'100%',height:'100%',touchAction:'pan-y',cursor:'grab'});
 // Without a height from the stylesheet the preview keeps a wide 16:9 stage.
 if(container.clientHeight<40)container.style.aspectRatio='16 / 9';
 container.append(canvas);
 let renderer;
 try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});}
 catch{canvas.remove();return ()=>{};}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 const scene=new T.Scene(),pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment(),env=pmrem.fromScene(room,.04).texture;
 room.dispose();pmrem.dispose();scene.environment=env;
 scene.add(new T.HemisphereLight('#fff6e4','#6f7f7c',1.1));
 const sun=new T.DirectionalLight('#fff1d6',2.2);sun.position.set(-4,7,5);scene.add(sun);
 // Soft contact shadow under the car, drawn once into a small canvas.
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=64;
 const g=shadowCanvas.getContext('2d'),grad=g.createRadialGradient(32,32,4,32,32,32);grad.addColorStop(0,'rgba(0,0,0,.55)');grad.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=grad;g.fillRect(0,0,64,64);
 const shadowTexture=new T.CanvasTexture(shadowCanvas),shadow=new T.Mesh(new T.PlaneGeometry(4.4,7.6),new T.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}));
 shadow.rotation.x=-Math.PI/2;shadow.position.y=.31;
 const turntable=new T.Group(),shell=buildCar(T,null,null,null,brand,paint),owned=[];
 for(const mesh of shell.children){const m=mesh.material.clone();m.envMap=null;m.envMapIntensity=1;mesh.material=m;owned.push(m);}
 poseCarWheels(shell);turntable.add(shell,shadow);turntable.rotation.y=angle;scene.add(turntable);
 const camera=new T.PerspectiveCamera(26,1,.5,60);
 function fit(){
  const w=Math.max(1,container.clientWidth),h=Math.max(1,container.clientHeight);renderer.setSize(w,h,false);
  camera.aspect=w/h;const distance=w/h<1.25?16:12;camera.position.set(0,distance*.36,distance);camera.lookAt(0,1.05,0);camera.updateProjectionMatrix();
 }
 const observer=new ResizeObserver(fit);observer.observe(container);fit();
 let drag=null,spin=rotate&&!reduced?.35:0,frame=0,last=performance.now(),gone=false,seen=false;
 canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,a:turntable.rotation.y};canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';});
 canvas.addEventListener('pointermove',e=>{if(drag)turntable.rotation.y=drag.a+(e.clientX-drag.x)*.012;});
 for(const type of ['pointerup','pointercancel'])canvas.addEventListener(type,()=>{drag=null;canvas.style.cursor='grab';});
 function draw(now){
  // Closing the garage hides or replaces the sheet: stop and free the context either way.
  if(gone)return;const shown=canvas.offsetParent!==null;seen||=shown;if(!canvas.isConnected||(seen&&!shown)){dispose();return;}
  const dt=Math.min(.05,(now-last)/1000);last=now;if(!drag)turntable.rotation.y+=spin*dt;
  renderer.render(scene,camera);frame=requestAnimationFrame(draw);
 }
 frame=requestAnimationFrame(draw);
 function dispose(){
  if(gone)return;gone=true;cancelAnimationFrame(frame);observer.disconnect();
  for(const m of owned)m.dispose();shadow.geometry.dispose();shadow.material.dispose();shadowTexture.dispose();env.dispose();
  renderer.dispose();renderer.forceContextLoss();canvas.remove();
 }
 return dispose;
}
