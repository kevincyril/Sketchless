import {test,expect} from '@playwright/test';

test('saved sample gallery needs no backend and exports actual CAD',async({page})=>{
 const api:string[]=[],errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',route=>{api.push(route.request().url());return route.abort();});
 await page.goto('/gallery.html');
 await expect(page.getByRole('heading',{name:'Explore the idea. Inspect the model.'})).toBeVisible();
 await expect(page.locator('.gallery-status')).toContainText('not new AI output');
 await expect(page.locator('.gallery-choices button')).toHaveCount(5);
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 await expect(page.locator('.gallery-model-title')).toContainText('Four-legged robot');
 await page.getByRole('button',{name:'Mounting bracket',exact:false}).click();
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download STEP',exact:true}).click()]);
 expect(await download.failure()).toBeNull();
 await page.getByRole('button',{name:'Robot vacuum',exact:false}).click();
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 await page.screenshot({path:'../docs/screenshots/sample-gallery.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await expect(page.getByRole('link',{name:'Editable design JSON',exact:true})).toBeVisible();
 expect(api).toEqual([]);expect(errors).toEqual([]);
});

test('unavailable API falls back to honest samples without discarding browser drafts',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('sketchless-session','saved-session');localStorage.setItem('sketchless-prompt:saved-session','An unfinished design');});
 await page.route('**/api/**',route=>route.fulfill({status:503,body:'Service unavailable'}));
 await page.goto('/');
 await expect(page.getByRole('status')).toContainText('Live workspace is unavailable');
 await expect(page.locator('.viewport')).toHaveAttribute('data-preview-state','ready');
 await expect(page.getByRole('button',{name:'Retry live workspace',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>localStorage.getItem('sketchless-prompt:saved-session'))).toBe('An unfinished design');
});
