/* Request 22: opt-in banner autoplay; other homepage variants retain manual slides. */
(() => {
  const banner=document.querySelector('.wedding-32 [data-autoplay-delay]');
  if(!banner)return;
  const hero=banner.closest('.hero'),toggle=hero.querySelector('[data-carousel-toggle]');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const hoverDevice=matchMedia('(hover: hover)');
  const delay=Number(banner.dataset.autoplayDelay)||6000;
  let paused=motion.matches,visible=true,hovered=false,focused=false,timer;
  const clear=()=>{clearTimeout(timer);timer=undefined;};
  const schedule=()=>{
    clear();
    banner.dataset.autoplayState=paused?'paused':'playing';
    toggle.setAttribute('aria-label',paused?'Play banner slideshow':'Pause banner slideshow');
    toggle.querySelector('span').textContent=paused?'▶':'Ⅱ';
    if(paused||!visible||hovered||focused||document.hidden)return;
    timer=setTimeout(()=>{
      banner.dispatchEvent(new CustomEvent('dunnio:banner-step',{detail:1}));
      banner.dataset.autoplayTransitions=String(Number(banner.dataset.autoplayTransitions||0)+1);
      schedule();
    },delay);
  };
  toggle.addEventListener('click',()=>{paused=!paused;schedule();});
  hero.addEventListener('pointerenter',()=>{if(hoverDevice.matches){hovered=true;schedule();}});
  hero.addEventListener('pointerleave',()=>{hovered=false;schedule();});
  hero.addEventListener('focusin',event=>{focused=event.target!==toggle;schedule();});
  hero.addEventListener('focusout',()=>queueMicrotask(()=>{focused=hero.contains(document.activeElement)&&document.activeElement!==toggle;schedule();}));
  document.addEventListener('visibilitychange',schedule);
  motion.addEventListener('change',()=>{if(motion.matches)paused=true;schedule();});
  window.addEventListener('pagehide',clear);
  window.addEventListener('pageshow',schedule);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:0}).observe(hero);
  schedule();
})();
