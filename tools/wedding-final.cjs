/* Request 22: apply the final v3.2 structure while retaining v3.1 verbatim. */
function block(html, className, transform) {
  const escaped=className.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const start=new RegExp('<([a-z][a-z0-9-]*)\\b[^>]*class="[^"]*\\b'+escaped+'\\b[^"]*"[^>]*>','i').exec(html);
  if(!start)throw Error('Missing final-layout block: '+className);
  const tag=start[1],tokens=new RegExp('<\\/?'+tag+'\\b[^>]*>','gi');
  tokens.lastIndex=start.index;let depth=0,token,end;
  while((token=tokens.exec(html))){depth+=token[0].startsWith('</')?-1:1;if(depth===0){end=tokens.lastIndex;break;}}
  if(!end)throw Error('Unclosed block: '+className);
  return html.slice(0,start.index)+transform(html.slice(start.index,end))+html.slice(end);
}
module.exports=html=>{
  const remove=(text,name)=>block(text,name,()=> '');
  html=block(html,'hockerty-hero',hero=>remove(hero,'banner-controls')
    .replace('data-banner="wedding-story"','data-banner="wedding-story" data-autoplay-delay="6000" tabindex="0" role="group" aria-label="Wedding banner. Swipe or use arrow keys to change image." aria-live="off"'));
  html=block(html,'products',s=>remove(s,'rail-controls')
    .replace(/<span class="image-arrow"[^>]*>[\s\S]*?<\/span>/g,'')
    .replace('class="product-rail"','class="product-rail" tabindex="0" role="region" aria-label="Product categories"'));
  html=block(html,'looks-section',s=>remove(remove(s,'rail-controls'),'fine')
    .replace('class="text-link"','class="button outfit-ideas-button"')
    .replace('class="look-rail"','class="look-rail" tabindex="0" role="region" aria-label="Outfit ideas"'));
  html=block(html,'craft-section',s=>remove(s,'detail-line'));
  html=block(html,'community-section',s=>remove(remove(s,'actions'),'rail-controls'));
  html=block(html,'usp-section',s=>s.replace(/<p\b[^>]*>[\s\S]*?<\/p>/g,'').replace(/<span class="text-link">[\s\S]*?<\/span>/g,'')
    .replace('</section>','<div class="usp-fit-action"><a class="button secondary fit-guarantee-button" href="https://dunniotailor.com/fit-guarantee" data-event="cta_click"><span class="fit-guarantee-label">See how we ensure your fit</span> <span aria-hidden="true">↗</span></a></div></section>'));
  html=html.replace('</head>','<link rel="stylesheet" href="assets/wedding-final.css?v=request27-r1"></head>')
    .replace('assets/app.js?v=banner-slides-20261012-r4','assets/app.js?v=request22-r1')
    .replace('<script src="assets/studio-video.js','<script src="assets/wedding-final.js?v=request25-r1" defer></script><script src="assets/studio-video.js');
  // Request 28: remove decorative diagonal arrows, including their empty flex items.
  html=html.replace(/\s*<span\b[^>]*aria-hidden="true"[^>]*>\s*(?:↗|&#8599;|&#x2197;)\s*<\/span>/gi,'')
    .replace(/[ \t]*(?:↗|&#8599;|&#x2197;)/gi,'');
  return html;
};
