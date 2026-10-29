import {chromium,expect} from '../frontend/node_modules/@playwright/test/index.mjs';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
const [base,revision,reportName='data/chair-browser-verification.json',privateStateName]=process.argv.slice(2);
if(!base||!revision)throw Error('Usage: node scripts/verify_chair_browser.mjs BASE_URL EXPECTED_REVISION [REPORT]');
const report=resolve(reportName);
try{await access(report);throw Error('Report already exists. Inspect it before sending more Gemini requests.');}catch(error){if(error.code!=='ENOENT')throw error;}
const prompts=JSON.parse(await readFile(new URL('../tests/fixtures/chair_request.json',import.meta.url),'utf8'));
const state={base_url:base,revision,prompts,phases:{},passed:false,interpretation_requests:0,javascript_errors:[]};
await mkdir(dirname(report),{recursive:true});
// Optional private browser state must already exist with restricted local permissions.
// It contains the synthetic test visitor cookie, never Gemini or management keys.
if(privateStateName)await access(resolve(privateStateName));
let context;
const save=async()=>{await writeFile(report,JSON.stringify(state,null,2));if(context&&privateStateName)await context.storageState({path:resolve(privateStateName)});};await save();
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 context=await browser.newContext({viewport:{width:1440,height:1100}});const page=await context.newPage();
 page.on('pageerror',e=>state.javascript_errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle',timeout:120000});
 await expect(page.locator('.easy-app')).toHaveAttribute('data-build-revision',revision);
 await expect(page.locator('.easy-app')).toHaveAttribute('data-modeling-contract','2');
 const config=await context.request.get(base+'/api/config');state.config=await config.json();await save();
 const composer=page.getByRole('textbox',{name:'Description or follow-up edit'});
 async function action(phase,button){
  const started=Date.now();
  const [response]=await Promise.all([page.waitForResponse(r=>new URL(r.url()).pathname==='/api/jobs'&&r.request().method()==='POST'),button.click()]);
  const payload=response.request().postDataJSON();assert.equal(response.status(),202,await response.text());
  let job=await response.json();state.phases[phase]={request:payload,job_id:job.id};await save();
  while(Date.now()-started<360000){
   const result=await context.request.get(base+'/api/jobs/'+job.id);assert.equal(result.status(),200);job=await result.json();
   if(!['queued','generating'].includes(job.status))break;
   await new Promise(resolve=>setTimeout(resolve,1500));
  }
  state.phases[phase].result=job;state.phases[phase].seconds=(Date.now()-started)/1000;await save();
  if(job.status==='failed')throw Error(job.message);return job;
 }
 function verifyGeometry(job,thickness,leg){
  const spec=job.proposed_spec||job.spec,parts=spec.components;
  const seat=parts.find(c=>c.role==='seat'||c.name.toLowerCase()==='seat');
  const legs=parts.filter(c=>c.primitive!=='group'&&/\bleg/.test((c.role+' '+c.name).toLowerCase().replaceAll('_',' ')));
  const slats=parts.filter(c=>(c.role+' '+c.name+' '+c.id).toLowerCase().includes('slat'));
  assert.equal(slats.length,3);assert.equal(legs.length,4);assert.equal(seat.dimensions.z_mm,thickness);
  assert.equal(seat.position_mm[2]+thickness/2,450);
  for(const c of legs){assert.equal(c.dimensions.z_mm,leg);assert.equal(c.position_mm[2]-leg/2,0);assert.equal(c.position_mm[2]+leg/2,450-thickness);}
  return spec;
 }
 async function confirmation(phase,description,thickness,leg){
  await composer.fill(description);state.interpretation_requests++;await save();
  const job=await action(phase,page.getByRole('button',{name:'Send message',exact:true}));assert.equal(job.status,'clarification');
  assert.equal(job.brief.requirements.purpose,'sitting');assert.deepEqual(job.brief.overall_dimensions_mm,[450,450,850]);
  verifyGeometry(job,thickness,leg);
  await expect(page.locator('.agreed-requirements')).toContainText('Sitting');
  const inventory=page.locator('.proposal-details');await inventory.locator('summary').click();
  const parts=job.proposed_spec.components.filter(c=>c.primitive!=='group');assert.deepEqual(job.brief.components,parts.map(c=>c.name));
  await expect(inventory.getByRole('listitem')).toHaveCount(parts.length);
  for(const c of parts.filter(c=>(c.role+' '+c.name).toLowerCase().includes('slat')))await expect(inventory.getByRole('listitem').filter({hasText:c.name})).toBeVisible();
  await expect(inventory).toContainText('z: '+leg+' mm');
  const screenshot=resolve('docs/screenshots/'+phase+'.png');await page.screenshot({path:screenshot,fullPage:true});
  state.phases[phase].browser_confirmation_verified=true;state.phases[phase].screenshot='docs/screenshots/'+phase+'.png';await save();return job;
 }
 async function build(phase,proposal,thickness,leg){
  const job=await action(phase,page.getByRole('button',{name:'Build this concept',exact:true}));
  assert.equal(job.status,'succeeded');assert.equal(state.phases[phase].request.confirm_job_id,proposal.id);
  assert.deepEqual(job.spec,proposal.proposed_spec);verifyGeometry(job,thickness,leg);
  assert.ok(Object.values(job.inspection.checks).every(Boolean));job.inspection.bounding_box_mm.forEach((v,i)=>assert.ok(Math.abs(v-[450,450,850][i])<.01));
  const response=await context.request.get(base+'/api/artifacts/'+job.id+'/scene');assert.equal(response.status(),200);const artifact=await response.json();
  assert.deepEqual(artifact.components,job.spec.components);assert.equal(artifact.meshes.length,job.spec.components.filter(c=>c.primitive!=='group').length);
  await expect(page.locator('.preview-panel .viewport')).toHaveAttribute('data-preview-state','ready',{timeout:90000});
  state.phases[phase].cad_worker_components_verified=true;state.phases[phase].actual_cad_preview_verified=true;await save();return job;
 }
 const first=await confirmation('chair-live-confirmation',prompts.description,30,420);
 const built=await build('initial_build',first,30,420);
 const revised=await confirmation('chair-live-correction',prompts.follow_up,40,410);
 assert.notDeepEqual(revised.proposed_spec,first.proposed_spec);
 const before=new Map(built.spec.components.map(c=>[c.id,c]));assert.deepEqual([...before.keys()],revised.proposed_spec.components.map(c=>c.id));
 for(const c of revised.proposed_spec.components){const label=(c.role+' '+c.name).toLowerCase();if(!label.includes('seat')&&!label.includes('leg'))assert.deepEqual(c,before.get(c.id));}
 await build('followup_build',revised,40,410);
 await page.screenshot({path:resolve('docs/screenshots/chair-live-built.png'),fullPage:true});
 assert.deepEqual(state.javascript_errors,[]);state.passed=true;await save();
 console.log(JSON.stringify({passed:true,revision,interpretation_requests:state.interpretation_requests,phases:Object.fromEntries(Object.entries(state.phases).map(([k,v])=>[k,{status:v.result.status,seconds:v.seconds}]))}));
}catch(error){state.error=error.message;await save();console.error('Live browser verification stopped: '+error.message);process.exitCode=1;}
finally{await browser.close();}
