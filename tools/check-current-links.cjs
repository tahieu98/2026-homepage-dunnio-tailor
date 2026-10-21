/* Recursive offline link audit, including same-site absolute Pages URLs. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const site = 'https://tahieu98.github.io/2026-homepage-dunnio-tailor/';
const prefix = new URL(site).pathname;
const retired = new Set(['v1-heritage-atelier.html', 'v2-design-studio.html', 'v4-modern-essentials.html', 'v5-fit-concierge.html']);
const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {cwd: root, encoding: 'utf8'})
  .split('\0').filter(file => /\.(?:html|md)$/.test(file) && fs.existsSync(path.join(root, file)));
function prose(file) {
  let text = fs.readFileSync(path.join(root, file), 'utf8').replace(/<pre\b[^>]*>[\s\S]*?<\/pre>/gi, '');
  if (file.endsWith('.md')) text = text.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, '').replace(/(`+)[^\n]*?\1/g, '');
  return text;
}
const broken = [], retiredLinks = [];
let count = 0;
for (const file of files) {
  const text = prose(file);
  const refs = [...text.matchAll(/\b(?:href|src|srcset|value)\s*=\s*(["'])(.*?)\1/gi)].flatMap(match => {
    const attr = match[0].split('=')[0].trim().toLowerCase();
    if (attr === 'value' && !/\.html(?:[?#]|$)/i.test(match[2])) return [];
    return attr === 'srcset' ? match[2].split(',').map(item => item.trim().split(/\s+/)[0]) : [match[2]];
  });
  if (file.endsWith('.md')) refs.push(...[...text.matchAll(/\]\(<?([^\s)>]+)>?(?:\s+"[^"]*")?\)/g)].map(match => match[1]));
  for (let ref of refs) {
    ref = ref.replaceAll('&amp;', '&');
    if (!ref || /^(?:mailto|tel|data|javascript):/i.test(ref)) continue;
    let url;
    try { url = new URL(ref, site + file); } catch { broken.push({file, ref, reason: 'invalid URL'}); continue; }
    if (url.origin !== new URL(site).origin) continue;
    if (!url.pathname.startsWith(prefix)) {
      if (!/^(?:https?:)?\/\//i.test(ref)) broken.push({file, ref, reason: 'outside project URL prefix'});
      continue;
    }
    let relative;
    try { relative = decodeURIComponent(url.pathname.slice(prefix.length)); } catch { broken.push({file, ref, reason: 'invalid URL encoding'}); continue; }
    if (!relative || relative.endsWith('/')) relative += 'index.html';
    count++;
    if (retired.has(relative)) retiredLinks.push({file, ref});
    const target = path.resolve(root, relative);
    if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) broken.push({file, ref, target: relative});
  }
}
assert.deepEqual(retiredLinks, [], 'Active links to retired routes');
assert.deepEqual(broken, [], 'Missing local link targets');
console.log(JSON.stringify({status: 'passed', files: files.length, localReferences: count, retiredLinks: 0, missingTargets: 0}));
