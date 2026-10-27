import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';

test('corrected proposals explain changes, survive refresh and build after review',async({page,request})=>{
 const first=JSON.parse(await readFile('../examples/variety/lamp/design.json','utf8')).spec;
 const corrected=structuredClone(first);const shade=corrected.components.find((c:{name:string})=>c.name.toLowerCase().includes('shade'));shade.color='#c43d32';
 const pending:Record<string,unknown>[]=[],sent:Record<string,unknown>[]=[];
 await page.route('**/api/config',route=>route.fulfill({json:{mode:'LIVE_AGENT',ai_configured:true}}));
 await page.route('**/api/sessions/*/jobs',async route=>{const real=await request.get(route.request().url());return route.fulfill({json:[...await real.json(),...pending]});});
 await page.route('**/api/jobs',async route=>{
  const payload=route.request().postDataJSON();sent.push(payload);
  if(payload.confirm_job_id){expect(payload.confirm_job_id).toBe('corrected-proposal');const response=await request.post('/api/jobs',{data:{session_id:payload.session_id,spec:corrected}});return route.fulfill({json:await response.json()});}
  const revised=sent.length===2,spec=revised?corrected:first;
  const job={id:revised?'corrected-proposal':'first-proposal',revises_proposal_id:revised?'first-proposal':undefined,status:'clarification',workflow:'concept',events:[],request_summary:'Chat: '+payload.description,message:'Review this lamp proposal',proposed_spec:spec,brief:{name:spec.name,primary_component:'Base',primary_dimensions:'Round base',solid_components:spec.components.length,components:spec.components.map((c:{name:string})=>c.name),assumptions:[],changes:revised?['Updated '+shade.name+': color']:[]}};
  pending.push(job);return route.fulfill({json:job});
 });
 await page.goto('/');const composer=page.getByRole('textbox',{name:'Description or follow-up edit'}),send=page.getByRole('button',{name:'Send message',exact:true});
 await composer.fill('Create a desk lamp with sensible defaults');await send.click();
 await expect(page.getByRole('button',{name:'Build this concept',exact:true})).toBeVisible();
 await composer.fill('Make the shade red');await send.click();
 await expect(page.locator('.proposal-changes')).toContainText('Updated '+shade.name+': color');
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','empty');expect(sent).toHaveLength(2);
 await page.reload();await expect(page.locator('.proposal-changes')).toContainText('color');
 await page.getByRole('button',{name:'Preview proposed design',exact:true}).click();
 const preview=page.getByRole('dialog',{name:'Proposed design preview'});await expect(preview.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 await preview.screenshot({path:'../docs/screenshots/revised-proposal.png'});
 await preview.getByRole('button',{name:'Back to review',exact:true}).click();expect(sent).toHaveLength(2);
 await page.getByRole('button',{name:'Build this concept',exact:true}).click();
 await expect(page.locator('.preview-panel .viewport')).toHaveAttribute('data-preview-state','ready',{timeout:80000});
 expect(sent).toHaveLength(3);await expect(page.locator('.download-menu')).toBeVisible();
});
