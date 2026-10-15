/* Validate the final structure and responsive observations captured through the browser. */
const fs=require('fs'),assert=require('assert/strict'),{execFileSync}=require('child_process');
const html=fs.readFileSync('v3.2-wedding-story.html','utf8');
for(const absent of ['class="banner-controls"','class="rail-controls"','class="detail-line"','wedding-story-v32-banners.js'])assert(!html.includes(absent),absent);
assert(html.includes('data-autoplay-delay="6000"'));
assert(html.includes('src="assets/banners/wedding-story-a-7x4.webp" width="1600" height="914"'));
assert(html.includes('class="community-review-action"'));
assert(html.includes('class="button outfit-ideas-button"'));
const old31=execFileSync('git',['show','HEAD:v3.1-wedding-story.html'],{encoding:'utf8'});
assert.equal(fs.readFileSync('v3.1-wedding-story.html','utf8').replace(/\r\n/g,'\n'),old31.replace(/\r\n/g,'\n'));
const footer=s=>s.match(/<footer[\s\S]*?<\/footer>/)[0].replace(/>\s+</g,'><');
assert.equal(footer(html),footer(old31));
const matrix=JSON.parse(fs.readFileSync(process.env.DUNNIO_FINAL_MATRIX||'.local/request22/matrix.json','utf8'));
assert.equal(matrix.length,11);
for(const row of matrix){
 const w=row.viewport.width,v=row.viewport.height;
 assert.equal(row.overflow,false);assert.equal(row.bannerControls,0);assert.equal(row.removed,0);
 assert.equal(row.outfitColors.background,'rgb(200, 169, 106)');assert.equal(row.outfitColors.color,'rgb(17, 26, 76)');
 assert(row.reviewCTA.top>=row.reviewRail.bottom+19);
 assert(Math.abs((row.reviewCTA.left+row.reviewCTA.right)/2-row.viewport.contentWidth/2)<1);
 assert(row.usp.every(u=>Math.abs(u.width-u.height)<1&&u.scrollHeight<=u.clientHeight+1));
 if(w<640){
  assert.deepEqual(row.eyebrowSizes,['16px']);assert.deepEqual(row.paragraphSizes,['14px']);
  assert(Math.abs((row.studioCTA.left+row.studioCTA.right)/2-row.viewport.contentWidth/2)<1);
  assert(Math.abs(row.image.height-Math.max(240,Math.min(row.image.width*7/4,v-64)))<1);
  assert.deepEqual(row.usp.map(u=>u.background),['rgb(11, 31, 58)','rgb(200, 169, 106)','rgb(200, 169, 106)','rgb(11, 31, 58)']);
 }else{
  assert(Math.abs(row.image.width/row.image.height-(w>=1200?7/4:5/3))<.001);
  assert(row.image.source.includes(w>=1200?'7x4.webp':'5x3.webp'));
 }
}
const interactions=JSON.parse(fs.readFileSync('.local/request22/interactions.json','utf8'));
assert(interactions.automatic.transitions>0&&interactions.automatic.delay===6000);
assert.equal(interactions.pausedBefore.state,'paused');assert.equal(interactions.pausedAfter.state,'paused');
assert.equal(interactions.pausedBefore.transitions,interactions.pausedAfter.transitions);
assert(interactions.rails.every(r=>r.left>0));
fs.writeFileSync('docs/wedding-final-verification.json',JSON.stringify({date:'2026-10-16',status:'passed',scope:'Final v3.2, Request 22; v3.1 HTML and the footer remain unchanged',matrix,interactions,limits:['Chrome desktop responsive testing; not physical-device or screen-reader certification','Earlier broad suites remain dated evidence; this check targets the final layout']},null,2)+'\n');
console.log(JSON.stringify({status:'passed',viewports:matrix.length,v31Unchanged:true,footerUnchanged:true}));
