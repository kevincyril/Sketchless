import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./e2e',timeout:240000,workers:1,use:{baseURL:'http://127.0.0.1:8001',headless:true,launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']},viewport:{width:1440,height:900}},webServer:{command:(process.platform==='win32'?'".venv/Scripts/python.exe"':'".venv/bin/python"')+' -m scripts.e2e_server --port 8001',cwd:'..',url:'http://127.0.0.1:8001/api/config',reuseExistingServer:false,timeout:120000},reporter:[['list'],['json',{outputFile:'../docs/browser-results.json'}]]});


