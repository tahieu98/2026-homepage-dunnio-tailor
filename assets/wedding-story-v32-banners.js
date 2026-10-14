/* Request 18: v3.2-only desktop artwork. Tablet/mobile retain the shared wedding slides. */
(() => {
  const slides = window.DUNNIO_BANNERS['wedding-story'];
  // Match the existing garden/beach slide order across all three device layouts.
  slides[0].desktop = {
    src: 'assets/banners/wedding-story-v3.2-3x2-02.webp',
    width: 1536, height: 1024, subject: [0.38, 0.1, 0.79, 0.94]
  };
  slides[1].desktop = {
    src: 'assets/banners/wedding-story-v3.2-3x2-01.webp',
    width: 1536, height: 1024, subject: [0.54, 0.09, 0.86, 1]
  };
})();
