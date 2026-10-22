import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { bookingSchema, chatSchema, chatResponseSchema, errorSchema, quoteSchema, successSchema } from './integrations.schemas.js';
import type { IntegrationService } from './integrations.service.js';
import type { AppEnv } from '../../types.js';

const errors = Object.fromEntries([400, 403, 413, 429, 502, 504].map((status) => [status, {
  description: 'Request rejected or integration unavailable', content: { 'application/json': { schema: errorSchema } },
}]));

export function integrationRoutes(service: IntegrationService) {
  return new OpenAPIHono<AppEnv>({ defaultHook: (result, c) => {
    if (!result.success) return c.json({ success: false as const, error: 'Invalid request fields', requestId: c.get('requestId') }, 400);
  } })
    .openapi(createRoute({ method: 'post', path: '/booking', tags: ['Forms'], summary: 'Request an inspection',
      request: { body: { required: true, content: { 'application/json': { schema: bookingSchema } } } },
      responses: { 202: { description: 'Booking received', content: { 'application/json': { schema: successSchema } } }, ...errors },
    }), async (c) => { await service.booking(c.req.valid('json')); return c.json({ success: true as const }, 202); })
    .openapi(createRoute({ method: 'post', path: '/quote', tags: ['Forms'], summary: 'Request a quote',
      request: { body: { required: true, content: { 'application/json': { schema: quoteSchema } } } },
      responses: { 202: { description: 'Quote received', content: { 'application/json': { schema: successSchema } } }, ...errors },
    }), async (c) => { await service.quote(c.req.valid('json')); return c.json({ success: true as const }, 202); })
    .openapi(createRoute({ method: 'post', path: '/chat', tags: ['Chat'], summary: 'Ask PestPal a pest management question',
      request: { body: { required: true, content: { 'application/json': { schema: chatSchema } } } },
      responses: { 200: { description: 'PestPal response', content: { 'application/json': { schema: chatResponseSchema } } }, ...errors },
    }), async (c) => c.json({ content: await service.chat(c.req.valid('json').text) }, 200));
}
