export async function solveFieldCheck(page){
 if(!await page.locator('#collect-equipment').isDisabled())return;
 if(await page.locator('#channel-up').count()){
   while(Number(await page.locator('#radio-channel').textContent())<5)await page.locator('#channel-up').click();
   await page.locator('#test-signal').click();
 }else{
   const id=await page.evaluate(()=>JSON.parse(render_game_to_text()).mission.fieldCheck.id);
   for(const n of id==='card'?[0,1,2]:[2,0,1])await page.locator(`[data-operation="${n}"]`).click();
 }
}
