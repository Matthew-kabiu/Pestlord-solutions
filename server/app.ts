import { OpenAPIHono } from '@hono/zod-openapi';
import { bodyLimit } from 'hono/body-limit';
import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { HTTPException } from 'hono/http-exception';
import { timeout } from 'hono/timeout';
import type { Logger } from 'pino';
import type { Context } from 'hono';
import type { Config } from './config/env.js';
import type { AppEnv } from './types.js';
import { integrationRoutes } from './modules/integrations/integrations.routes.js';
import { IntegrationError, type IntegrationService } from './modules/integrations/integrations.service.js';
import { isPagePath, renderHead, renderSitemap } from '../seo/pages.js';

type Dependencies = { config: Config; service: IntegrationService; log: Logger; clientAddress?: (c: Context<AppEnv>) => string };

/** One factory per process/test; no global clients, secrets or mutable stores. */
export function createApp({ config, service, log, clientAddress = () => 'local' }: Dependencies) {
  const app = new OpenAPIHono<AppEnv>();
  app.use('*', requestId());
  app.use('*', async (c, next) => {
    if (!config.SITE_INDEXABLE || c.req.path === '/admin' || c.req.path.startsWith('/api/')) c.header('X-Robots-Tag', 'noindex, nofollow');
    await next();
  });
  app.use('*', secureHeaders({
    contentSecurityPolicy: {
      defaultSrc: ["'self'"], baseUri: ["'self'"], connectSrc: ["'self'"],
      fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
      formAction: ["'self'"], frameAncestors: ["'self'"], frameSrc: ['https://www.google.com'],
      imgSrc: ["'self'", 'data:', 'https://images.unsplash.com', 'https://ui-avatars.com'],
      objectSrc: ["'none'"], scriptSrc: ["'self'"], styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    }, referrerPolicy: 'strict-origin-when-cross-origin',
  }));
  const failure = (c: Context<AppEnv>, error: string, status: 400 | 403 | 413 | 429) => c.json({ success: false as const, error, requestId: c.get('requestId') }, status);
  app.use('/api/*', bodyLimit({ maxSize: config.BODY_LIMIT_BYTES, onError: (c) => failure(c, 'Request body too large', 413) }));
  app.use('/api/*', timeout(config.REQUEST_TIMEOUT_MS));
  // Single-instance gateway: bounded per-peer budget. Forwarded IP headers are never trusted.
  const clients = new Map<string, { count: number; expires: number }>();
  app.use('/api/*', async (c, next) => {
    if (c.req.method === 'POST') {
      if (c.req.header('origin') !== new URL(config.SITE_URL).origin || c.req.header('sec-fetch-site') === 'cross-site') {
        return failure(c, 'Origin not allowed', 403);
      }
      const now = Date.now();
      for (const [key, value] of clients) if (value.expires <= now) clients.delete(key);
      const key = clientAddress(c);
      const bucket = clients.get(key) ?? { count: 0, expires: now + config.RATE_LIMIT_WINDOW_MS };
      if (bucket.count >= config.RATE_LIMIT_MAX || (!clients.has(key) && clients.size >= 10000)) {
        c.header('Retry-After', String(Math.ceil(config.RATE_LIMIT_WINDOW_MS / 1000)));
        return failure(c, 'Too many requests', 429);
      }
      bucket.count++;
      clients.set(key, bucket);
    }
    await next();
  });
  app.onError((error, c) => {
    const status = error instanceof IntegrationError ? 502 : error instanceof HTTPException ? error.status : 500;
    // Never log upstream errors, URLs, request bodies or credentials.
    log.error({ requestId: c.get('requestId'), status }, 'Request failed');
    return c.json({ success: false, error: status === 400 ? 'Invalid request' : 'Service temporarily unavailable', requestId: c.get('requestId') }, status);
  });
  app.notFound((c) => c.json({ success: false, error: 'Not found', requestId: c.get('requestId') }, 404));
  app.get('/health', (c) => c.json({ status: 'ok' }));
  const routes = app.route('/api', integrationRoutes(service));
  if (config.API_DOCS_ENABLED) app.doc('/api/openapi.json', { openapi: '3.0.0', info: { title: 'PestLord API', version: '1.0.0' } });
  app.get('/robots.txt', (c) => c.text(config.SITE_INDEXABLE
    ? `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${new URL('/sitemap.xml', config.SITE_URL).href}\n`
    : 'User-agent: *\nDisallow: /\n'));
  app.get('/sitemap.xml', (c) => {
    if (!config.SITE_INDEXABLE) return c.notFound();
    c.header('Content-Type', 'application/xml; charset=utf-8');
    return c.body(renderSitemap(config.SITE_URL));
  });
  return { app, routes };
}
export type ApiType = ReturnType<typeof createApp>['routes'];

export function renderPage(template: string, path: string, config: Config) {
  if (!isPagePath(path)) return null;
  return template.replace('<!--seo-head-->', renderHead(path, config.SITE_URL, config.SITE_INDEXABLE));
}
