/* One responsive recording per board; native controls remain available without autoplay. */
(() => {
  const desktop = matchMedia('(min-width: 1200px)');
  const tablet = matchMedia('(min-width: 640px)');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-studio-video]').forEach(board => {
    const video = board.querySelector('video');
    const sources = [...video.querySelectorAll('source[data-device]')];
    const error = board.querySelector('[data-video-error]');
    const fallback = board.querySelector('[data-video-link]');
    let near = false, visible = false, loaded = false, userPaused = false;
    const canAutoplay = () => !motion.matches && !navigator.connection?.saveData;
    const pause = () => {
      if (!video.paused) video.pause();
    };
    const play = () => {
      if (visible && !document.hidden && canAutoplay() && !userPaused) video.play().catch(() => {});
    };
    const load = () => {
      if (loaded) return;
      loaded = true;
      video.preload = 'metadata';
      video.load();
    };
    const select = () => {
      const device = desktop.matches ? 'desktop' : tablet.matches ? 'tablet' : 'mobile';
      if (board.dataset.device === device) return;
      const source = sources.find(item => item.dataset.device === device);
      pause();
      board.dataset.device = device;
      video.preload = 'none';
      video.width = Number(source.dataset.width);
      video.height = Number(source.dataset.height);
      video.poster = source.dataset.poster;
      video.src = source.getAttribute('src');
      video.muted = true;
      fallback.href = source.getAttribute('src');
      error.hidden = true;
      loaded = false;
      if (near) load();
      play();
    };
    video.addEventListener('pause', () => {
      // Offscreen/hidden/source-switch pauses must not be mistaken for a user's pause.
      if (visible && !document.hidden && canAutoplay() && video.readyState >= 2) userPaused = true;
    });
    video.addEventListener('keydown', event => {
      if (event.key === ' ') userPaused = !video.paused;
    });
    video.addEventListener('play', () => { userPaused = false; });
    video.addEventListener('error', () => { error.hidden = false; });
    video.addEventListener('loadeddata', play);
    desktop.addEventListener('change', select);
    tablet.addEventListener('change', select);
    motion.addEventListener('change', () => { if (!canAutoplay()) pause(); else play(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else play(); });
    select();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        near = entries[0].isIntersecting;
        if (near) load();
      }, { rootMargin: '240px' }).observe(video);
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.2;
        if (visible) play(); else pause();
      }, { threshold: [0, 0.2] }).observe(video);
    } else { near = true; load(); }
  });
})();
