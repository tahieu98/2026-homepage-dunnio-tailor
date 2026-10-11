const fs = require('fs'), assert = require('assert/strict');
const { chromium } = require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.DUNNIO_PREVIEW_URL || 'http://localhost/dunnio-homepage-concepts/';
const files = ['v1-heritage-atelier.html', 'v2-design-studio.html', 'v3-wedding-story.html', 'v4-modern-essentials.html', 'v5-fit-concierge.html', 'index.html', 'report.html', 'brand-review.html', 'banner-lab.html', 'docs/screenshot-index.html'];
(async () => {
  const b = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const report = { revision: 'typography-20261012', base, views: [], vietnamese: [], errors: [], externalFontRequests: [] };
  try {
    const p = await b.newPage();
    p.on('pageerror', e => report.errors.push(e.message));
    p.on('request', r => { if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) report.externalFontRequests.push(r.url()); });
    const cdp = await p.context().newCDPSession(p);
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const platformFonts = async selector => {
      const { root } = await cdp.send('DOM.getDocument');
      const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
      return (await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts;
    };
    for (const file of files) for (const [width, height] of [[1440, 1000], [820, 1180], [390, 844]]) {
      await p.setViewportSize({ width, height });
      await p.goto(base + file, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      const state = await p.evaluate(() => {
        const css = getComputedStyle(document.documentElement);
        const h1 = document.querySelector('h1');
        const faces = [...document.fonts].filter(f => f.status === 'loaded').map(f => ({ family: f.family, weight: f.weight }));
        const nonBrandText = [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().width && [...e.childNodes].some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()) && !/Garamon Pro Display|Afacad|monospace/.test(getComputedStyle(e).fontFamily)).map(e => ({ tag: e.tagName, text: e.textContent.slice(0, 50), family: getComputedStyle(e).fontFamily }));
        return { primary: css.getPropertyValue('--font-primary').trim(), secondary: css.getPropertyValue('--font-secondary').trim(), heading: { family: getComputedStyle(h1).fontFamily, weight: getComputedStyle(h1).fontWeight }, body: getComputedStyle(document.body).fontFamily, faces, nonBrandText, overflow: document.documentElement.scrollWidth > innerWidth + 1 };
      });
      assert.equal(state.primary, '"Garamon Pro Display",serif');
      assert.equal(state.secondary, '"Afacad",sans-serif');
      assert(state.body.includes('Afacad'));
      assert(state.faces.some(f => f.family.replaceAll('"', '') === 'Garamon Pro Display'));
      assert(state.faces.some(f => f.family === 'Afacad'));
      assert.deepEqual(state.nonBrandText, [], file + ' unbranded text');
      assert.equal(state.overflow, false, file + ' ' + width);
      const headingFonts = await platformFonts('h1');
      assert(headingFonts.length > 0);
      assert(headingFonts.every(f => f.isCustomFont), file + ' heading fallback');
      assert(headingFonts.every(f => /Garamond|Afacad/.test(f.familyName)));
      report.views.push({ file, width, height, ...state, headingFonts });
    }
    await p.goto(base + 'report.html');
    await p.evaluate(async () => {
      for (const [id, family] of [['primary', 'Garamon Pro Display'], ['secondary', 'Afacad']]) {
        const e = document.createElement('p'); e.id = 'font-probe-' + id; e.style.fontFamily = '"' + family + '"';
        e.style.fontWeight = '400'; e.textContent = 'Thiết kế thương hiệu Đồng nhất — Ă Â Đ Ê Ô Ơ Ư ă â đ ê ô ơ ư Ạ Ả Ã Ấ Ầ Ẩ Ẫ Ậ ắ ằ ẳ ẵ ặ ế ề ể ễ ệ ố ồ ổỗ ộ ớ ờ ở ỡ ợ ứ ừử ữ ự Ỳ Ỵ Ỷ Ỹ'; document.body.append(e);
      }
      await document.fonts.ready;
    });
    for (const id of ['primary', 'secondary']) {
      const fonts = await platformFonts('#font-probe-' + id);
      assert.equal(fonts.length, 1, id + ' Vietnamese fallback');
      assert(fonts[0].isCustomFont);
      assert(/Garamond|Afacad/.test(fonts[0].familyName));
      report.vietnamese.push({ role: id, fonts });
    }
    assert.deepEqual(report.errors, []); assert.deepEqual(report.externalFontRequests, []);
    report.status = 'passed';
    fs.writeFileSync(process.env.DUNNIO_TYPE_REPORT || 'docs/typography-verification.json', JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ status: report.status, views: report.views.length, vietnamese: report.vietnamese, errors: report.errors }));
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
