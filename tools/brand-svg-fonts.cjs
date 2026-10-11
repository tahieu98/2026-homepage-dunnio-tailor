// An SVG displayed as <img> cannot inherit page fonts; embed the brand faces
// in the ratio demonstration artwork so these labels remain self-contained.
const fs = require('fs'), path = require('path');
module.exports = () => {
  const faces = [['Garamon Pro Display', 'GaramondPremrPro.woff2'], ['Afacad', 'Afacad-Regular.woff2']];
  return '<style>' + faces.map(([family, file]) => `@font-face{font-family:"${family}";font-weight:400;src:url(data:font/woff2;base64,${fs.readFileSync(path.resolve(__dirname, '../assets/fonts', file)).toString('base64')}) format("woff2")}`).join('') + '</style>';
};
