/* Regenerate only the two Request 17 variants from the retained v2/v3 originals. */
const fs = require('fs');
const v3 = fs.readFileSync('v3-wedding-story.html', 'utf8');
const v2 = fs.readFileSync('v2-design-studio.html', 'utf8');
const sources = JSON.parse(fs.readFileSync('docs/wedding-story-sources.json', 'utf8'));
function section(html, className) {
  const match = html.match(new RegExp('<section class="'+className+'"[^>]*>[\\s\\S]*?<\\/section>'));
  if (!match) throw Error('Missing section: '+className);
  return match[0];
}
const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const reviews = sources.reviews.map(r => `<article class="review-item d-flex"><div class="review-item-thumbnail"><img src="${r.image}" width="555" height="557" loading="lazy" decoding="async" alt="Dunnio customer ${esc(r.name)}"></div><div class="review-item-content"><h3 class="review-item-title">${esc(r.name)}</h3><time class="review-item-time" datetime="${r.date.split('/').reverse().join('-')}">${r.date}</time><div class="review-item-rating" aria-label="${r.rating} out of 5 stars"><span aria-hidden="true">${'★'.repeat(r.rating)}</span></div><p class="review-summary-label">Review summary</p><p class="review-item-content-inner">${esc(r.summary)}</p><a class="text-link" href="${sources.feedbackSource}">Read original review ↗</a></div></article>`).join('\n');
const reviewControls = `<div class="rail-controls"><span>Customer experiences · scroll to explore</span><div><button type="button" class="circle" data-scroll="-1" data-target="review-rail" aria-label="Previous customer reviews" aria-controls="review-rail">←</button><button type="button" class="circle" data-scroll="1" data-target="review-rail" aria-label="Next customer reviews" aria-controls="review-rail">→</button></div></div>`;
let community = section(v3, 'section community-section').replace(/<div class="community-gallery">[\s\S]*?<\/div>/, '').replace(/<p class="fine">[\s\S]*?<\/p>/, '');
community = community.replace('</section>', `${reviewControls}<div class="review-rail" id="review-rail" tabindex="0" role="region" aria-label="Customer reviews">${reviews}</div></section>`);
const gallery = `<section class="section gallery-section" id="gallery" aria-labelledby="gallery-title"><div class="gallery-section-inner"><div class="row flex-row alg-center"><div class="col-xs-12 col-md-8"><h2 id="gallery-title" class="section-title gallery-section-title font-primary mt-0">Style Gallery</h2><div class="section-desc">Discover our latest collections, behind-the-scenes moments, and style inspirations.</div></div><div class="col-xs-12 col-md-12"><div class="gallery-section-list-wrapper"><div class="gallery-section-list">${sources.gallery.map(g=>`<a class="gallery-item d-block" href="${g.href}" target="_blank" rel="noopener noreferrer" aria-label="View photograph: ${esc(g.alt)}"><img src="${g.image}" width="565" height="865" loading="lazy" decoding="async" alt="${esc(g.alt)}"></a>`).join('\n')}</div></div></div><div class="col-xs-12 col-md-12 gallery-action"><a href="https://dunniotailor.com/gallery.html" class="btn btn-primary button">See more gallery <span aria-hidden="true">↗</span></a></div></div></div></section>`;
let craft = section(v2, 'section craft-section').replace('Good tailoring<br>has a human touch.', 'Vietnamese hands.<br>Fifteen years of craft.').replace('The craft is in the decisions: how fabric is cut, how a garment is constructed, and how each detail is checked.', 'Your bespoke suit or tuxedo is brought to life by Vietnamese tailors with 15 years of experience.').replace('Explore the people and the workshop behind Dunnio, and see how confirmed designs and measurements become a finished garment.', 'From precise cuts to meticulous stitching, every detail is carefully finished by hand. Meet the skilled people behind your garment and discover the care inside our Vietnam workshop.');
for (const variant of ['3.1', '3.2']) {
  let hero = section(v3, 'hero hero-3 fashion-hero hockerty-hero');
  const controls = hero.match(/<div class="banner-controls"[\s\S]*?<\/div>/)[0];
  hero = hero.replace(controls, '').replace('</picture>', '</picture>'+controls).replace(/<a class="hero-scroll"[\s\S]*?<\/a>/, '');
  hero = hero.replace('aria-label="Wedding Story"', 'aria-label="Wedding Story" data-mobile-layout="'+variant+'"');
  let products = section(v2, 'section products').replace(/<p class="fine">[\s\S]*?<\/p>/, '');
  const studio = section(v2, 'section studio-section');
  const looks = section(v2, 'section looks-section');
  const content = [hero, ...(variant==='3.1'?[section(v3,'section occasions-section')]:[]), products, studio, looks, craft, community, gallery, ...(variant==='3.1'?[section(v3,'section faq-section')]:[]), section(v3,'closing-section')].join('\n');
  let html = v3.replace(/<main id="main">[\s\S]*?<\/main>/, '<main id="main">\n'+content+'\n</main>');
  html = html.replace('<title>Wedding Story · Dunnio Tailor</title>', `<title>Wedding Story v${variant} · Dunnio Tailor</title>`).replace('Five responsive homepage design concepts for Dunnio Tailor. Static, buildless prototypes.', `Wedding Story v${variant}: bespoke wedding tailoring, Vietnamese craftsmanship and customer inspiration.`);
  html = html.replace('class="theme theme-3"', `class="theme theme-3 wedding-variant wedding-${variant.replace('.','')}"`);
  html = html.replace('</head>', '<link rel="stylesheet" href="assets/wedding-variants.css?v=request17-r2"></head>');
  // Logos in the header and drawer are deliberately non-linking. Retain the footer verbatim.
  const footerStart = html.indexOf('<footer');
  let headerAndMain = html.slice(0, footerStart).replace(/<a class="wordmark" href="index.html" aria-label="Dunnio Tailor design concepts">([\s\S]*?)<\/a>/, '<span class="wordmark" aria-label="Dunnio Tailor">$1</span>').replace(/<a href="index.html" aria-label="Dunnio design concepts">([\s\S]*?)<\/a>/, '<span aria-label="Dunnio Tailor">$1</span>').replace('<a href="index.html">Back to the 5 concepts</a>', '');
  html = headerAndMain + html.slice(footerStart);
  fs.writeFileSync(`v${variant}-wedding-story.html`, html.replaceAll('><','>\n<')+'\n');
}
console.log('Built v3.1-wedding-story.html and v3.2-wedding-story.html.');
