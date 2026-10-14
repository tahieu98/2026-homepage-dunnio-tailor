/* v3.2: desktop reuses each slide's 5:3 tablet artwork; mobile remains unchanged. */
(() => {
  const slides = window.DUNNIO_BANNERS['wedding-story'];
  // Match the existing garden/beach slide order across all three device layouts.
  slides.forEach(slide => { slide.desktop = { ...slide.tablet }; });
})();
