const fs = require('fs'), path = require('path'), crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const source = process.env.DUNNIO_FONT_SOURCE || path.resolve(root, '../dunnio-tailor-redesign/wp-content/themes/dunnio-flatsome/assets/reference/dunniotailor.com/sites/all/themes/t4t_theme/font');
const faces = [
  ['Garamon Pro Display', 'GaramondPremrPro.woff2', 400],
  ['Afacad', 'Afacad-Regular.woff2', 400],
  ['Afacad', 'Afacad-Medium.woff2', 500],
  ['Afacad', 'Afacad-SemiBold.woff2', 600],
  ['Afacad', 'Afacad-Bold.woff2', 700],
];
// Reuse the exact family alias and weights declared in Dunnio's original CSS.
// Validate all sources before writing so a missing clone cannot leave a partial update.
const buffers = faces.map(([, file]) => fs.readFileSync(path.join(source, file)));
fs.mkdirSync(path.join(root, 'assets/fonts'), { recursive: true });
const files = faces.map(([family, file, weight], i) => {
  fs.writeFileSync(path.join(root, 'assets/fonts', file), buffers[i]);
  return { family, weight, file: 'assets/fonts/' + file, source: path.join(source, file).replaceAll('\\', '/'), bytes: buffers[i].length, sha256: crypto.createHash('sha256').update(buffers[i]).digest('hex') };
});
const css = '/* Exact font assets from the existing Dunnio Tailor clone. */\n' + faces.map(([family, file, weight]) => `@font-face {\n  font-family: "${family}";\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url("fonts/${file}") format("woff2");\n}\n`).join('\n');
fs.writeFileSync(path.join(root, 'assets/fonts.css'), css);
fs.writeFileSync(path.join(root, 'docs/font-provenance.json'), JSON.stringify({ revision: 'typography-20261012', delivery: 'Self-hosted original Dunnio WOFF2 assets; font-display:swap; no external font requests', naming: 'Garamon Pro Display is the exact CSS family alias in the original site; the asset is GaramondPremrPro.woff2', files }, null, 2) + '\n');
console.log(JSON.stringify({ files: files.length, bytes: files.reduce((n, f) => n + f.bytes, 0) }));
