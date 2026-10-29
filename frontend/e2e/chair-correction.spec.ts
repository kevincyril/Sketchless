import {test,expect} from '@playwright/test';

test('chair correction displays the updated purpose, dimensions and every proposed part',async({page,request})=>{
 const parts:any[]=[];
 const box=(id:string,name:string,role:string,xyz:number[],position:number[])=>parts.push({id,name,role,primitive:'box',dimensions:{x_mm:xyz[0],y_mm:xyz[1],z_mm:xyz[2]},position_mm:position,rotation_deg:[0,0,0],parent_id:null,color:'#a08868',symmetry_group:''});
 box('seat','Seat','seat',[450,450,30],[0,0,435]);
 [[-210,-210],[210,-210],[-210,210],[210,210]].forEach(([x,y],i)=>box(`leg${i+1}`,`Leg ${i+1}`,'leg',[30,30,420],[x,y,210]));
 [-210,210].forEach((x,i)=>box(`post${i+1}`,`Backrest post ${i+1}`,'backrest_post',[30,30,400],[x,210,650]));
 [550,675,800].forEach((z,i)=>box(`slat${i+1}`,`Backrest slat ${i+1}`,'backrest_slat',[390,20,40],[0,210,z]));
 const spec={part_type:'assembly',schema_version:1,units:'mm',coordinates:'right-handed-z-up-xyz-degrees',name:'Chair',concept:'custom',assumptions:[],components:parts};
 let sends=0,approved=false;
 await page.route('**/api/config',route=>route.fulfill({json:{mode:'LIVE_AGENT',ai_configured:true,modeling_contract_version:2,build_revision:'browser-test'}}));
 await page.route('**/api/jobs',async route=>{
  const payload=route.request().postDataJSON();
  if(payload.confirm_job_id){expect(payload.confirm_job_id).toBe('chair-corrected');approved=true;const result=await request.post('/api/jobs',{data:{session_id:payload.session_id,spec}});expect(result.ok()).toBe(true);return route.fulfill({json:await result.json()});}
  const corrected=++sends===2;const components=corrected?parts:parts.slice(0,7);
  return route.fulfill({json:{id:corrected?'chair-corrected':'chair-original',status:'clarification',workflow:'concept',modeling_contract_version:corrected?2:1,events:[],message:'Review this chair',proposed_spec:{...spec,components},brief:{name:'Chair',requirements:{purpose:corrected?'sitting':'walking',form:null,tasks:[],size:corrected?'seat surface height: 450 mm; seat thickness: 30 mm; leg length: 420 mm':'450 mm'},primary_component:'Seat',primary_dimensions:'450 × 450 × 30 mm',overall_dimensions_mm:[450,450,850],components:components.map(c=>c.name),component_details:components.map(c=>({id:c.id,name:c.name,primitive:c.primitive,dimensions_mm:c.dimensions,position_mm:c.position_mm})),assumptions:[],solid_components:components.length}}});
 });
 await page.goto('/');const composer=page.getByRole('textbox',{name:'Description or follow-up edit'});const send=page.getByRole('button',{name:'Send message',exact:true});
 await composer.fill('Create a chair');await send.click();await expect(page.locator('.agreed-requirements')).toContainText('Walking robot');await expect(page.locator('.approval-hint[role=status]')).toContainText('older design system');await expect(page.getByRole('button',{name:'Build this concept',exact:true})).toBeDisabled();
 await composer.fill('For sitting, not walking. Include three backrest slats, 420 mm legs under a 30 mm seat at 450 mm. Keep overall 450 × 450 × 850 mm.');await send.click();
 await expect(page.locator('.agreed-requirements')).toContainText('Sitting');await expect(page.locator('.agreed-requirements')).toContainText('leg length: 420 mm');
 const inventory=page.locator('details').filter({hasText:'Backrest slat 3'});await inventory.locator('summary').click();
 for(let i=1;i<=3;i++)await expect(inventory.getByRole('listitem').filter({hasText:`Backrest slat ${i}`})).toBeVisible();
 await expect(inventory.getByRole('listitem')).toHaveCount(10);await expect(inventory.getByRole('listitem').filter({hasText:'Leg 1'})).toContainText('z: 420 mm');
 await page.getByRole('button',{name:'Build this concept',exact:true}).click();
 await expect(page.locator('.preview-panel .viewport')).toHaveAttribute('data-preview-state','ready',{timeout:80000});expect(approved).toBe(true);
});
