import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { readEnvironment } from './environment.js';

/** Run only in an isolated checkout with scripts/ci-env.ts fixture files. */
function compose(mode: string, args: string[]) {
  const file = mode === 'development' ? 'docker-compose.dev.yml' : 'docker-compose.yml';
  const result = spawnSync('docker', ['compose', '-p', `pestlord-smoke-${process.pid}-${mode}`, '--env-file', `.env.${mode}`, '-f', file, ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`${mode} compose command failed`);
}
const modes = process.argv.includes('--production-only') ? ['production'] : ['development', 'production'];
for (const mode of modes) {
  const { config } = readEnvironment(mode);
  assert(config.OPENROUTER_API_KEY === 'ci-only-not-a-real-key', 'Smoke tests require fake CI configuration');
  const origin = `http://${config.APP_HOST}:${config.APP_PORT}`;
  try {
    compose(mode, mode === 'development' ? ['up', '-d', '--build', '--wait', '--wait-timeout', '120'] : ['up', '-d', '--no-build', '--wait', '--wait-timeout', '60']);
    const paths = ['/', '/services', '/booking', '/contact'];
    for (const path of paths) {
      // Vite has no service health check; retry only until its listener is ready.
      let response: Response | undefined;
      for (let attempt = 0; attempt < 30; attempt++) {
        try { response = await fetch(new URL(path, origin)); if (response.ok) break; } catch { /* startup */ }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      assert(response?.ok, `${mode}: ${path} must return success`);
      const html = await response.text();
      assert(html.includes('rel="canonical"'), `${mode}: canonical missing`);
      assert(!html.includes('ci-only-not-a-real-key'), `${mode}: secret leaked`);
      assert(!html.includes('<!--seo-head-->'), `${mode}: unresolved SEO marker`);
      if (mode === 'production') assert(html.includes(`href="${new URL(path, config.SITE_URL).href}"`), 'Canonical must use runtime SITE_URL');
    }
    assert((await fetch(`${origin}/health`)).ok);
    const bad = await fetch(`${origin}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json', origin: config.SITE_URL }, body: '{}' });
    assert.equal(bad.status, 400);
    if (mode === 'production') {
      assert.equal((await fetch(`${origin}/does-not-exist`)).status, 404);
      assert.equal((await fetch(`${origin}/.env.production`)).status, 404);
      assert((await (await fetch(`${origin}/robots.txt`)).text()).includes('Sitemap:'));
      assert((await fetch(`${origin}/sitemap.xml`)).ok);
      assert.equal((await fetch(`${origin}/api/openapi.json`)).status, 404);
      const alternate = new URL(config.SITE_URL);
      alternate.hostname = `runtime-probe.${alternate.hostname}`;
      const file = '.env.production';
      const original = readFileSync(file, 'utf8');
      try {
        writeFileSync(file, original.replace(/^SITE_URL=.*$/m, `SITE_URL=${JSON.stringify(alternate.origin)}`));
        compose(mode, ['up', '-d', '--no-build', '--pull', 'never', '--force-recreate', '--wait', '--wait-timeout', '60']);
        // A recreated container invalidates Node's pooled keep-alive connection.
        let html = '';
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const response = await fetch(`${origin}/services`, { headers: { Connection: 'close' } });
            assert(response.ok);
            html = await response.text();
            break;
          } catch (error) {
            if (attempt === 2) throw error;
          }
        }
        assert(html.includes(`href="${new URL('/services', alternate.origin).href}"`), 'Same image must render changed runtime origin');
        console.log('production: same image rendered alternate runtime SITE_URL.');
      } finally { writeFileSync(file, original); }
    }
    console.log(`${mode}: HTTP smoke checks passed (no upstream requests).`);
  } finally { compose(mode, ['down', '--remove-orphans']); }
}
