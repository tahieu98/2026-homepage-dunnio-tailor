/* Read-only integrity check for the final handoff, retained source pages, and runtime assets. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const lock = JSON.parse(fs.readFileSync('docs/final-v32-lock.json', 'utf8'));
const expectedFinal = '9fbd485d477e11b43c90a087c94eefcba8b4d9aa707c70e0806c92dc3b7215b6';
assert.equal(lock.algorithm, 'sha256');
assert.equal(Object.keys(lock.files).length, 170, 'Lock must cover 167 runtime assets and three retained pages');
assert.equal(lock.files['v3.2-wedding-story.html'], expectedFinal, 'Final baseline hash changed');
const failures = [];
for (const [file, expected] of Object.entries(lock.files)) {
  if (!fs.existsSync(file)) { failures.push(`Missing frozen file: ${file}`); continue; }
  const actual = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if (actual !== expected) failures.push(`Changed frozen file: ${file} (expected ${expected}, got ${actual})`);
}
assert.equal(failures.length, 0, failures.join('\n'));
console.log(`PASS: ${Object.keys(lock.files).length} frozen files match baseline ${lock.baselineCommit}; v3.2 SHA-256 ${expectedFinal}.`);
