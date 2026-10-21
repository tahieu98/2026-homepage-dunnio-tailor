/* Fail before historical imports or side effects can overwrite frozen files. */
module.exports = function retiredTool(file) {
  const name = require('node:path').basename(file);
  throw new Error(`${name} is retired. v3.2 and existing assets are frozen. Use node tools/build-wedding-variants.cjs --check, node tools/test-cleanup.cjs, and node tools/check-current-links.cjs for current read-only checks. See docs/PROJECT-MEMORY.md.`);
};
