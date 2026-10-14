const fs = require('fs');
const sharp = require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const summaries = [
  'A first online order with a perfect fit, clear measurement guidance and an easy process.',
  'A wonderful three-piece suit and attentive service, with plans to return after years of ordering.',
  'A simple ordering experience, attentive customer service and a suit that fits well.',
  'Fitting issues were resolved professionally, with helpful customer service.',
  'A beautiful jacket for a proposal, and a wish to return to Vietnam.',
  'Wedding suits for the groom and his brothers, with fabric variety and careful attention to detail.'
];
const clean = s => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
(async () => {
  const feedback = await (await fetch('https://dunniotailor.com/feedback')).text();
  const home = await (await fetch('https://dunniotailor.com/')).text();
  const reviews = [...feedback.matchAll(/<div class="review-item d-flex">([\s\S]*?)<div class="review-item-content-inner">([\s\S]*?)<\/div>/g)].slice(0, 6).map((m, i) => ({
    name: clean(m[1].match(/class="review-item-title[^\"]*">([\s\S]*?)<\/p>/)[1]),
    date: clean(m[1].match(/class="review-item-time[^\"]*">([\s\S]*?)<\/div>/)[1]),
    rating: (m[1].match(/fa-star/g) || []).length,
    imageSource: m[1].match(/<img[^>]*src="([^"]+)"/)[1],
    image: `assets/images/feedback-${i + 1}.webp`, summary: summaries[i]
  }));
  const galleryHTML = home.slice(home.indexOf('class="gallery-section-inner"'), home.indexOf('<footer'));
  const gallery = [...galleryHTML.matchAll(/<a href="([^"]+)" data-fancybox="home-gallery"[\s\S]*?<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/g)].map((m, i) => ({
    href: m[1], imageSource: m[2], image: `assets/images/gallery-${i + 1}.webp`,
    alt: ['Customer in a tailored suit', 'Customer wearing Dunnio tailoring', 'A look from the Dunnio style gallery', 'A customer style from Dunnio', 'Personal tailoring from the Dunnio gallery', 'A suit from the Dunnio collection', 'Dunnio customer style inspiration'][i]
  }));
  if (reviews.length !== 6 || gallery.length !== 7) throw Error('Reference structure changed; inspect before updating.');
  await Promise.all([...reviews, ...gallery].map(async item => {
    const response = await fetch(item.imageSource);
    if (!response.ok) throw Error(`Image request failed: ${response.status}`);
    await sharp(Buffer.from(await response.arrayBuffer())).resize({width:720, withoutEnlargement:true}).webp({quality:82}).toFile(item.image);
  }));
  fs.writeFileSync('docs/wedding-story-sources.json', JSON.stringify({checked:'2026-10-14',feedbackSource:'https://dunniotailor.com/feedback',gallerySource:'https://dunniotailor.com/',reviewText:'Editorial summaries; photographs, names, dates and ratings are paired from each original review.',reviews,gallery}, null, 2)+'\n');
  console.log('Prepared 6 paired reviews and 7 gallery photographs.');
})().catch(e => { console.error(e); process.exitCode=1; });
