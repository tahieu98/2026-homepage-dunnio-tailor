const fs = require('fs'), assert = require('assert/strict');
const {chromium} = require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.DUNNIO_PREVIEW_URL || 'http://127.0.0.1:4173/';
const files = ['v3.1-wedding-story.html','v3.2-wedding-story.html'];
(async () => {
  const browser = await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const report = {date:'2026-10-14',base,viewports:[],checks:[],errors:[]};
  fs.mkdirSync('.local/wedding-qa', {recursive:true});
  try {
    const page = await browser.newPage({reducedMotion:'reduce'});
    page.on('pageerror', e => report.errors.push(e.message));
    for (const file of files) for (const [width,height] of [[320,568],[375,667],[390,844],[440,956],[639,844],[640,900],[820,1180],[1024,768],[1440,900]]) {
      await page.setViewportSize({width,height});
      const response = await page.goto(base+file, {waitUntil:'networkidle'});
      assert.equal(response.status(),200);
      await page.evaluate(()=>document.fonts.ready);
      const state = await page.evaluate(() => {
        const rect = s => {const r=document.querySelector(s).getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height}};
        return {overflow:document.documentElement.scrollWidth>innerWidth+1,hero:rect('.hero'),image:rect('[data-banner] img'),controls:rect('.banner-controls'),copy:rect('.hero-copy'),cta:rect('.hero-copy .button'),prev:rect('[data-banner-prev]'),next:rect('[data-banner-next]'),gallery:rect('.gallery-section-inner'),galleryCount:[...document.querySelectorAll('.gallery-item')].filter(e=>getComputedStyle(e).display!=='none').length,reviewRows:new Set([...document.querySelectorAll('.review-item')].map(e=>Math.round(e.getBoundingClientRect().top))).size,sections:[...document.querySelector('main').children].map(e=>e.className),badLocalLinks:[...document.querySelectorAll('a[href^="#"]')].map(e=>e.hash).filter(hash=>!document.getElementById(hash.slice(1)))};
      });
      assert.equal(state.overflow,false,`${file} ${width}: page overflow`);
      assert.equal(state.badLocalLinks.length,0);
      assert(state.controls.top>=state.image.bottom-1,`${file}: controls must be immediately below image`);
      assert.equal(state.reviewRows,1);
      assert.equal(await page.locator('.service-section,.planner-section,.process-section,.fabrics-section,.products .fine').count(),0);
      assert.equal(await page.locator('.site-header .wordmark a,.site-header a.wordmark,.drawer-header a').count(),0);
      assert.equal(await page.locator('.review-item').count(),6);
      const expected = ['hero hero-3 fashion-hero hockerty-hero',...(file.includes('3.1')?['section occasions-section']:[]),'section products','section studio-section','section looks-section','section craft-section','section community-section','section gallery-section',...(file.includes('3.1')?['section faq-section']:[]),'closing-section'];
      assert.deepEqual(state.sections.map(s=>s.replace(' hero-copy-outside','')),expected);
      if(width<640){
        assert.equal(state.galleryCount,4);
        const sticky = await page.locator('.mobile-cta').evaluate(e=>e.getBoundingClientRect().height);
        assert(state.gallery.height<=height-64-sticky+1,`${file} ${width}: gallery must fit below header and above sticky CTA`);
        if(file.includes('3.1')){
          assert(Math.abs(state.image.width/state.image.height-.8)<.005);
          assert(state.copy.top>=state.controls.bottom-1);
          assert(Math.abs((state.prev.left+state.next.right)/2-width/2)<1);
          assert(await page.locator('.occasion-grid').evaluate(e=>e.scrollWidth>e.clientWidth));
          assert.equal(await page.locator('.hero .eyebrow').isVisible(),true);
        } else {
          assert(state.hero.bottom<=height+1,`${file} ${width}: complete hero in first viewport`);
          assert(state.cta.bottom<=state.image.bottom);
          assert.equal(state.prev.left,20);assert.equal(width-state.next.right,20);
          assert.equal(await page.locator('.hero .eyebrow').isVisible(),false);
        }
        const eyebrow = await page.locator('.products .eyebrow').evaluate(e=>({before:getComputedStyle(e,'::before').width,after:getComputedStyle(e,'::after').width}));
        assert.equal(eyebrow.before,eyebrow.after);
      } else assert.equal(state.galleryCount,7);
      await page.locator('[data-banner-next]').click();
      await page.waitForFunction(()=>document.querySelector('[data-banner-count]').textContent==='2 / 2'&&document.querySelector('[data-banner] img').complete);
      const secondSource=file.includes('3.2')&&width>=1200?'wedding-story-v3.2-16x7-01.webp':'wedding-story-b-';
      assert(await page.locator('[data-banner] img').evaluate((e,expected)=>e.currentSrc.includes(expected),secondSource));
      await page.locator('[data-banner-prev]').click();
      assert.equal(await page.locator('[data-banner-count]').innerText(),'1 / 2');
      if(width===390||width===1440){
        await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
        await page.mouse.move(0,0);
        await page.screenshot({path:`.local/wedding-qa/${file}-${width}-hero.png`});
        for (const selector of ['.gallery-section','.usp-section','.community-section']) {
          await page.locator(selector).scrollIntoViewIfNeeded();
          await page.waitForFunction(selector=>[...document.querySelector(selector).querySelectorAll('img')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.left<innerWidth&&r.right>0&&r.top<innerHeight&&r.bottom>0}).every(e=>e.complete&&e.naturalWidth>0),selector);
          await page.locator(selector).screenshot({path:`.local/wedding-qa/${file}-${width}-${selector.slice(1)}.png`,style:'.site-header,.skip-link,.mobile-cta{visibility:hidden}'});
        }
      }
      report.viewports.push({file,width,height,...state});
    }
    for (const file of files) {
      await page.setViewportSize({width:390,height:844});await page.goto(base+file);
      for (const target of ['product-rail','look-rail','review-rail']) {
        await page.locator(`[data-target="${target}"][data-scroll="1"]`).click();
        await page.waitForFunction(id=>document.getElementById(id).scrollLeft>0,target);
        await page.locator(`[data-target="${target}"][data-scroll="-1"]`).click();
        await page.waitForFunction(id=>document.getElementById(id).scrollLeft<2,target);
      }
      for (const width of [820,1440]) {
        await page.setViewportSize({width,height:1000});
        await page.locator('[data-target="review-rail"][data-scroll="1"]').click();
        await page.waitForFunction(()=>document.getElementById('review-rail').scrollLeft>0);
        await page.locator('[data-target="review-rail"][data-scroll="-1"]').click();
        await page.waitForFunction(()=>document.getElementById('review-rail').scrollLeft<2);
      }
      await page.setViewportSize({width:390,height:844});
      await page.locator('[data-style="grey"]').click();
      assert.equal(await page.locator('#studio-caption').innerText(),'Grey · 2-piece suit');
      await page.locator('[data-detail="lining"]').click();
      assert((await page.locator('#detail-copy').innerText()).includes('lining'));
      await page.locator('.menu-toggle').click();assert(await page.locator('#mobile-nav').isVisible());
      await page.locator('.menu-close').click();assert.equal(await page.locator('#mobile-nav').isVisible(),false);
      if(file.includes('3.1')){await page.locator('.faq-list summary').first().click();assert(await page.locator('.faq-list details').first().getAttribute('open')!==null);}
      const footerOriginal = fs.readFileSync('v3-wedding-story.html','utf8').match(/<footer[\s\S]*?<\/footer>/)[0].replace(/>\s+</g,'><');
      const footerVariant = fs.readFileSync(file,'utf8').match(/<footer[\s\S]*?<\/footer>/)[0].replace(/>\s+</g,'><');
      assert.equal(footerVariant,footerOriginal);
    }
    assert.deepEqual(report.errors,[]);
    report.status='passed';report.checks=['18 responsive viewports; no page overflow','Section order, variant omissions and unchanged footer','Banner controls placement, manual next/previous and slide count','v3.1 4:5 mobile images and horizontal occasions','v3.2 first-viewport hero and 20px button edge spacing','Mobile balanced eyebrow, four gallery images and gallery fitting between header and sticky CTA','One-row manual reviews; products/looks/reviews navigation','Studio swatches and details, mobile menu and FAQ'];
    report.limitations=['Chrome responsive emulation; not a physical device test','v3.2 mobile artwork uses a cropped viewport-dependent frame; v3.1 preserves the whole 4:5 image'];
    fs.writeFileSync('docs/wedding-story-verification.json',JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify({status:report.status,viewports:report.viewports.length,checks:report.checks.length,errors:report.errors}));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
