import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

// Reuse the YAML parser already locked as an ESLint dependency; no release tooling dependency.
const require = createRequire(import.meta.url);
const yaml: { load: (text: string) => unknown } = require('js-yaml');
for (const file of readdirSync('.github/workflows').filter((name) => /\.ya?ml$/.test(name))) {
  const workflow = yaml.load(readFileSync(`.github/workflows/${file}`, 'utf8'));
  assert(workflow && typeof workflow === 'object' && 'on' in workflow && 'jobs' in workflow, `${file}: invalid workflow`);
  console.log(`${file}: YAML valid`);
}
