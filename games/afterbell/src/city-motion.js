// Distance-driven articulation: colliding with a wall does not run the legs in place.
export function runningPose(distance,amount){
 const wave=Math.sin(distance*Math.PI*2/6.2),other=-wave;
 return [wave,other].map(s=>({hip:s*.86*amount,knee:(.22+Math.max(0,-s)*1.05)*amount,shoulder:-s*.72*amount,elbow:(1.05+s*.2)*amount}));
}
