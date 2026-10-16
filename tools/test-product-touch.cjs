const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('assets/product-card-touch.js','utf8');
const listeners=new Map();
const target=name=>({addEventListener(type,fn,options){listeners.set(name+':'+type,{fn,options})}});
const card=()=>({classList:{values:new Set(),add(v){this.values.add(v)},remove(v){this.values.delete(v)},contains(v){return this.values.has(v)}}});
const first=card(),second=card(),rail=Object.assign(target('rail'),{contains:c=>c===first||c===second});
const document=Object.assign(target('document'),{hidden:false,querySelector:()=>rail}),window=target('window');
vm.runInNewContext(source,{document,window});
const fire=(name,type,event={})=>listeners.get(name+':'+type)?.fn(event);
const start=(c,id=1,count=1)=>fire('rail','touchstart',{target:{closest:()=>c},touches:Array.from({length:count},(_,i)=>({identifier:id+i}))});
const lit=c=>c.classList.contains('is-touch-active');
start(first);assert(lit(first));
// Native touchmove/scroll/pointercancel must not remove feedback mid-gesture.
for(const type of ['touchmove','scroll','pointercancel']){fire('rail',type,{});fire('document',type,{});assert(lit(first),type);}
fire('document','touchend',{changedTouches:[{identifier:2}]});assert(lit(first));
fire('document','touchend',{changedTouches:[{identifier:1}]});assert(!lit(first));
start(second);assert(lit(second));fire('document','touchcancel',{changedTouches:[{identifier:1}]});assert(!lit(second));
start(first);start(second);assert(!lit(first)&&lit(second));
fire('document','touchstart',{touches:[{},{}]});assert(!lit(second));
start(first,1,2);assert(!lit(first));
for(const event of ['blur','pagehide']){start(first);fire('window',event);assert(!lit(first));}
start(first);document.hidden=true;fire('document','visibilitychange');assert(!lit(first));
assert.equal(listeners.get('rail:touchstart').options.passive,true);
for(const event of ['touchend','touchcancel']){assert.equal(listeners.get('document:'+event).options.passive,true);assert.equal(listeners.get('document:'+event).options.capture,true);}
assert(!/preventDefault|setPointerCapture|addEventListener\('click'/.test(source));
console.log('PASS: touch highlight persists through native scrolling, ends on lift/cancel, clears on multitouch/page exit; passive listeners preserve scrolling and link clicks.');
