/* Request 25: sequential autoplay and horizontal pointer gestures, v3.2 only. */
(() => {
  const banner=document.querySelector('.wedding-32 [data-autoplay-delay]');
  if(!banner)return;
  const media=banner.closest('.hero-media');
  const delay=Number(banner.dataset.autoplayDelay)||6000;
  let visible=true,timer,gesture=null,suppressClick=false;
  const clear=()=>{clearTimeout(timer);timer=undefined;};
  const step=direction=>banner.dispatchEvent(new CustomEvent('dunnio:banner-step',{detail:direction}));
  const schedule=()=>{
    clear();
    if(!visible||document.hidden||gesture)return;
    timer=setTimeout(()=>{
      step(1);
      banner.dataset.autoplayTransitions=String(Number(banner.dataset.autoplayTransitions||0)+1);
      schedule();
    },delay);
  };
  const finish=(event,cancelled=false)=>{
    if(!gesture||event.pointerId!==gesture.id)return;
    const current=gesture;
    gesture=null;
    media.classList.remove('is-dragging');
    if(media.hasPointerCapture(current.id))media.releasePointerCapture(current.id);
    const dx=event.clientX-current.x,dy=event.clientY-current.y;
    if(!cancelled&&current.horizontal&&Math.abs(dx)>=Math.max(40,Math.min(80,media.clientWidth*.08))&&Math.abs(dx)>Math.abs(dy)*1.2){
      step(dx<0?1:-1);
      banner.dataset.gestureTransitions=String(Number(banner.dataset.gestureTransitions||0)+1);
    }
    schedule();
  };
  media.addEventListener('pointerdown',event=>{
    if(event.isPrimary)suppressClick=false;
    if(gesture||!event.isPrimary||event.button!==0||event.target.closest('a,button,input,select,textarea'))return;
    gesture={id:event.pointerId,x:event.clientX,y:event.clientY,horizontal:false};
    clear();
    media.setPointerCapture(event.pointerId);
  });
  media.addEventListener('pointermove',event=>{
    if(!gesture||event.pointerId!==gesture.id)return;
    const dx=Math.abs(event.clientX-gesture.x),dy=Math.abs(event.clientY-gesture.y);
    if(!gesture.horizontal&&dy>10&&dy>dx){finish(event,true);return;}
    if(dx>10&&dx>dy*1.2){
      gesture.horizontal=true;
      suppressClick=true;
      media.classList.add('is-dragging');
    }
  });
  media.addEventListener('pointerup',event=>finish(event));
  media.addEventListener('pointercancel',event=>finish(event,true));
  media.addEventListener('lostpointercapture',event=>finish(event,true));
  media.addEventListener('dragstart',event=>event.preventDefault());
  media.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false;}},true);
  banner.addEventListener('keydown',event=>{
    if(event.target!==banner||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();step(event.key==='ArrowRight'?1:-1);schedule();
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&gesture)finish({pointerId:gesture.id},true);schedule();});
  window.addEventListener('pagehide',clear);
  window.addEventListener('pageshow',schedule);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:0}).observe(media);
  schedule();
})();
