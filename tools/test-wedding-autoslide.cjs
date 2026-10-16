/* Deterministic gesture/timer checks without a browser dependency. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/wedding-final.js','utf8');
function setup(width=1440){
 const listeners=new Map(),tasks=new Map(),steps=[];let next=0,capture=null,observer;
 const target=name=>({name,addEventListener(type,fn){listeners.set(name+':'+type,fn);}});
 const media=Object.assign(target('media'),{clientWidth:width,classList:{add(){},remove(){}},setPointerCapture(id){capture=id},hasPointerCapture(id){return capture===id},releasePointerCapture(){capture=null}});
 const banner=Object.assign(target('banner'),{dataset:{autoplayDelay:'6000'},closest:()=>media,dispatchEvent:e=>steps.push(e.detail)});
 const document=Object.assign(target('document'),{hidden:false,querySelector:()=>banner});
 const window=Object.assign(target('window'),{IntersectionObserver:true});
 vm.runInNewContext(source,{document,window,CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail}},setTimeout(fn,ms){const id=++next;tasks.set(id,{fn,ms});return id},clearTimeout:id=>tasks.delete(id),IntersectionObserver:class{constructor(fn){observer=fn}observe(){}}});
 const fire=(type,extra={})=>{const e={isPrimary:true,button:0,pointerId:1,clientX:200,clientY:200,target:{closest:()=>null},preventDefault(){this.prevented=true},stopPropagation(){this.stopped=true},...extra};listeners.get('media:'+type)?.(e);return e};
 const tick=()=>{assert.equal(tasks.size,1);const [id,t]=[...tasks][0];assert.equal(t.ms,6000);tasks.delete(id);t.fn();};
 return {steps,tasks,banner,fire,tick,observer:visible=>observer([{isIntersecting:visible}]),document,visibility:()=>listeners.get('document:visibilitychange')(),key:key=>listeners.get('banner:keydown')({target:banner,key,preventDefault(){}})};
}
for(const width of [320,440,1032,1440]){
 const s=setup(width);s.tick();s.tick();assert.deepEqual(s.steps,[1,1]);
 for(const type of ['mouse','touch','pen']){
  s.fire('pointerdown',{pointerType:type});assert.equal(s.tasks.size,0);
  s.fire('pointermove',{clientX:50,clientY:205});s.fire('pointerup',{clientX:50,clientY:205});assert.equal(s.steps.at(-1),1);
  assert(s.fire('click').prevented);s.fire('pointerdown');s.fire('pointermove',{clientX:350});s.fire('pointerup',{clientX:350});assert.equal(s.steps.at(-1),-1);
 }
 const count=s.steps.length;
 for(const reason of ['short','vertical','cancel','capture']){
  s.fire('pointerdown');s.fire('pointermove',{clientX:reason==='short'?215:50,clientY:reason==='vertical'?500:200});
  s.fire(reason==='cancel'?'pointercancel':reason==='capture'?'lostpointercapture':'pointerup',{clientX:reason==='short'?215:50,clientY:reason==='vertical'?500:200});
  assert.equal(s.steps.length,count,reason);assert.equal(s.tasks.size,1);
 }
 s.fire('pointerdown',{target:{closest:()=>({tagName:'A'})}});assert.equal(s.tasks.size,1);assert(!s.fire('click').prevented);
 s.key('ArrowLeft');assert.equal(s.steps.at(-1),-1);s.key('ArrowRight');assert.equal(s.steps.at(-1),1);
 s.observer(false);assert.equal(s.tasks.size,0);s.observer(true);assert.equal(s.tasks.size,1);
 s.document.hidden=true;s.visibility();assert.equal(s.tasks.size,0);s.document.hidden=false;s.visibility();s.tick();
}
const html=fs.readFileSync('v3.2-wedding-story.html','utf8');
assert(!/hero-autoplay-toggle|data-carousel-toggle|banner-controls|data-banner-prev|data-banner-next/.test(html));
assert(html.includes('data-autoplay-delay="6000"'));
console.log('PASS: 6000ms autoplay, mouse/touch/pen directions, short/vertical/cancelled gestures, CTA clicks, keyboard, visibility, and no banner buttons.');
