import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';

for(const name of ['lamp','chair'])test('custom '+name+' imports, rebuilds and previews without AI',async({page})=>{
 const design=JSON.parse(await readFile('../examples/variety/'+name+'/design.json','utf8'));
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/config',route=>route.fulfill({json:{mode:'DEMO_MODE',ai_configured:false}}));
 await page.route('**/api/jobs',route=>{const data=route.request().postDataJSON();expect(data.spec).toBeTruthy();return route.continue();});
 await page.goto('/');await page.getByRole('button',{name:'My designs',exact:true}).click();
 await page.getByLabel('Open Sketchless design file').setInputFiles('../examples/variety/'+name+'/design.json');
 await page.getByRole('button',{name:'Rebuild imported scene'}).click();
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready',{timeout:80000});
 await expect(page.locator('.component-tree [data-component-id]')).toHaveCount(design.spec.components.length);
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:'../docs/screenshots/custom-'+name+'.png',fullPage:true});
 expect(errors).toEqual([]);
});
