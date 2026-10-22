import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseEnv } from 'node:util';

const privateValues: string[] = [];
for (const file of ['.env', '.env.development', '.env.production']) {
  if (!existsSync(file)) continue;
  for (const [key, value] of Object.entries(parseEnv(readFileSync(file, 'utf8')))) {
    if (/(API_KEY|WEBHOOK_URL)$/.test(key) && value && value.length > 8) privateValues.push(value);
  }
}
function scan(directory: string) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { scan(path); continue; }
    if (!/\.(js|html|map)$/.test(path)) continue;
    const text = readFileSync(path, 'utf8');
    if (/OPENROUTER_API_KEY|N8N_\w*WEBHOOK_URL|Bearer /.test(text) || privateValues.some((value) => text.includes(value))) {
      throw new Error('Private integration configuration found in frontend output. Values withheld.');
    }
  }
}
scan('dist');
console.log('Frontend output contains no configured private integration values.');
