# Environment contract

Only `.env.development` and `.env.production` supply application configuration.
They are private and ignored by Git and Docker. The tracked templates live under
`config/`; they contain fake examples and blanks rather than real secrets.

```sh
npx tsx scripts/init-env.ts
npm run env:validate -- development
npm run env:validate -- production
```

Fill blanks locally. Do not paste secrets into tickets, chat, docs or CI logs.
`--migrate` on the initializer privately copies matching settings from the legacy
`.env`; it does not overwrite destination files or guess missing integration URLs.
The old file is ignored and no longer loaded by Vite. Remove it locally after
confirming the migration and credential rotation policy.

## Required values

| Variables | Purpose |
| --- | --- |
| `NODE_ENV` | Must match the chosen development/production environment |
| `APP_HOST`, `APP_PORT` | Host bind address and published application port |
| `WEB_PORT` | Vite listener in development |
| `API_PORT`, `BIND_HOST` | Hono listener port and bind address |
| `HEALTHCHECK_HOST` | Internal loopback address used by health checks |
| `API_UPSTREAM_HOST` | Compose API service hostname; native dev uses `HEALTHCHECK_HOST` |
| `APP_IMAGE` | Production-only lowercase registry image base, without its tag |
| `PESTLORD_VERSION` | Production-only explicit semantic-version tag, or `latest` |
| `SITE_URL` | Public site origin; canonical URLs and allowed browser origin |
| `SITE_INDEXABLE` | Explicit boolean; only production can be indexable |
| `OPENROUTER_API_URL` | HTTPS OpenRouter chat completions endpoint |
| `OPENROUTER_API_KEY`, `OPENROUTER_MODEL_ID` | Server-only provider credential and selected model |
| `N8N_BOOKING_WEBHOOK_URL`, `N8N_QUOTE_WEBHOOK_URL` | Distinct server-side submission destinations |
| `BODY_LIMIT_BYTES` | Maximum accepted JSON body size |
| `REQUEST_TIMEOUT_MS`, `SHUTDOWN_TIMEOUT_MS` | Upstream/request deadline and shutdown deadline |
| `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX` | Per-peer request budget |
| `LOG_LEVEL` | Explicit Pino log level |
| `API_DOCS_ENABLED` | Generated OpenAPI switch; must be false in production |

Every listed variable is required except development's image/version fields. All are
validated centrally in `server/config/env.ts`; there are no schema defaults.
Missing, blank or malformed values stop startup. Ports must be valid integers;
URLs must be HTTP(S), with production site/webhooks using HTTPS. Diagnostics name
fields only and never include their values. Unknown legacy `VITE_*` variables
are rejected because no application configuration belongs in the browser bundle.

Vite builds are environment-independent. They do not load `.env`, `.env.local`,
or expose process variables. Production configuration is validated when Hono
starts, and SEO metadata is generated at runtime. Tests and CI use explicitly
fake settings from `config/ci.env.example` and never call the actual integrations.

There is no NewsAPI integration in current source and no standalone contact
submission form. Their old variables are intentionally not migrated. Existing
contact-page submissions use the quote endpoint.
