import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { envSchema } from '../server/config/env.js';

// Opt-in migration reads credentials only into memory and never prints them.
const legacy = process.argv.includes('--migrate') && existsSync('.env') ? parseEnv(readFileSync('.env', 'utf8')) : {};
for (const mode of ['development', 'production']) {
  const file = `.env.${mode}`;
  if (existsSync(file)) { console.log(`${file} already exists; unchanged.`); continue; }
  const template = readFileSync(`config/${mode}.env.example`, 'utf8');
  const values = parseEnv(template);
  const mapping = {
    OPENROUTER_API_URL: 'VITE_OPENROUTER_API_URL', OPENROUTER_API_KEY: 'VITE_OPENROUTER_API_KEY',
    OPENROUTER_MODEL_ID: 'VITE_OPENROUTER_MODEL_ID', N8N_BOOKING_WEBHOOK_URL: 'VITE_N8N_WEBHOOK_URL',
    N8N_QUOTE_WEBHOOK_URL: 'VITE_N8N_QUOTE_WEBHOOK_URL',
  };
  for (const [key, oldKey] of Object.entries(mapping)) if (legacy[oldKey]) values[key] = legacy[oldKey];
  const output = Object.entries(values).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join('\n') + '\n';
  writeFileSync(file, output, { mode: 0o600, flag: 'wx' });
  const result = envSchema.safeParse(values);
  console.log(`${file} created. Missing/invalid fields: ${result.success ? 'none' : result.error.issues.map((issue) => issue.path.join('.')).join(', ')}`);
}
