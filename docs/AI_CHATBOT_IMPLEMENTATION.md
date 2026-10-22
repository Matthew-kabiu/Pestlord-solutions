# PestPal chatbot and integration gateway

PestPal is the text-only pest management assistant opened from the floating
action menu. Messages render as Markdown; chat history is held in React memory
and clears on refresh. Each request sends the current question, not a complete
conversation transcript. Streaming is not enabled.

## Request path

1. `ChatbotModal.tsx` calls `src/lib/openrouter.ts`.
2. The shared typed Hono client in `src/lib/api.ts` posts text to `/api/chat`.
3. The gateway validates the request with a strict Zod/OpenAPI schema.
4. The integration service adds the server-owned model, prompt and authorization.
5. Only the assistant's content is returned to the browser.

`server/modules/integrations/prompt.ts` defines PestPal's domain and safety
instructions. Prompts are not a credential protection mechanism: the provider key
is only read by the server and is never sent to the browser.

## Configuration and validation

Use the server-only OpenRouter and webhook variables documented in
[ENVIRONMENT.md](ENVIRONMENT.md). Missing configuration prevents server startup.
The provider endpoint is allowlisted, redirects are refused, calls have a deadline,
and upstream error bodies are never relayed or logged.

`POST /api/booking` and `POST /api/quote` preserve the existing form payloads while
enforcing field lengths, rejecting unknown keys and neutralizing spreadsheet
formula prefixes. The gateway checks the configured Origin, rejects cross-site
requests, limits body size and applies a bounded per-process rate limit.

Routes are declared through `@hono/zod-openapi`; development can expose the
generated schema at `/api/openapi.json`. Production must disable it. Public form
and chat endpoints are intentionally unauthenticated, and the admin UI has no
new privileged backend routes.

## Verification

`npm test` covers validation, provider isolation, mock booking/quote forwarding,
formula handling, upstream errors, rate limiting and SEO configuration. No real
OpenRouter or n8n requests are made by these tests. Live integration acceptance
requires configured private env files and explicit authorization to spend/send.
