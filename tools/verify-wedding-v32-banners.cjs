const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const {chromium}=require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base=process.env.DUNNIO_PREVIEW_URL||'http://127.0.0.1:4173/';
const desktop=['wedding-story-a-7x4.webp','wedding-story-b-7x4.webp'];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const report={date:'2026-10-16',base,viewports:[],checks:[],errors:[]};
 fs.mkdirSync('.local/wedding-v32-22',{recursive:true});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});page.on('pageerror',e=>report.errors.push(e.message));
  async function imageReady(expected){await page.waitForFunction(name=>{const e=document.querySelector('[data-banner] img');return e.currentSrc.includes(name)&&e.complete&&e.naturalWidth>0},expected);await page.evaluate(()=>document.fonts.ready);}
  for(const [width,height] of [[1200,900],[1440,900],[1920,1080],[1199,900],[1032,1376],[820,1180],[440,956],[390,844],[375,667]]){
   await page.setViewportSize({width,height});await page.goto(base+'v3.2-wedding-story.html',{waitUntil:'networkidle'});if(await page.getByRole('button',{name:'Pause banner slideshow',exact:true}).count())await page.getByRole('button',{name:'Pause banner slideshow',exact:true}).click();
   for(let index=0;index<2;index++){
    const expected=width>=1200?desktop[index]:`wedding-story-${index?'b':'a'}-${width>=640?'5x3':'4x5'}.webp`;
    await imageReady(expected);
    const state=await page.evaluate(()=>{
     const img=document.querySelector('[data-banner] img'),r=img.getBoundingClientRect(),cta=document.querySelector('.hero-copy .button').getBoundingClientRect();
     return {source:img.currentSrc,natural:[img.naturalWidth,img.naturalHeight],width:r.width,height:r.height,cta:{top:cta.top,bottom:cta.bottom,left:cta.left,right:cta.right},overflow:document.documentElement.scrollWidth>innerWidth+1,heroBottom:document.querySelector('.hero').getBoundingClientRect().bottom,count:document.querySelector('[data-banner]').dataset.slide};
    });
    assert.equal(state.count,String(index+1));assert.equal(state.overflow,false);
    assert(Math.abs(state.width-width)<1);
    if(width>=1200){assert.deepEqual(state.natural,[1600,914]);assert(Math.abs(state.width/state.height-7/4)<.001);}
    else if(width>=640){assert.deepEqual(state.natural,[1600,960]);assert(Math.abs(state.width/state.height-5/3)<.001);}
    else{assert.deepEqual(state.natural,[1122,1402]);assert(Math.abs(state.height-Math.max(240,Math.min(state.width*1.75,height-64)))<1);}
    if(width===1440||width===440){await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`.local/wedding-v32-22/${width}-slide-${index+1}.png`});}
    report.viewports.push({viewport:{width,height},slide:index+1,...state});
    if(index===0)await page.evaluate(()=>document.querySelector('[data-banner]').dispatchEvent(new CustomEvent('dunnio:banner-step',{detail:1})));
   }
   await page.evaluate(()=>document.querySelector('[data-banner]').dispatchEvent(new CustomEvent('dunnio:banner-step',{detail:-1})));
   await imageReady(width>=1200?desktop[0]:`wedding-story-a-${width>=640?'5x3':'4x5'}.webp`);
  }
  // Preserve slide index and device-specific source after resizing the same page.
  await page.setViewportSize({width:1440,height:900});await page.goto(base+'v3.2-wedding-story.html');await imageReady(desktop[0]);await page.evaluate(()=>document.querySelector('[data-banner]').dispatchEvent(new CustomEvent('dunnio:banner-step',{detail:1})));await imageReady(desktop[1]);
  for(const [width,height,source] of [[820,1180,'wedding-story-b-5x3.webp'],[440,956,'wedding-story-b-4x5.webp'],[1440,900,desktop[1]]]){await page.setViewportSize({width,height});await imageReady(source);assert.equal(await page.locator('[data-banner]').getAttribute('data-slide'),'2');}
  for(const file of ['v3-wedding-story.html','v3.1-wedding-story.html']){
   await page.goto(base+file);await imageReady('wedding-story-a-7x4.webp');assert(await page.locator('[data-banner] img').evaluate(e=>Math.abs(e.clientWidth/e.clientHeight-1600/914)<.005));
   assert.equal(await page.locator('script[src*="wedding-story-v32-banners"]').count(),0);
  }
  const staticContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});
  const staticPage=await staticContext.newPage();await staticPage.goto(base+'v3.2-wedding-story.html');assert(await staticPage.locator('[data-banner] img').evaluate(e=>e.complete&&e.naturalWidth===1600&&e.naturalHeight===914&&Math.abs(e.clientWidth/e.clientHeight-7/4)<.005));await staticContext.close();
  report.assets=desktop.map(name=>{
   const file=`assets/banners/${name}`;
   const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
   // Shared 7:4 files are reused from v3.1; no new image processing.
   return {reusedFrom:'v3.1 desktop',file,sha256:hash(file),bytes:fs.statSync(file).size};
  });
  assert.deepEqual(report.errors,[]);report.status='passed';
  report.checks=['Final v3.2: desktop 7:4, tablet 5:3, mobile 4:7 with viewport cap','Shared slide-step event and slide index preserved across device resizing','v3 and v3.1 retain original desktop 7:4 assets','Desktop first paint is 7:4 with JavaScript disabled','Existing v3.1 desktop 7:4 artwork is reused'];
  report.limitations=['Chrome responsive emulation; not physical-device testing'];
  fs.writeFileSync(process.env.DUNNIO_VERIFICATION_OUTPUT||'docs/wedding-v32-banner-verification.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({status:report.status,viewports:report.viewports.length,checks:report.checks.length,errors:report.errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
