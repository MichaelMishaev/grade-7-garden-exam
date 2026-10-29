// The same collision predicate is used for planning, segment validation and walking.
export function clearSegment(a,b,blocked,spacing=.14) {
  const length=Math.hypot(b.x-a.x,b.z-a.z),steps=Math.max(1,Math.ceil(length/spacing));
  for(let i=0;i<=steps;i++){const t=i/steps;if(blocked(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t))return false;}
  return true;
}
export function findRoute(start,goal,blocked,{step=.6,radius=1.7,bound=27}={}) {
  if(![start.x,start.z,goal.x,goal.z].every(Number.isFinite)||blocked(start.x,start.z))return null;
  if(Math.hypot(start.x-goal.x,start.z-goal.z)<=radius)return [];
  const width=Math.floor(bound*2/step)+1,total=width*width,point=id=>({x:id%width*step-bound,z:Math.floor(id/width)*step-bound});
  const open=[],cost=new Float64Array(total).fill(Infinity),previous=new Int32Array(total).fill(-1),closed=new Uint8Array(total),walkable=new Int8Array(total);
  function allowed(id){if(id<0||id>=total)return false;if(!walkable[id]){const p=point(id);walkable[id]=blocked(p.x,p.z)?-1:1;}return walkable[id]>0;}
  const heuristic=p=>Math.max(0,Math.hypot(p.x-goal.x,p.z-goal.z)-radius);
  function push(id,priority){let i=open.length;open.push({id,priority});while(i>0){const parent=(i-1)>>1;if(open[parent].priority<=priority)break;[open[parent],open[i]]=[open[i],open[parent]];i=parent;}}
  function pop(){const first=open[0],last=open.pop();if(open.length){open[0]=last;let i=0;while(true){const left=i*2+1,right=left+1;let best=i;if(left<open.length&&open[left].priority<open[best].priority)best=left;if(right<open.length&&open[right].priority<open[best].priority)best=right;if(best===i)break;[open[i],open[best]]=[open[best],open[i]];i=best;}}return first.id;}
  const sx=Math.round((start.x+bound)/step),sz=Math.round((start.z+bound)/step);
  // Connect to visible nearby cells; this also handles a player close to an obstacle edge.
  for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const x=sx+dx,z=sz+dz;if(x<0||z<0||x>=width||z>=width)continue;const id=z*width+x,p=point(id);if(allowed(id)&&clearSegment(start,p,blocked)){cost[id]=Math.hypot(p.x-start.x,p.z-start.z);push(id,cost[id]+heuristic(p));}}
  while(open.length){const id=pop();if(closed[id])continue;closed[id]=1;const p=point(id);
    if(Math.hypot(p.x-goal.x,p.z-goal.z)<=Math.max(radius,step*.72)){
      const raw=[];for(let at=id;at!==-1;at=previous[at])raw.push(point(at));raw.reverse();
      if(radius<step&&clearSegment(raw.at(-1),goal,blocked))raw.push({...goal});
      // Remove redundant grid corners only when the full shortcut is collision-clear.
      const route=[];let anchor=start,index=0;while(index<raw.length){let next=index;while(next+1<raw.length&&clearSegment(anchor,raw[next+1],blocked))next++;route.push(raw[next]);anchor=raw[next];index=next+1;}return route;
    }
    const x=id%width,z=Math.floor(id/width);
    for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dz)continue;const nx=x+dx,nz=z+dz;if(nx<0||nz<0||nx>=width||nz>=width)continue;const next=nz*width+nx;if(closed[next]||!allowed(next))continue;if(dx&&dz&&(!allowed(z*width+nx)||!allowed(nz*width+x)))continue;const q=point(next);if(!clearSegment(p,q,blocked))continue;const distance=cost[id]+step*Math.hypot(dx,dz);if(distance>=cost[next])continue;cost[next]=distance;previous[next]=id;push(next,distance+heuristic(q));}
  }
  return null;
}
