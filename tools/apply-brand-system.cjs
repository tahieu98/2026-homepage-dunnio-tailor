require('./retired-tool.cjs')(__filename); // Request 30: frozen final protection.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const revision='typography-20261012';
const read=p=>fs.readFileSync(root+'/'+p,'utf8');
const write=(p,s)=>fs.writeFileSync(root+'/'+p,s);
const styles=`<link rel="stylesheet" href="assets/fonts.css?v=${revision}"><link rel="stylesheet" href="assets/styles.css?v=${revision}"><link rel="stylesheet" href="assets/brand.css?v=${revision}">`;
fs.mkdirSync(root+'/docs/brand-before',{recursive:true});
for(let i=1;i<=5;i++)for(const d of ['desktop','mobile']){const target=root+`/docs/brand-before/v${i}-${d}.png`;if(!fs.existsSync(target))fs.copyFileSync(root+`/docs/screenshots/v${i}-${d}.png`,target)}
write('assets/images/logo-navy.svg',read('assets/images/logo.svg').replaceAll('fill="white"','fill="#0b1f3a"'));
let build=read('tools/build.cjs');
for(const color of ['#eee8dd','#e9e9e4','#f5eee7','#e8e3db','#e7eee9'])build=build.replace("color:'"+color+"'", "color:'"+(color==='#e7eee9'?'#0b1f3a':'#fff')+"'");
build=build.replace('<link rel="stylesheet" href="assets/styles.css">',styles);
build=build.replace('src="assets/banner-config.js" defer','src="assets/banner-config.js?v='+revision+'" defer').replace('src="assets/app.js" defer','src="assets/app.js?v='+revision+'" defer');
build=build.replace('<span>MADE TO YOUR MEASUREMENTS</span><span>PERSONALISED TO YOUR STYLE</span><span>CRAFTED IN VIETNAM</span>','<a href="https://dunniotailor.com/men/custom-suits">Custom suits <span aria-hidden="true">↗</span></a><a href="https://dunniotailor.com/men/custom-tuxedo">Tuxedos <span aria-hidden="true">↗</span></a><a href="#how-it-works">How it works <span aria-hidden="true">↓</span></a>');
build=build.replace('<div class="intro-line">','<nav class="intro-line" aria-label="Quick starting points">').replace('</div>${c.order.map(k=>sections[k](c))','</nav>${c.order.map(k=>sections[k](c))');
build=build.replace('<label for="wedding-date">When is your occasion?</label><input type="date" id="wedding-date" required>','<label for="wedding-date">Occasion date <span class="fine">(required)</span></label><input type="date" id="wedding-date" required aria-describedby="wedding-date-help wedding-date-error"><p class="field-help" id="wedding-date-help">Choose an upcoming date. Production and delivery need confirmation from Dunnio.</p><p class="field-error" id="wedding-date-error" role="alert" hidden></p>');
build=build.replace('<form id="planner" class="planner-form">','<form id="planner" class="planner-form" novalidate>');
build=build.replace('<div id="finder-result" class="result" aria-live="polite">','<button class="finder-reset" id="finder-reset" type="button">Start again</button><div id="finder-result" class="result" aria-live="polite" aria-atomic="true">');
const icons=[
 '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4-1 12-12-3-3L5 16l-1 4Z M14 7l3 3 M4 20h16"/></svg>',
 '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 16 13-13 5 5L8 21 3 16Z M12 7l2 2 M9 10l2 2 M6 13l2 2 M15 4l2 2"/></svg>',
 '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 0 1-8 8H5l-3 3v-11a9 9 0 0 1 18 0Z M8 10h8 M8 14h5"/></svg>'
];
for(const [i,symbol] of ['✧','↔','↗'].entries())build=build.replace('<span class="large-symbol" aria-hidden="true">'+symbol+'</span>','<span class="service-icon" aria-hidden="true">'+icons[i]+'</span>');
build=build.replace('stroke="#b2b2a6"','stroke="#C8A96A"').replace('fill="#122334"','fill="#0b1f3a"');
build=build.replaceAll('fill="#e6eadc"','fill="#fff"').replaceAll('stroke="#29402f"','stroke="#0b1f3a"').replaceAll('fill="#29402f"','fill="#0b1f3a"').replaceAll('stroke="#bec8ab"','stroke="#C8A96A"');
build=build.replace('<img src="assets/images/logo.svg" alt="Dunnio Tailor" width="150" height="36">','<img src="assets/images/logo-navy.svg" alt="Dunnio Tailor" width="150" height="36">');
if(!build.includes('const footerStart=h.indexOf'))build=build.replace('fs.writeFileSync(f,h)}',`const footerStart=h.indexOf('<footer ');if(footerStart>=0)h=h.slice(0,footerStart)+h.slice(footerStart).replace('src="assets/images/logo-navy.svg"','src="assets/images/logo.svg"');fs.writeFileSync(f,h)}`);
write('tools/build.cjs',build);
for(const file of ['index.html','report.html','banner-lab.html']){let html=read(file);if(!html.includes('assets/brand.css'))html=html.replace('<link rel="stylesheet" href="assets/styles.css">',styles);html=html.replace('src="assets/app.js" defer','src="assets/app.js?v='+revision+'" defer');html=html.replace('DUNNIO<span>TAILOR</span>','<img src="assets/images/logo-navy.svg" alt="Dunnio Tailor" width="150" height="36">');write(file,html)}
let check=read('tools/check-links.cjs');check=check.replace("value.split('#')[0]","value.split(/[?#]/)[0]");write('tools/check-links.cjs',check);
console.log('Applied brand assets, semantic controls, cache revision and generator changes.');
