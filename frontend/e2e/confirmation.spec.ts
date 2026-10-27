import {test,expect} from '@playwright/test';
test('cooking intent is clarified and a reviewed proposal builds only after confirmation',async({page,request})=>{
 const proposed={part_type:'assembly',schema_version:1,units:'mm',coordinates:'right-handed-z-up-xyz-degrees',concept:'custom',name:'Fixed kitchen arm - browser fixture',assumptions:['Mock interpretation for workflow verification; visual components only.'],components:[
  {id:'base',name:'Countertop base',primitive:'box',dimensions:{x_mm:400,y_mm:300,z_mm:35},position_mm:[0,0,17.5],role:'base'},
  {id:'post',name:'Fixed support',primitive:'box',dimensions:{x_mm:45,y_mm:45,z_mm:250},position_mm:[-140,0,160],role:'support'},
  {id:'arm',name:'Stirring arm',primitive:'box',dimensions:{x_mm:250,y_mm:35,z_mm:35},position_mm:[-30,0,285],role:'arm'},
  {id:'head',name:'Stirring head',primitive:'cylinder',dimensions:{radius_mm:8,z_mm:160},position_mm:[80,0,190],role:'tool'}].map(c=>({rotation_deg:[0,0,0],color:'#6d907b',parent_id:null,...c}))};
 let question:Record<string,unknown>|undefined,pending:Record<string,unknown>|undefined;const sent:Record<string,unknown>[]=[];
 await page.route('**/api/sessions/*/jobs',async route=>{const response=await request.get(route.request().url());const jobs=await response.json();return route.fulfill({json:[...jobs,...(pending?[pending]:[])]});});
 await page.route('**/api/jobs',async route=>{
  const payload=route.request().postDataJSON();sent.push(payload);
  if(sent.length===1){const response=await request.post('/api/jobs',{data:payload});question=await response.json();return route.fulfill({json:question});}
  if(payload.confirm_job_id){expect(payload.confirm_job_id).toBe('mock-reviewed-proposal');const response=await request.post('/api/jobs',{data:{session_id:payload.session_id,spec:proposed}});return route.fulfill({json:await response.json()});}
  pending={id:'mock-reviewed-proposal',workflow:'concept',status:'clarification',message:'Please review the fixed countertop stirring assistant before I build.',request_summary:'Chat: '+payload.description,proposed_spec:proposed,brief:{requirements:{purpose:'cooking',form:'Fixed robotic arm',tasks:['stir'],size:'400 mm'},name:proposed.name,primary_component:'Countertop base',primary_dimensions:'400 x 300 x 35 mm',overall_dimensions_mm:[400,300,302.5],layout_warnings:['Some components may float apart. Check placement.'],solid_components:4,components:['Countertop base','Fixed support','Stirring arm','Stirring head'],assumptions:proposed.assumptions},events:[]};return route.fulfill({json:pending});
 });
 await page.goto('/');const composer=page.getByRole('textbox',{name:'Description or follow-up edit'}),send=page.getByRole('button',{name:'Send message',exact:true});
 await composer.fill('Create a cooking robot with default settings');await send.click();
 await expect(page.locator('.composer-feedback')).toContainText('countertop');await expect(page.locator('.composer-feedback')).toContainText('stir');
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');
 await composer.fill('A fixed robotic arm at a stove to stir food, about 400 mm wide');await send.click();
 const build=page.getByRole('button',{name:'Build this concept',exact:true});await expect(build).toBeVisible();
 await expect(page.locator('.composer-feedback')).toContainText(proposed.name);await expect(page.locator('.agreed-requirements')).toContainText('Cooking assistant');await expect(page.locator('.agreed-requirements')).toContainText('Fixed robotic arm');await expect(page.locator('.agreed-requirements')).toContainText('stir');await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');expect(sent).toHaveLength(2);
 let artifactRequests=0;page.on('request',r=>{if(r.url().includes('/api/artifacts/'))artifactRequests++;});
 await page.getByRole('button',{name:'Preview proposed design',exact:true}).click();
 const preview=page.getByRole('dialog',{name:'Proposed design preview'});
 await expect(preview.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 const rendered=JSON.parse((await preview.locator('canvas').getAttribute('data-rendered-size-mm'))!);
 for(const [i,expected] of [400,300,302.5].entries())expect(rendered[i]).toBeCloseTo(expected,1);
 expect(sent).toHaveLength(2);expect(artifactRequests).toBe(0);
 await expect(preview).toContainText('CAD has not been built');
 await preview.screenshot({path:'../docs/screenshots/proposal-preview.png'});
 await preview.getByRole('button',{name:'Back to review'}).click();await expect(preview).toHaveCount(0);
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');
 await page.getByRole('button',{name:'Preview proposed design',exact:true}).click();await page.keyboard.press('Escape');await expect(preview).toHaveCount(0);
 await composer.fill('I want to change the arm size');await expect(build).toBeDisabled();await expect(page.locator('.approval-hint').filter({hasText:'Send your message first'})).toBeVisible();await composer.fill('');await expect(build).toBeEnabled();
 await page.reload();await expect(build).toBeVisible();await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');expect(sent).toHaveLength(2);
 await page.screenshot({path:'../docs/screenshots/concept-confirmation.png',fullPage:true});
 await expect(page.locator('.proposal-overall-size')).toContainText('400 × 300 × 302.5');await expect(page.locator('.composer-feedback')).toContainText('may float apart');
 await build.click();await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready',{timeout:80000});await expect(page.locator('.component-tree [data-component-id]')).toHaveCount(4);expect(sent).toHaveLength(3);
});

test('guided reply choices remember sent answers and never submit on click',async({page,request})=>{
 const sent:Record<string,unknown>[]=[];
 await page.route('**/api/jobs',async route=>{const payload=route.request().postDataJSON();sent.push(payload);const response=await request.post('/api/jobs',{data:payload});return route.fulfill({json:await response.json()});});
 await page.goto('/');const composer=page.getByRole('textbox',{name:'Description or follow-up edit'}),send=page.getByRole('button',{name:'Send message',exact:true});
 await composer.fill('Create a cooking robot');await send.click();
 const choices=page.getByRole('group',{name:'Quick reply suggestions'});await expect(choices).toBeVisible();
 await choices.getByRole('button',{name:'Countertop appliance',exact:true}).click();await expect(composer).toHaveValue('A countertop cooking appliance.');await expect(choices.getByRole('button',{name:'Countertop appliance',exact:true})).toHaveAttribute('aria-pressed','true');expect(sent).toHaveLength(1);
 await choices.getByRole('button',{name:'Fixed robotic arm',exact:true}).click();await expect(composer).toHaveValue('A fixed robotic arm working at a stove.');expect(sent).toHaveLength(1);
 await send.click();await expect(choices).toContainText('Choose the main tasks');await expect(page.locator('.agreed-requirements')).toContainText('Fixed robotic arm');expect(sent).toHaveLength(2);
 await page.reload();await expect(choices).toContainText('Choose the main tasks');await expect(page.locator('.agreed-requirements')).toContainText('Fixed robotic arm');
 await choices.getByRole('button',{name:'Stir and heat',exact:true}).click();await composer.press('Enter');await expect(composer).toHaveValue('It should stir and heat food.\n');expect(sent).toHaveLength(2);
 await send.click();await expect(choices).toContainText('Choose a starting size');await expect(page.locator('.agreed-requirements')).toContainText('stir, heat');expect(sent).toHaveLength(3);
 await choices.getByRole('button',{name:'Suggest dimensions',exact:true}).click();await expect(composer).toHaveValue(/sensible defaults/);expect(sent).toHaveLength(3);
 await choices.getByRole('button',{name:'400 mm wide',exact:true}).click();await expect(composer).toHaveValue('Make it about 400 mm wide.');expect(sent).toHaveLength(3);
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');await expect(page.getByRole('button',{name:'Build this concept',exact:true})).toHaveCount(0);
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:'../docs/screenshots/guided-clarification.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});


test('planning conversations and unsent drafts survive start over and reopening',async({page,request})=>{
 await page.route('**/api/jobs',async route=>{const response=await request.post('/api/jobs',{data:route.request().postDataJSON()});return route.fulfill({json:await response.json()});});
 await page.goto('/');
 const planName='Planning recovery '+Date.now();
 const composer=page.getByRole('textbox',{name:'Description or follow-up edit'});
 await composer.fill('Create a cooking robot');await page.getByRole('button',{name:'Send message',exact:true}).click();
 await expect(page.getByRole('group',{name:'Quick reply suggestions'})).toBeVisible();
 await composer.fill('My unfinished kitchen idea');
 await page.getByRole('button',{name:'My designs',exact:true}).click();
 await page.getByRole('textbox',{name:'Design name'}).fill(planName);
 await page.getByRole('button',{name:'Save design',exact:true}).click();
 await expect(page.getByRole('dialog')).toContainText('Planning · no model built yet');
 await page.getByRole('button',{name:'Close my designs'}).click();
 page.once('dialog',dialog=>dialog.accept());await page.getByRole('button',{name:'Start over',exact:true}).click();
 await expect(composer).toHaveValue('');
 await page.getByRole('button',{name:'My designs',exact:true}).click();
 await page.locator('.saved-designs article').filter({hasText:planName}).getByRole('button',{name:'Open',exact:true}).click();
 await expect(composer).toHaveValue('My unfinished kitchen idea');
 await expect(page.getByRole('group',{name:'Quick reply suggestions'})).toBeVisible();
 await page.reload();await expect(composer).toHaveValue('My unfinished kitchen idea');
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');
});
