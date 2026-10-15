/* Request 20: v3.2 desktop uses supplied 16:7 artwork; tablet/mobile remain unchanged. */
(() => {
  const slides = window.DUNNIO_BANNERS['wedding-story'];
  // Match the existing garden/beach slide order across all three device layouts.
  slides[0].desktop = {
    src: 'assets/banners/wedding-story-v3.2-16x7-02-new.webp',
    width: 1896, height: 829, subject: [0.415, 0.16, 0.69, 0.94]
  };
  slides[1].desktop = {
    src: 'assets/banners/wedding-story-v3.2-16x7-01.webp',
    width: 1896, height: 829, subject: [0.59, 0.15, 0.78, 1]
  };
})();
