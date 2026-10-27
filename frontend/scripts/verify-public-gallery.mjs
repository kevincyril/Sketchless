import {chromium} from '@playwright/test';
const url=process.env.SKETCHLESS_GALLERY_URL||'https://kevincyril.github.io/Sketchless/';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],api=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('request',request=>{if(new URL(request.url()).pathname.includes('/api/'))api.push(request.url());});
 const response=await page.goto(url,{waitUntil:'networkidle'});
 if(response.status()!==200)throw Error('Gallery did not load.');
 const choices=page.getByRole('navigation',{name:'Sample models'}).getByRole('button');
 if(await choices.count()!==5)throw Error('Expected five saved CAD examples.');
 for(let i=0;i<5;i++){
  await choices.nth(i).click();await page.waitForTimeout(1200);
  const link=page.getByRole('link',{name:'Download STEP',exact:true});
  const file=await page.request.get(new URL(await link.getAttribute('href'),page.url()).href);
  if(file.status()!==200||!(await file.text()).startsWith('ISO-10303-21'))throw Error('Invalid STEP download.');
 }
 await choices.filter({hasText:'robot'}).first().click();await page.waitForTimeout(1200);
 await page.screenshot({path:'../docs/screenshots/sample-gallery.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile horizontal overflow.');
 if(errors.length||api.length)throw Error('Unexpected JavaScript errors or API requests.');
 console.log(JSON.stringify({url,examples:5,step_downloads:5,javascript_errors:0,api_requests:0,mobile_overflow:false}));
}finally{await browser.close();}
