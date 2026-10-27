import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';

test('proposal preview matches analytic transforms and does not build or fetch artifacts',async({page})=>{
 const fixture=JSON.parse(await readFile('e2e/fixtures/proposal-transform.json','utf8'));
 let posts=0,artifacts=0;const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(r.url().includes('/api/artifacts/'))artifacts++;});
 await page.route('**/api/config',route=>route.fulfill({json:{mode:'LIVE_AGENT',ai_configured:true}}));
 await page.route('**/api/jobs',route=>{posts++;return route.fulfill({json:{id:'transformed-proposal',status:'clarification',workflow:'concept',events:[],message:'Review this proposal',proposed_spec:fixture.spec,brief:{name:fixture.spec.name,primary_component:'Rotated box',primary_dimensions:'120 × 70 × 40 mm',overall_dimensions_mm:fixture.bounds,solid_components:4,components:['Box','Cylinder','Cone','Sphere'],assumptions:[]}}});});
 await page.goto('/');await page.getByRole('textbox',{name:'Description or follow-up edit'}).fill('Explore a transformed assembly');await page.getByRole('button',{name:'Send message',exact:true}).click();
 await page.getByRole('button',{name:'Preview proposed design',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Proposed design preview'});
 await expect(dialog.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 const size=JSON.parse((await dialog.locator('canvas').getAttribute('data-rendered-size-mm'))!);
 for(let i=0;i<3;i++)expect(Math.abs(size[i]-fixture.bounds[i])).toBeLessThan(.5);
 await dialog.getByText('More views',{exact:true}).click();await dialog.getByRole('button',{name:'Top',exact:true}).click();await dialog.getByText('More views',{exact:true}).click();
 await dialog.getByRole('button',{name:'Fit model',exact:true}).click();
 await page.setViewportSize({width:390,height:844});
 expect(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBeTruthy();
 await expect(dialog.getByRole('button',{name:'Back to review',exact:true})).toBeVisible();
 await dialog.getByRole('button',{name:'Back to review',exact:true}).click();
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');
 await expect(page.getByRole('button',{name:'Build this concept',exact:true})).toBeVisible();
 expect(posts).toBe(1);expect(artifacts).toBe(0);expect(errors).toEqual([]);
});


test('previewing an edit preserves the accepted model and downloads',async({page,request})=>{
 const fixture=JSON.parse(await readFile('e2e/fixtures/proposal-transform.json','utf8'));
 const sid=(await (await request.post('/api/sessions')).json()).session_id;
 const created=await (await request.post('/api/jobs',{data:{session_id:sid,spec:{length_mm:100,width_mm:60,height_mm:35}}})).json();
 await expect.poll(async()=>(await (await request.get('/api/jobs/'+created.id)).json()).status,{timeout:80000}).toBe('succeeded');
 await page.addInitScript(id=>localStorage.setItem('sketchless-session',id),sid);
 await page.route('**/api/config',route=>route.fulfill({json:{mode:'LIVE_AGENT',ai_configured:true}}));
 await page.route('**/api/jobs',route=>route.fulfill({json:{id:'pending-edit',status:'clarification',workflow:'concept',events:[],proposed_spec:fixture.spec,brief:{name:fixture.spec.name,primary_component:'Box',primary_dimensions:'120 × 70 × 40 mm',overall_dimensions_mm:fixture.bounds,solid_components:4,components:['Box','Cylinder','Cone','Sphere'],assumptions:[]}}}));
 await page.goto('/');await expect(page.locator('.preview-panel .viewport')).toHaveAttribute('data-preview-state','ready');
 const download=page.locator('.download-menu a').first();const before=await download.getAttribute('href');
 await page.getByRole('textbox',{name:'Description or follow-up edit'}).fill('Explore a different layout');await page.getByRole('button',{name:'Send message',exact:true}).click();
 await page.getByRole('button',{name:'Preview proposed design',exact:true}).click();
 const preview=page.getByRole('dialog',{name:'Proposed design preview'});await expect(preview.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 await page.keyboard.press('Escape');await expect(preview).toHaveCount(0);
 await expect(page.locator('.preview-panel .viewport')).toHaveAttribute('data-preview-state','ready');
 expect(await download.getAttribute('href')).toBe(before);
 expect((await (await request.get('/api/sessions/'+sid)).json()).job_id).toBe(created.id);
});
