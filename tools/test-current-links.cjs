const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, 'check-current-links.cjs'), 'utf8');
const root = path.resolve(__dirname, '..');
function audit(file, text, targets) {
  const existing = new Set([file, ...targets].map(p => path.resolve(root, p)));
  return () => vm.runInNewContext(source, {
    __dirname, URL, console: {log() {}},
    require(name) {
      if (name === 'node:fs') return {existsSync: p => existing.has(path.resolve(p)), readFileSync: () => text};
      if (name === 'node:child_process') return {execFileSync: () => file + '\0'};
      return require(name);
    }
  });
}
const live = 'v3.2-wedding-story.html';
assert.doesNotThrow(audit('docs/example.md', `[Final](../${live}?a=1#main)\n[Final absolute](https://tahieu98.github.io/2026-homepage-dunnio-tailor/${live})\n<img srcset="../assets/a.webp 1x, ../assets/b.webp 2x">`, [live, 'assets/a.webp', 'assets/b.webp']));
assert.doesNotThrow(audit('index.html', `<iframe src="${live}"></iframe><select><option value="${live}">Final</option></select>`, [live]));
assert.doesNotThrow(audit('docs/example.md', '`[historical](../v1-heritage-atelier.html)`\n```html\n<a href="../v2-design-studio.html">history</a>\n```\n<pre><a href="../v4-modern-essentials.html">history</a></pre>', []));
for (const ref of ['v1-heritage-atelier.html', 'v2-design-studio.html?x=1#old', 'https://tahieu98.github.io/2026-homepage-dunnio-tailor/v4-modern-essentials.html', 'v5%2Dfit-concierge.html']) {
  assert.throws(audit('index.html', `<a href="${ref}">Retired</a>`, []), /Active links to retired routes/);
}
assert.throws(audit('index.html', '<img src="assets/missing.webp">', []), /Missing local link targets/);
assert.throws(audit('index.html', '<a href="/outside.html">Outside</a>', []), /Missing local link targets/);
assert.doesNotThrow(audit('index.html', '<a href="https://dunniotailor.com/fit-guarantee">External</a>', []));
console.log('PASS: nested and absolute URLs, query/hash, encoding, srcset, iframe/options, code exclusions and missing/retired targets.');
