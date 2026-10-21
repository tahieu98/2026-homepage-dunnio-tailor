require('./retired-tool.cjs')(__filename); // Request 30: frozen final protection.
// One-time, repeatable migration of the earlier concept typography.
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => fs.writeFileSync(path.join(root, file), text);
const publicHtml = fs.readdirSync(root).filter(file => file.endsWith('.html'));
const sources = ['tools/build.cjs', 'tools/apply-brand-system.cjs', 'tools/update-brand-docs.cjs', 'tools/docs-index.cjs', 'tools/verify-brand.cjs'];
for (const file of [...publicHtml, ...sources, 'docs/screenshot-index.html']) {
  let text = read(file).replaceAll('brand-20261012', 'typography-20261012');
  if (file !== 'tools/verify-brand.cjs') text = text.replaceAll('Cormorant 600', 'Garamon Pro Display 400').replaceAll('Cormorant', 'Garamon Pro Display').replaceAll('Montserrat', 'Afacad');
  text = text.replace('tra cứu typography, contrast, focus và error placement; dùng Garamon Pro Display/Afacad phù hợp thời trang.', 'tra cứu phân cấp chữ, contrast, focus và error placement. Font đề xuất ở bước khám phá được thay bằng Garamon Pro Display/Afacad theo yêu cầu nhận diện của người dùng.');
  text = text.replace('Font Garamon Pro Display/Afacad self-hosted với OFL và font-display:swap.', 'Font Garamon Pro Display/Afacad lấy đúng file từ bản clone Dunnio, self-hosted với font-display:swap.');
  text = text.replace('Body mobile 16px, metadata 12–14px', 'Nội dung chính mobile 16–17px, mô tả hero 17px; metadata 12–14px');
  write(file, text);
}
let styles = read('assets/styles.css').replaceAll("Georgia,'Times New Roman',serif", 'var(--font-primary)').replaceAll('Georgia,serif', 'var(--font-primary)').replaceAll('Arial,Helvetica,sans-serif', 'var(--font-secondary)').replaceAll('Arial,sans-serif', 'var(--font-secondary)');
write('assets/styles.css', styles);
// The screenshot/heatmap generators have their own inline style defaults.
for (const file of ['docs/screenshot-index.html', 'tools/docs-index.cjs']) {
  let text = read(file).replaceAll('14px/1.6 Arial', '16px/1.6 var(--font-secondary)').replaceAll('15px/1.6 Arial', '16px/1.6 var(--font-secondary)').replaceAll('44px Georgia', '44px var(--font-primary)');
  write(file, text);
}
let verification = read('tools/verify-brand.cjs').replace("document.fonts.check('600 24px Cormorant')&&document.fonts.check('400 16px Montserrat')", "document.fonts.check('400 24px \"Garamon Pro Display\"')&&document.fonts.check('400 17px Afacad')").replace("state.uiFont.includes('Montserrat')", "state.uiFont.includes('Afacad')");
write('tools/verify-brand.cjs', verification);
for (const file of ['README.md', 'docs/BRAND-UX-UPDATE.md', 'design-system/dunnio-tailor/MASTER.md']) {
  let text = read(file);
  if (file === 'docs/BRAND-UX-UPDATE.md') {
    text = text.replace('Typography Cormorant/Montserrat tạo nhịp editorial và hệ labels rõ', 'Typography Garamon Pro Display/Afacad sử dụng đúng file font từ website gốc, tạo nhịp editorial và hệ labels rõ');
    text = text.replace('UI/UX Pro Max trả về Typography Cormorant/Montserrat phù hợp thời trang.', 'UI/UX Pro Max ban đầu đề xuất Cormorant/Montserrat. Theo yêu cầu nhận diện mới, cặp font này đã được thay hoàn toàn bằng Garamon Pro Display/Afacad lấy từ bản clone Dunnio.');
  } else if (file === 'README.md') {
    text = text.replace('Font Cormorant/Montserrat self-hosted với OFL và font-display:swap.', 'Font Garamon Pro Display/Afacad lấy đúng file từ bản clone Dunnio, self-hosted với font-display:swap.');
  } else {
    text = text.replace('- Cormorant, weight 600: display/editorial headings.', '- `--font-primary: "Garamon Pro Display", serif`: display/editorial headings, real weight 400 from `GaramondPremrPro.woff2`; avoid synthesizing a bold serif.');
    text = text.replace('- Montserrat, weights 400–600: body, prices, labels, navigation and modern hero headings.', '- `--font-secondary: "Afacad", sans-serif`: body, prices, labels, navigation and modern hero headings. Original static files supply weights 400, 500, 600 and 700.');
    text = text.replace('- Body copy 16px on mobile; supporting metadata 12–14px. Labels remain visible.', '- Main mobile copy 16–17px; hero description 17px; BOD prose 18px desktop / 17px mobile; supporting metadata 12–14px. Labels remain visible.');
    text = text.replace('- Self-hosted WOFF2 with font-display:swap, fallback Georgia/Arial. Source and OFL files accompany the assets.', '- Self-hosted WOFF2 copied byte-for-byte from the original Dunnio clone, with font-display:swap and generic serif/sans-serif fallbacks. Hashes and original paths: `docs/font-provenance.json`. The CSS alias preserves the original spelling “Garamon Pro Display”.');
  }
  write(file, text);
}
console.log('Migrated font references, structural defaults, cache revision, generators and brand documentation.');
