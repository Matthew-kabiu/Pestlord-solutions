import { z } from 'zod';

const port = z.coerce.number().int().min(1).max(65535);
const positive = z.coerce.number().int().positive();
const httpUrl = z.url().refine((value) => {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
}, 'Must be an HTTP(S) URL without credentials');
const origin = httpUrl.refine((value) => {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return url.pathname === '/' && !url.search && !url.hash;
}, 'Must be an origin without a path, query or fragment');

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  APP_HOST: z.string().min(1),
  APP_PORT: port,
  WEB_PORT: port,
  API_PORT: port,
  BIND_HOST: z.string().min(1),
  HEALTHCHECK_HOST: z.string().min(1),
  API_UPSTREAM_HOST: z.string().min(1),
  SITE_URL: origin,
  SITE_INDEXABLE: z.enum(['true', 'false']).transform((value) => value === 'true'),
  OPENROUTER_API_URL: httpUrl.refine((value) => {
    if (!URL.canParse(value)) return false;
    const url = new URL(value);
    return url.origin === 'https://openrouter.ai' && url.pathname === '/api/v1/chat/completions' && !url.search && !url.hash;
  }, 'Must be the OpenRouter chat completions endpoint'),
  OPENROUTER_API_KEY: z.string().trim().min(1),
  OPENROUTER_MODEL_ID: z.string().trim().min(1),
  N8N_BOOKING_WEBHOOK_URL: httpUrl,
  N8N_QUOTE_WEBHOOK_URL: httpUrl,
  BODY_LIMIT_BYTES: positive,
  REQUEST_TIMEOUT_MS: positive,
  SHUTDOWN_TIMEOUT_MS: positive,
  RATE_LIMIT_WINDOW_MS: positive,
  RATE_LIMIT_MAX: positive,
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  API_DOCS_ENABLED: z.enum(['true', 'false']).transform((value) => value === 'true'),
  APP_IMAGE: z.string().min(1).optional(),
  PESTLORD_VERSION: z.string().regex(/^(latest|\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/).optional(),
}).superRefine((env, context) => {
  if (env.NODE_ENV === 'production') {
    if (!env.APP_IMAGE) context.addIssue({ code: 'custom', path: ['APP_IMAGE'], message: 'Required in production' });
    if (!env.PESTLORD_VERSION) context.addIssue({ code: 'custom', path: ['PESTLORD_VERSION'], message: 'Required in production' });
    for (const key of ['SITE_URL', 'N8N_BOOKING_WEBHOOK_URL', 'N8N_QUOTE_WEBHOOK_URL'] as const) {
      if (!env[key].startsWith('https://')) context.addIssue({ code: 'custom', path: [key], message: 'HTTPS required in production' });
    }
    if (env.API_DOCS_ENABLED) context.addIssue({ code: 'custom', path: ['API_DOCS_ENABLED'], message: 'Disable API documentation in production' });
  } else if (env.SITE_INDEXABLE) {
    context.addIssue({ code: 'custom', path: ['SITE_INDEXABLE'], message: 'Only production may be indexed' });
  }
});

export type Config = Readonly<z.infer<typeof envSchema>>;

/** Validate once at the composition root; never include values in diagnostics. */
export function loadConfig(source: Record<string, string | undefined>): Config {
  const result = envSchema.safeParse(source);
  const forbidden = Object.keys(source).filter((key) => key.startsWith('VITE_'));
  if (!result.success || forbidden.length) {
    const fields = [...new Set([...(result.success ? [] : result.error.issues.map((issue) => issue.path.join('.'))), ...forbidden])];
    throw new Error(`Invalid environment variables: ${fields.join(', ')}. See docs/ENVIRONMENT.md.`);
  }
  return Object.freeze(result.data);
}
