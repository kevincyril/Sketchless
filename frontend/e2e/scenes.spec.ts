import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const shots='../docs/screenshots';
test('robot conversation, actual CAD selection/edit/export and conversational restore',async({page,request})=>{
 test.setTimeout(180000);
 const errors:string[]=[],failed:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>{if(!r.failure()?.errorText.includes('ERR_ABORTED'))failed.push(r.url());});
 const source=JSON.parse(await readFile('../examples/robot/spec.json','utf8'));
 let firstId='',editedId='',session='',question:Record<string,unknown>|undefined;
 const summaries=new Map<string,string>();
 await page.route('**/api/config',route=>route.fulfill({json:{mode:'LIVE_AGENT',ai_configured:true,families:['enclosure','tray','bracket'],workflows:['precise','concept']}}));
 await page.route('**/api/sessions/*/jobs',async route=>{
  const response=await request.get(route.request().url());const entries=await response.json();
  return route.fulfill({json:[...(question?[question]:[]),...entries.map((j:Record<string,unknown>)=>({...j,request_summary:summaries.get(String(j.id))||j.request_summary}))]});
 });
 await page.route('**/api/jobs/*',async route=>{const response=await request.get(route.request().url());const j=await response.json();return route.fulfill({json:{...j,request_summary:summaries.get(j.id)||j.request_summary}});});
 await page.route('**/api/jobs',async route=>{
  const payload=route.request().postDataJSON();session=payload.session_id;
  if(payload.spec){const response=await request.post('/api/jobs',{data:payload});return route.fulfill({json:await response.json()});}
  if(payload.description==='Build a cube-shaped robot with legs.'){
   question={id:'mock-concept-question',status:'clarification',request_summary:'Chat: '+payload.description,message:'How many legs, how large should the body be, and straight or articulated legs?',events:[]};return route.fulfill({json:question});
  }
  if(payload.description==='Restore the previous version'){
   const response=await request.post('/api/jobs',{data:payload});const j=await response.json();summaries.set(j.id,'Chat: '+payload.description);return route.fulfill({json:{...j,request_summary:'Chat: '+payload.description}});
  }
  const scene=structuredClone(source);
  if(firstId){
   expect(payload.selected_component_id).toBe('eye_1');expect(payload.selection_only).toBe(true);expect(payload.base_version_id).toBe(firstId);
   scene.components.find((c:{id:string})=>c.id==='eye_1').position_mm[2]+=10;
  }
  const response=await request.post('/api/jobs',{data:{session_id:session,spec:scene}});const j=await response.json();expect(response.status()).toBe(202);summaries.set(j.id,'Chat: '+payload.description);if(!firstId)firstId=j.id;else editedId=j.id;
  return route.fulfill({json:{...j,request_summary:'Chat: '+payload.description}});
 });
 await page.goto('/');const composer=page.getByRole('textbox',{name:'Description or follow-up edit'});
 await composer.fill('Build a cube-shaped robot with legs.');await page.getByRole('button',{name:'Send message',exact:true}).click();await expect(page.getByRole('log')).toContainText('How many legs');
 await composer.fill('Four articulated legs, a 200 mm cube body, and two camera eyes.');await page.getByRole('button',{name:'Send message',exact:true}).click();
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready',{timeout:80000});await expect(page.locator('.component-tree [data-component-id]')).toHaveCount(27);
 await expect(page.locator('.active-version')).toContainText('Concept assembly');
 const canvas=page.locator('canvas');const box=(await canvas.boundingBox())!;
 await canvas.click({position:{x:box.width*.5,y:box.height*.4}});await expect(page.locator('.viewport')).not.toHaveAttribute('data-selected-component','');
 const before=await canvas.screenshot();await page.mouse.move(box.x+box.width*.6,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.7,box.y+box.height*.6,{steps:12});await page.mouse.up();await page.mouse.wheel(0,-180);const after=await canvas.screenshot();expect(before.equals(after)).toBe(false);
 await page.getByRole('button',{name:'Fit model',exact:true}).click();await page.getByRole('button',{name:'Reset view',exact:true}).click();
 await page.locator('[data-component-id="eye_1"]').click();await expect(page.locator('.component-details')).toContainText('eye_1');await expect(page.locator('.viewport')).toHaveAttribute('data-selected-component','eye_1');
 await page.screenshot({path:shots+'/robot-selected.png',fullPage:true});
 await composer.fill('Move this selected eye 10 mm higher.');await page.getByRole('button',{name:'Send message',exact:true}).click();
 await expect.poll(()=>editedId).not.toBe('');await expect.poll(()=>page.locator('.active-version').textContent(),{timeout:80000}).toContain(editedId.slice(0,8));await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready',{timeout:80000});
 await page.locator('[data-component-id="eye_1"]').click();await expect(page.locator('.component-details')).toContainText(String(source.components.find((c:{id:string})=>c.id==='eye_1').position_mm[2]+10));
 await page.getByRole('button',{name:'Whole model',exact:true}).click();
 await page.locator('.download-menu summary').click();const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Visual 3D scene',exact:false}).click()]);expect(await download.failure()).toBeNull();await page.locator('.download-menu summary').click();
 await composer.fill('Restore the previous version');await page.getByRole('button',{name:'Send message',exact:true}).click();await expect(page.locator('.active-version')).toContainText(firstId.slice(0,8));await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 await expect(page.locator('.download-menu a[href$="/step"]')).toHaveAttribute('href','/api/artifacts/'+firstId+'/step');
 await page.reload();await expect(page.locator('.active-version')).toContainText(firstId.slice(0,8));await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 await page.screenshot({path:shots+'/robot-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();expect(await page.locator('.component-tree [role=group]').evaluate(el=>el.scrollHeight>el.clientHeight)).toBeTruthy();expect(await page.locator('.component-panel').evaluate(el=>el.scrollHeight<=el.clientHeight+1)).toBeTruthy();await page.screenshot({path:shots+'/robot-mobile.png',fullPage:true});
 const document=await (await request.get('/api/designs/'+firstId+'/file')).json();
 await page.getByRole('button',{name:'My designs',exact:true}).click();
 await page.getByLabel('Open Sketchless design file').setInputFiles({name:'robot-scene.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(document))});
 await expect(page.getByRole('button',{name:'Rebuild imported scene',exact:false})).toBeEnabled();
 await page.getByRole('button',{name:'Rebuild imported scene',exact:false}).click();
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready',{timeout:80000});
 await expect(page.locator('.component-tree [data-component-id]')).toHaveCount(27);
 expect(errors).toEqual([]);expect(failed).toEqual([]);
});
