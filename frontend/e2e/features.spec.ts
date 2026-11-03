import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';

test('cut-feature proposal requires approval and accepted CAD survives reopening',async({page,request})=>{
 const document=JSON.parse(await readFile('../examples/features/slotted_tray/design.json','utf8'));
 const spec=document.spec,config=await (await request.get('/api/config')).json();
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));let sends=0;
 await page.route('**/api/config',route=>route.fulfill({json:{...config,mode:'LIVE_AGENT',ai_configured:true}}));
 await page.route('**/api/jobs',async route=>{
  const payload=route.request().postDataJSON();sends++;
  if(payload.confirm_job_id){
   expect(payload.confirm_job_id).toBe('feature-proposal');
   const response=await request.post('/api/jobs',{data:{session_id:payload.session_id,spec}});
   return route.fulfill({json:await response.json()});
  }
  return route.fulfill({json:{id:'feature-proposal',status:'clarification',workflow:'concept',modeling_contract_version:config.modeling_contract_version,events:[],proposed_spec:spec,brief:{name:spec.name,primary_component:'Slotted tray',primary_dimensions:'160 x 100 x 30 mm',overall_dimensions_mm:[160,100,30],solid_components:1,components:['Slotted tray'],component_details:[{id:'body',name:'Slotted tray',primitive:'box',dimensions_mm:spec.components[0].dimensions,position_mm:spec.components[0].position_mm,features:['Two 20 x 8 mm through-slots in the floor']}],assumptions:spec.assumptions}}});
 });
 await page.goto('/');await page.getByRole('textbox',{name:'Description or follow-up edit'}).fill('Create a slotted tray 160 x 100 x 30 mm');
 await page.getByRole('button',{name:'Send message',exact:true}).click();
 await expect(page.locator('.approval-hint').filter({hasText:'accurate CAD preview'})).toBeVisible();
 await expect(page.getByRole('button',{name:'Preview proposed design',exact:true})).toHaveCount(0);
 await page.locator('.proposal-details summary').click();
 await expect(page.locator('.proposal-details')).toContainText('Two 20 x 8 mm through-slots');
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');expect(sends).toBe(1);
 await page.getByRole('button',{name:'Build this concept',exact:true}).click();
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready',{timeout:80000});
 await expect(page.locator('.download-menu')).toBeVisible();expect(sends).toBe(2);
 await page.reload();await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready',{timeout:30000});
 await expect(page.locator('.component-tree [data-component-id="body"]')).toBeVisible();
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 expect(errors).toEqual([]);
});
