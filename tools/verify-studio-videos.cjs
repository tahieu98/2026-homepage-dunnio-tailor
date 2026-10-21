/* Validate source integrity and read-only browser observations captured during responsive QA. */
const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const assets=JSON.parse(fs.readFileSync('docs/studio-video-assets.json','utf8')).assets;
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
for(const a of assets){assert.equal(hash(a.file),a.sha256);if(fs.existsSync(a.source))assert.equal(hash(a.source),a.sha256);assert(fs.statSync(a.poster).size>0);}
for(const file of ['v3.1-wedding-story.html','v3.2-wedding-story.html']){
 const html=fs.readFileSync(file,'utf8'),studio=html.match(/<section class="section studio-section"[\s\S]*?<\/section>/)[0];
 assert.equal((studio.match(/<video\b/g)||[]).length,1);
 assert.equal((studio.match(/<source\b/g)||[]).length,3);
 assert(!studio.includes('data-style')&&!studio.includes('data-detail'));
 assert(studio.includes('controls muted loop playsinline preload="none"'));
 assert(studio.includes('https://dunniotailor.com/3d-custom-outfit/suits.html'));
 assert(html.includes('assets/studio-video.js?v=request21-r1'));
 for(const a of assets)assert(studio.includes(a.file));
}
const templates=JSON.parse(fs.readFileSync('tools/templates/wedding-shared-sections.json','utf8'));
for(const key of ['section products','section craft-section','section looks-section'])assert(typeof templates[key]==='string'&&templates[key].length>0,'Missing section template: '+key);
const matrix=JSON.parse(fs.readFileSync(process.env.DUNNIO_STUDIO_MATRIX||'.local/studio-video/matrix.json','utf8'));
assert.equal(matrix.length,16);
for(const row of matrix){
 const a=assets.find(a=>a.device===(row.viewport.width>=1200?'desktop':row.viewport.width>=640?'tablet':'mobile'));
 assert.equal(row.device,a.device);assert.equal(row.src,a.file);assert.deepEqual(row.natural,[a.width,a.height]);
 assert(Math.abs(row.duration-a.durationSeconds)<.02);
 assert(Math.abs(row.frame.width/row.frame.height-a.ratio)<.003);
 assert(row.controls&&row.muted&&row.inline&&row.loop);assert.equal(row.fit,'contain');assert.equal(row.error,null);assert.equal(row.overflow,false);
}
fs.writeFileSync('docs/studio-video-verification.json',JSON.stringify({date:'2026-10-15',status:'passed',method:'Read-only browser DOM observations with viewport capability; asset hashes checked locally.',assetCount:assets.length,browserCases:matrix,additionalObservedChecks:['PC/tablet/mobile playback advances with the correct video duration and dimensions','Native keyboard pause remains paused after scrolling away and returning','Offscreen video pauses; the initial offscreen video remains unloaded at readyState 0','Navigation opens and closes after the studio change','No browser error logs on the checked local preview'],limits:['Chrome desktop emulation, not physical iOS/Android devices','Reduced-motion and Save-Data guards inspected in code; preference-specific browser simulation was not performed','Full legacy Wedding Story and documentation browser suites were not rerun for this change']},null,2)+'\n');
console.log(JSON.stringify({status:'passed',assets:assets.length,browserCases:matrix.length}));
