/* Touch feedback stays on the starting card throughout native scrolling. */
(() => {
  const rail=document.querySelector('.wedding-32 .product-rail');
  if(!rail)return;
  let active=null;
  const clear=()=>{
    if(active)active.card.classList.remove('is-touch-active');
    active=null;
  };
  rail.addEventListener('touchstart',event=>{
    clear();
    if(event.touches.length!==1)return;
    const card=event.target.closest('.product-card');
    if(!card||!rail.contains(card))return;
    active={card,id:event.touches[0].identifier};
    card.classList.add('is-touch-active');
  },{passive:true});
  const end=event=>{
    if(active&&Array.from(event.changedTouches).some(touch=>touch.identifier===active.id))clear();
  };
  // Pointer events are cancelled as soon as native scrolling takes over.
  // Touch events continue until the finger lifts, so do not clear on pointercancel.
  document.addEventListener('touchend',end,{passive:true,capture:true});
  document.addEventListener('touchcancel',end,{passive:true,capture:true});
  document.addEventListener('touchstart',event=>{if(event.touches.length>1)clear();},{passive:true,capture:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
  window.addEventListener('blur',clear);
  window.addEventListener('pagehide',clear);
})();
