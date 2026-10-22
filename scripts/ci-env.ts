import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

// Writes only in an isolated CI checkout, never over an operator's environment.
const fixture = parseEnv(readFileSync('config/ci.env.example', 'utf8'));
for (const mode of ['development', 'production']) {
  const values = { ...parseEnv(readFileSync(`config/${mode}.env.example`, 'utf8')), ...fixture };
  if (mode === 'development') values.SITE_URL = parseEnv(readFileSync('config/development.env.example', 'utf8')).SITE_URL;
  writeFileSync(`.env.${mode}`, Object.entries(values).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join('\n') + '\n', { mode: 0o600, flag: 'wx' });
  if (mode === 'production' && process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `image=${values.APP_IMAGE}:${values.PESTLORD_VERSION}\n`);
  }
}
