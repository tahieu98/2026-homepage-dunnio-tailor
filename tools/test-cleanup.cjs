/* Cleanup regression checks. Generator executions are sandboxed: no writes reach disk. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const retired = ['v1-heritage-atelier.html', 'v2-design-studio.html', 'v4-modern-essentials.html', 'v5-fit-concierge.html'];
const retained = ['v3-wedding-story.html', 'v3.1-wedding-story.html', 'v3.2-wedding-story.html'];
for (const file of retired) assert(!fs.existsSync(file), `Retired route still exists: ${file}`);
for (const file of retained) assert(fs.existsSync(file), `Retained route missing: ${file}`);
execFileSync(process.execPath, ['tools/verify-final-lock.cjs'], { stdio: 'inherit' });

const generator = path.resolve('tools/build-wedding-variants.cjs');
const source = fs.readFileSync(generator, 'utf8');
const localRequire = createRequire(generator);
function run(args, changedOutput) {
  const writes = [];
  const reads = [];
  const safeFs = Object.assign({}, fs, {
    readFileSync(file, ...options) {
      const name = String(file);
      assert(!retired.includes(name), `Generator reads retired route: ${name}`);
      reads.push(name);
      const contents = fs.readFileSync(file, ...options);
      return name === changedOutput ? Buffer.concat([contents, Buffer.from('\nchanged')]) : contents;
    },
    writeFileSync(file, output) { writes.push([String(file), Buffer.from(output)]); }
  });
  let error;
  try {
    vm.runInNewContext(source, {
      require: name => name === 'fs' || name === 'node:fs' ? safeFs : localRequire(name),
      process: { argv: [process.execPath, generator, ...args] },
      console: { log() {} }, Buffer
    }, { filename: generator });
  } catch (caught) { error = caught; }
  return { writes, reads, error };
}
const check = run(['--check']);
assert.ifError(check.error);
assert.equal(check.writes.length, 0, '--check must not write');
for (const file of retained.slice(1)) {
  const changed = run(['--check'], file);
  assert(changed.error && changed.error.message.includes('Generated output differs from disk: ' + file), `Check mode failed to detect changed output: ${file}`);
  assert.equal(changed.writes.length, 0, 'Mismatching check attempted a write');
}
const normal = run([]);
assert.ifError(normal.error);
assert.deepEqual(normal.writes.map(([file]) => file), ['v3.1-wedding-story.html']);
assert(normal.writes[0][1].equals(fs.readFileSync('v3.1-wedding-story.html')), 'Default output differs from current v3.1');
for (const args of [['--variant=3.2'], ['--variant', '3.2'], ['--write-final'], ['--check', '--variant=3.2']]) {
  const attempt = run(args);
  assert(attempt.error && /frozen final/i.test(attempt.error.message), `Missing frozen-final error for ${args.join(' ')}`);
  assert.equal(attempt.writes.length, 0, 'Rejected final request attempted a write');
  assert.equal(attempt.reads.length, 0, 'Rejected final request must fail before reading generation inputs');
}
console.log('PASS: retired routes absent; retained pages and assets frozen; generation matches disk, check mode is read-only, and final writes fail before work.');
