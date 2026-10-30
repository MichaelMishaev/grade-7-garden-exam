// Three deterministic route networks. Landmarks and patrol paths stay in safe places.
export function buildMazeLayouts(original) {
  const protectedTiles = new Set(['1,1','15,1','4,9','13,11','4,5','11,5','12,9','3,3','7,1','9,3','1,7','5,11','9,11','15,7',
    '1,7','2,7','3,7','19,3','20,3','21,3','19,7','21,11','15,15','17,11','21,3','9,15','19,11',
    '10,5','12,5','13,5','11,9','13,9','14,9','15,9']);
  function variant(seed) {
    const tiles=original.map(row=>[...row]);
    const points=[];
    let value=seed;
    const random=()=>{value=(value*1664525+1013904223)>>>0;return value/4294967296;};
    for(let y=1;y<tiles.length-1;y++)for(let x=1;x<tiles[0].length-1;x++)points.push({x,y,rank:random()});
    points.sort((a,b)=>a.rank-b.rank);
    const neighbors=({x,y})=>[[x-1,y],[x+1,y],[x,y-1],[x,y+1]].filter(([x,y])=>tiles[y]?.[x]&&tiles[y][x]!=='#');
    let opened=0;
    for(const point of points)if(opened<14&&tiles[point.y][point.x]==='#'&&neighbors(point).length>=2){tiles[point.y][point.x]='.';opened++;}
    const connected=()=>{
      const queue=[{x:1,y:1}],seen=new Set(['1,1']);
      for(let i=0;i<queue.length;i++)for(const [x,y]of neighbors(queue[i]))if(!seen.has(`${x},${y}`)){seen.add(`${x},${y}`);queue.push({x,y});}
      return tiles.flat().filter(cell=>cell!=='#').length===seen.size;
    };
    let closed=0;
    for(const {x,y}of points)if(closed<14&&tiles[y][x]==='.'&&!protectedTiles.has(`${x},${y}`)){
      tiles[y][x]='#';if(connected())closed++;else tiles[y][x]='.';
    }
    return tiles.map(row=>row.join(''));
  }
  return [
    {id:'classic',title:'מבוך הצללים',tiles:original},
    {id:'moon',title:'מבוך אור הירח',tiles:variant(2718)},
    {id:'ember',title:'מבוך הגחלים',tiles:variant(6283)}
  ];
}
