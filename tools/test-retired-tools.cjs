const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const manifest = require('./retired-tools.json');
const retired = require('./retired-tool.cjs');
for (const name of [...manifest.writers, ...manifest.historicalChecks]) {
  let imports = 0;
  assert.throws(() => vm.runInNewContext(fs.readFileSync('tools/' + name, 'utf8'), {
    __filename: name,
    require(id) {
      imports++;
      assert.equal(id, './retired-tool.cjs', `${name} imported a side-effecting dependency before its guard`);
      return retired;
    }
  }), /is retired/);
  assert.equal(imports, 1);
  const result = require('node:child_process').spawnSync(process.execPath, ['tools/' + name], {encoding: 'utf8'});
  assert.equal(result.status, 1, name);
  assert.match(result.stderr, /is retired/, name);
}
execFileSync(process.execPath, ['tools/verify-final-lock.cjs'], {stdio: 'inherit'});
console.log(`PASS: ${manifest.writers.length + manifest.historicalChecks.length} retired tools fail before imports; all frozen hashes preserved.`);
