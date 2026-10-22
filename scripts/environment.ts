import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { loadConfig } from '../server/config/env.js';

export function readEnvironment(mode: string) {
  if (!['development', 'production'].includes(mode)) throw new Error('Select development or production explicitly.');
  const file = `.env.${mode}`;
  let values: ReturnType<typeof parseEnv>;
  try { values = parseEnv(readFileSync(file, 'utf8')); }
  catch { throw new Error(`Missing ${file}. Follow docs/ENVIRONMENT.md.`); }
  if (values.NODE_ENV !== mode) throw new Error(`NODE_ENV must match ${file}.`);
  return { values, config: loadConfig(values), file };
}
