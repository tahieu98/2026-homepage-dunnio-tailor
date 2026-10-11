const fs=require('fs');
const a=JSON.parse(fs.readFileSync('assets/asset-map.json'));
fs.writeFileSync('docs/asset-sheet.html','<html><body style="display:grid;grid-template-columns:repeat(5,1fr);font:14px Arial">'+Object.entries(a).map(([k,v])=>'<div>'+k+'<img src="../'+v+'" style="width:100%;height:180px;object-fit:contain"></div>').join('')+'</body></html>');
const {chromium}=require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});const p=await b.newPage({viewport:{width:1400,height:1400}});await p.goto('file:///C:/laragon/www/dunnio-homepage-concepts/docs/asset-sheet.html');await p.screenshot({path:'docs/asset-sheet.png',fullPage:true});console.log(await p.locator('img').evaluateAll(es=>es.map(e=>({file:e.src.split('/').pop(),w:e.naturalWidth,h:e.naturalHeight}))));await b.close()})();
