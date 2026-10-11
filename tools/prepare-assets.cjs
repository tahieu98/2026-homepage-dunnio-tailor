const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const source = 'C:/laragon/www/dunnio-tailor-redesign';
const data = JSON.parse(fs.readFileSync(root+'/.local/inspection/dunnio-home-inspect.json', 'utf8'));
fs.mkdirSync(root + '/assets/images', {recursive:true});
fs.mkdirSync(root + '/docs', {recursive:true});
const manifest = [];
function copy(url, name) {
  url = url.trim().split(' ')[0];
  const rel = decodeURI(new URL(url).pathname.replace('/dunnio-tailor-redesign', ''));
  const src = source + rel;
  let ext = (rel.match(/\.(webp|jpg|jpeg|png|svg)(?:-|$)/i)||[])[1];
  if (!ext || !fs.existsSync(src)) throw new Error('Asset missing: '+src);
  const dst = 'assets/images/'+name+'.'+ext;
  fs.copyFileSync(src, root+'/'+dst);
  manifest.push({file:dst,source:rel,bytes:fs.statSync(src).size});
  return dst;
}
const assets = {};
data.categories.forEach((c,i)=>assets['product'+i]=copy(c.large||c.img,'product-'+i));
const matches=[['editorial','home_product_thumb/public/2026-01/dunniotailor2'],['orange','j8isjzd'],['formal','chatgpt_image_11_18_33'],['couple','qjsgadr'],['garden','z5vug'],['wedding','home_blog_small/public/field/image/wedding_men'],['guide','home_blog_small/public/field/image/mens_suits'],['atelier','home_cta_small/public/122148'],['bow','bt_2'],['cuff','bcl_0'],['tie','neck.webp'],['suspender','4.webp'],['real1','2b3a9570'],['real2','kh10'],['real3','_mg_4388']];
for(const [name,fragment] of matches){const img=data.images.find(x=>x.src.includes(fragment)); if(img)assets[name]=copy(img.large||img.src,name)}
const html=fs.readFileSync(root+'/.local/inspection/dunnio-current-home.html','utf8');
for(const [name,fragment] of [['bannerDesktop','banner_large/public/home-banner_1'],['bannerTablet','banner_medium/public/home-banner-mb_0'],['bannerMobile','banner_small/public/home-banner-mb_1']]){
const url=[...html.matchAll(/https?:[^\s"<>]+/g)].map(x=>x[0]).find(x=>x.includes(fragment));assets[name]=copy(url,name);
}
assets.logo=copy(data.images.find(x=>x.src.includes('logo_svg.svg')).src,'logo');
for(const [route,pattern,prefix] of [['our-workshop','landing_page/workshop/workshop-','workshop'],['our-tailors','style_555x557','tailor']]){
 const urls=JSON.parse(fs.readFileSync(root+'/docs/'+route+'-images.json','utf8')).filter(x=>x.includes(pattern));
 urls.forEach((u,i)=>assets[prefix+i]=copy(u,prefix+'-'+i));
}
fs.writeFileSync(root+'/assets/asset-map.json',JSON.stringify(assets,null,2));
fs.writeFileSync(root+'/docs/asset-provenance.json',JSON.stringify(manifest,null,2));
console.log(JSON.stringify(assets,null,2));
console.log('Total image bytes',manifest.reduce((a,x)=>a+x.bytes,0));
