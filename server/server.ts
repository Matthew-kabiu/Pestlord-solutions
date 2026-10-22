import { readFile } from 'node:fs/promises';
import { Server } from 'node:http';
import { serve } from '@hono/node-server';
import { getConnInfo } from '@hono/node-server/conninfo';
import { serveStatic } from '@hono/node-server/serve-static';
import pino from 'pino';
import { loadConfig } from './config/env.js';
import { createApp, renderPage } from './app.js';
import { createIntegrationService } from './modules/integrations/integrations.service.js';

const config = loadConfig(process.env);
const log = pino({ level: config.LOG_LEVEL, base: undefined });
const { app } = createApp({ config, log, service: createIntegrationService(config), clientAddress: (c) => getConnInfo(c).remote.address ?? 'unknown' });

if (config.NODE_ENV === 'production') {
  const template = await readFile('dist/index.html', 'utf8');
  app.get('*', async (c, next) => {
    const html = renderPage(template, c.req.path, config);
    if (html) { c.header('Cache-Control', 'no-store'); return c.html(html); }
    await next();
  });
  app.use('/assets/*', async (c, next) => { c.header('Cache-Control', 'public, max-age=31536000, immutable'); await next(); });
  app.use('*', serveStatic({ root: './dist' }));
}
const server = serve({ fetch: app.fetch, port: config.API_PORT, hostname: config.BIND_HOST });
if (!(server instanceof Server)) throw new Error('Expected an HTTP server');
const httpServer = server;
httpServer.requestTimeout = config.REQUEST_TIMEOUT_MS;
httpServer.headersTimeout = config.REQUEST_TIMEOUT_MS;
log.info('PestLord API started');
let closing = false;
function shutdown() {
  if (closing) return;
  closing = true;
  const timer = setTimeout(() => { httpServer.closeAllConnections(); process.exit(1); }, config.SHUTDOWN_TIMEOUT_MS);
  timer.unref();
  httpServer.close(() => { clearTimeout(timer); process.exit(0); });
  httpServer.closeIdleConnections();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
