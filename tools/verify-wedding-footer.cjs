const fs = require('fs'), assert = require('assert/strict');
const {chromium} = require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.DUNNIO_PREVIEW_URL || 'http://127.0.0.1:4173/';
const files = ['v3.1-wedding-story.html', 'v3.2-wedding-story.html'];
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const report = {date:'2026-10-14', base, checks:[], errors:[]};
  fs.mkdirSync('.local/wedding-footer', {recursive:true});
  try {
    for (const file of files) {
      const context = await browser.newContext({viewport:{width:1440,height:900},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
      const page = await context.newPage();
      page.on('pageerror', e => report.errors.push(e.message));
      await page.goto(base+file, {waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      const cdp = await context.newCDPSession(page);
      for (const [width,height] of [[1032,1376],[1376,1032],[820,1180],[768,1024],[440,956],[390,844],[1440,900]]) {
        await page.setViewportSize({width,height});
        await page.waitForTimeout(100);
        // Start above the footer and reach the end with real touch input, not scrollIntoView.
        await page.evaluate(()=>window.scrollTo({top:document.querySelector('.usp-section').offsetTop-150,behavior:'instant'}));
        for (let attempt=0;attempt<5;attempt++) {
          const done = await page.evaluate(()=>scrollY+innerHeight>=document.scrollingElement.scrollHeight-2);
          if(done) break;
          await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:width/2,y:height-150}]});
          for(let y=height-180;y>=150;y-=80){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:width/2,y}]});await page.waitForTimeout(15);}
          await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
          await page.waitForTimeout(150);
        }
        const state=await page.evaluate(()=>{
          const footer=document.querySelector('footer'),r=footer.getBoundingClientRect(),last=footer.querySelector('.footer-bottom a:last-child').getBoundingClientRect();
          return {scrollY,viewportHeight:innerHeight,scrollHeight:document.scrollingElement.scrollHeight,overflow:getComputedStyle(document.body).overflow,footerTop:r.top,footerBottom:r.bottom,footerHeight:r.height,lastLinkTop:last.top,lastLinkBottom:last.bottom,drawerHidden:document.getElementById('mobile-nav').hidden,colors:[...document.querySelectorAll('.usp-item')].map(e=>({background:getComputedStyle(e).backgroundColor,text:getComputedStyle(e).color,heading:getComputedStyle(e.querySelector('h3')).color,paragraph:getComputedStyle(e.querySelector('p')).color}))};
        });
        assert.notEqual(state.overflow,'hidden');assert(state.drawerHidden);
        assert(state.scrollY+height>=state.scrollHeight-2,`${file} ${width}: touch scrolling reaches document end`);
        assert(state.footerTop<height&&state.footerBottom>64,`${file} ${width}: footer intersects viewport`);
        assert(state.lastLinkTop>=64&&state.lastLinkBottom<=height,`${file} ${width}: last footer link is accessible`);
        const navy='rgb(11, 31, 58)',gold='rgb(200, 169, 106)';
        const expected=width<640?[navy,gold,gold,navy]:[navy,gold,navy,gold];
        assert.deepEqual(state.colors.map(c=>c.background),expected);
        for(let i=0;i<4;i++){const foreground=expected[i]===navy?gold:navy;for(const key of ['text','heading','paragraph'])assert.equal(state.colors[i][key],foreground);}
        if(width===1032||width===440){
          await page.screenshot({path:`.local/wedding-footer/${file}-${width}-footer.png`});
          await page.locator('.usp-section').screenshot({path:`.local/wedding-footer/${file}-${width}-usp.png`,style:'.site-header,.mobile-cta{visibility:hidden}'});
        }
        report.checks.push({file,width,height,...state});
      }
      await context.close();
    }
    assert.deepEqual(report.errors,[]);
    report.status='passed';report.limitations=['Chrome touch emulation; not physical iPad hardware.','Device emulation must fit inside the DevTools canvas to display the complete emulated viewport. A fixed 75% zoom can crop a tall iPad viewport even at the document end.'];
    fs.writeFileSync('docs/wedding-footer-verification.json',JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify({status:report.status,checks:report.checks.length,errors:report.errors}));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
