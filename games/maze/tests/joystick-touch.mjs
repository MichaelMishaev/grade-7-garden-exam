// Real touch input, one committed tile per call; no gameplay-state injection.
export async function joystickStep(page, direction) {
  const control=page.locator('#movement-joystick');
  await control.scrollIntoViewIfNeeded();
  const box=await control.boundingBox(),x=box.x+box.width/2,y=box.y+box.height/2;
  const [dx,dy]=({up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]})[direction];
  const before=await page.evaluate(()=>JSON.parse(window.render_game_to_text()).player);
  const touch=await page.context().newCDPSession(page);
  try {
    await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
    await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*40,y:y+dy*40}]});
    for(let frame=0;frame<50;frame++){
      await page.evaluate(()=>window.advanceTime(16));
      const state=await page.evaluate(()=>JSON.parse(window.render_game_to_text()));
      if(state.player.x!==before.x||state.player.y!==before.y||state.phase!=='explore')break;
    }
    await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  } finally {await touch.detach();}
}
