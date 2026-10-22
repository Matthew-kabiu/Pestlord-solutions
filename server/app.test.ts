import { describe, expect, it, vi } from 'vitest';
import pino from 'pino';
import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { createApp, renderPage } from './app.js';
import { loadConfig } from './config/env.js';
import { createIntegrationService } from './modules/integrations/integrations.service.js';
import { pages } from '../seo/pages.js';

const source = {
  ...parseEnv(readFileSync('config/development.env.example', 'utf8')),
  ...parseEnv(readFileSync('config/ci.env.example', 'utf8')),
};
function setup(overrides: Record<string, string> = {}, fetcher = vi.fn<typeof fetch>(async () => new Response('{}'))) {
  const config = loadConfig({ ...source, ...overrides });
  const service = createIntegrationService(config, fetcher);
  const { app } = createApp({ config, service, log: pino({ level: 'silent' }) });
  const post = (path: string, body: unknown, origin = config.SITE_URL) => app.request(`/api/${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', origin }, body: JSON.stringify(body),
  });
  return { app, post, fetcher, config };
}
const quote = { name: 'Test User', email: 'test@example.invalid', phone: '+254700000000', service_type: 'Other', location: 'Nairobi', additional_notes: '', submitted_at: '2026-10-22T00:00:00.000Z', source: 'website-quote' };

describe('environment contract', () => {
  it('requires every defined field without logging values', () => {
    for (const key of Object.keys(source)) {
      if (key === 'APP_IMAGE' || key === 'PESTLORD_VERSION') continue;
      const invalid: Record<string, string | undefined> = { ...source, [key]: undefined };
      expect(() => loadConfig(invalid), key).toThrow(key);
    }
    expect(() => loadConfig({ ...source, OPENROUTER_API_KEY: '' })).toThrow('OPENROUTER_API_KEY');
  });
  it('rejects public secret variables, wrong ports and untrusted provider URLs', () => {
    for (const override of [{ VITE_OPENROUTER_API_KEY: 'do-not-print' }, { API_PORT: '0' }, { API_PORT: '70000' }, { OPENROUTER_API_URL: 'https://attacker.invalid' }]) {
      expect(() => loadConfig({ ...source, ...override })).toThrow('Invalid environment variables');
    }
  });
  it('enforces production HTTPS and private API documentation', () => {
    expect(() => loadConfig({ ...source, NODE_ENV: 'production', APP_IMAGE: 'test', API_DOCS_ENABLED: 'false', SITE_URL: 'http://example.invalid' })).toThrow('SITE_URL');
    expect(() => loadConfig({ ...source, NODE_ENV: 'production', APP_IMAGE: 'test' })).toThrow('API_DOCS_ENABLED');
  });
});

describe('gateway', () => {
  it('returns health without calling integrations', async () => {
    const { app, fetcher } = setup();
    expect((await app.request('/health')).status).toBe(200);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('rejects unknown request fields, malformed JSON, oversized bodies and wrong origins', async () => {
    const { post, app, fetcher, config } = setup();
    expect((await post('chat', { text: 'ants', model: 'attacker' })).status).toBe(400);
    expect((await post('chat', { text: 'ants' }, 'https://attacker.invalid')).status).toBe(403);
    expect((await post('chat', { text: 'x'.repeat(config.BODY_LIMIT_BYTES) })).status).toBe(413);
    expect((await app.request('/api/chat', { method: 'POST', headers: { origin: config.SITE_URL, 'Content-Type': 'application/json' }, body: '{' })).status).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('forwards booking and quote to distinct configured destinations and neutralizes formulas', async () => {
    const { post, fetcher, config } = setup();
    expect((await post('quote', { ...quote, additional_notes: '=IMPORTDATA("bad")' })).status).toBe(202);
    expect(fetcher.mock.calls[0][0]).toBe(config.N8N_QUOTE_WEBHOOK_URL);
    expect(JSON.parse(String(fetcher.mock.calls[0][1]?.body)).additional_notes).toBe('\'=IMPORTDATA("bad")');
    expect((await post('booking', { ...quote, source: 'website-booking', preferred_date: '2026-10-23', preferred_time: 'Morning' })).status).toBe(202);
    expect(fetcher.mock.calls[1][0]).toBe(config.N8N_BOOKING_WEBHOOK_URL);
  });
  it('keeps the provider key and system prompt server-side', async () => {
    const fetcher = vi.fn<typeof fetch>(async () => Response.json({ choices: [{ message: { content: 'Seal food containers.' } }] }));
    const { post, config } = setup({}, fetcher);
    const result = await post('chat', { text: 'How do I prevent ants?' });
    expect(await result.json()).toEqual({ content: 'Seal food containers.' });
    expect(fetcher.mock.calls[0][1]?.headers).toMatchObject({ Authorization: `Bearer ${config.OPENROUTER_API_KEY}` });
    const body = JSON.parse(String(fetcher.mock.calls[0][1]?.body));
    expect(body.model).toBe(config.OPENROUTER_MODEL_ID);
    expect(body.messages[0].role).toBe('system');
    expect(fetcher.mock.calls[0][1]?.redirect).toBe('error');
  });
  it('redacts upstream failures and handles invalid model responses', async () => {
    for (const fetcher of [vi.fn<typeof fetch>(async () => { throw new Error('secret-provider-url'); }), vi.fn<typeof fetch>(async () => Response.json({ unexpected: true }))]) {
      const { post } = setup({}, fetcher);
      const result = await post('chat', { text: 'ants' });
      expect(result.status).toBe(502);
      expect(await result.text()).not.toContain('secret-provider-url');
    }
  });
  it('rate limits before making another upstream call', async () => {
    const { post, fetcher } = setup({ RATE_LIMIT_MAX: '1' });
    expect((await post('quote', quote)).status).toBe(202);
    expect((await post('quote', quote)).status).toBe(429);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});

describe('SEO', () => {
  it('generates distinct escaped metadata for all known routes and rejects unknown paths', () => {
    const { config } = setup();
    for (const [path, page] of Object.entries(pages)) {
      const html = renderPage('<!--seo-head-->', path, config);
      expect(html).toContain(page.title.replaceAll('&', '&amp;'));
      expect(html).toContain(new URL(path, config.SITE_URL).href);
    }
    expect(renderPage('<!--seo-head-->', '/missing', config)).toBeNull();
  });
  it('blocks development indexing and omits admin/API from production sitemap', async () => {
    const dev = setup();
    expect(await (await dev.app.request('/robots.txt')).text()).toContain('Disallow: /');
    expect((await dev.app.request('/sitemap.xml')).status).toBe(404);
    const prod = setup({ NODE_ENV: 'production', API_DOCS_ENABLED: 'false', SITE_INDEXABLE: 'true', APP_IMAGE: 'test' });
    const sitemap = await (await prod.app.request('/sitemap.xml')).text();
    expect(sitemap).toContain('/services');
    expect(sitemap).not.toContain('/admin');
    expect(sitemap).not.toContain('/api/');
    expect((await prod.app.request('/api/openapi.json')).status).toBe(404);
  });
});
