# PestLord Solutions

Pest control and fumigation website serving Kenya. React, TypeScript, Vite and
Tailwind provide the frontend; a Hono/Node API handles PestPal chat, booking
requests and quote requests. n8n remains responsible for workflow processing and
Google Sheets integration.

## Run the released image

Docker Desktop or Docker Engine with Compose is all the host needs. Download the
run file and blank environment template from the public release:

```sh
curl -fsSLO https://github.com/Matthew-kabiu/Pestlord-solutions/releases/download/v1.0.0/docker-compose.yml
curl -fsSLO https://github.com/Matthew-kabiu/Pestlord-solutions/releases/download/v1.0.0/production.env.example
cp production.env.example .env.production
```

Fill every blank in `.env.production` locally, including the real site origin,
provider key/model and both webhook destinations. Set `PESTLORD_VERSION` to the
release you want. Then:

```sh
docker compose --env-file .env.production config --quiet
docker compose --env-file .env.production pull
docker compose --env-file .env.production up -d --wait
```

No source checkout, Node installation or host build is required. Updates use the
same pull/up commands after changing `PESTLORD_VERSION`. The organization mirror
publishes its own image and release assets; see [release instructions](docs/RELEASE.md).

## Develop from source

Use Node.js 24 LTS and npm, or Docker Desktop with Compose.

```sh
npm ci
npx tsx scripts/init-env.ts
```

Fill every blank in `.env.development` and `.env.production` locally. Existing
installations can opt into `npx tsx scripts/init-env.ts --migrate` to copy the old
integration settings without displaying them. Existing destination files are
never overwritten. See [the environment contract](docs/ENVIRONMENT.md).

```sh
npm run env:validate -- development
npm run dev
```

The development address comes from `SITE_URL`; listener addresses and ports come
from the selected environment file. Hono and Vite start together for native dev.

## Docker

```sh
npm run compose:dev -- up -d --build --wait
npm run compose:dev -- down

npm run compose:prod -- pull
npm run compose:prod -- up -d --wait
npm run compose:prod -- down
```

Development runs Vite plus Hono with source mounts. Production runs a non-root
Hono service that serves both the built frontend and the API. Secrets enter at
runtime, and the same production image can be promoted between environments.
See [Docker setup and delivery](docs/DOCKER_SETUP.md).

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run check:client
npm run check:workflows
npm run compose:dev -- config --quiet
npm run compose:prod -- config --quiet
```

Tests mock upstream integrations; they neither consume model credits nor submit
customer forms. `ci.yml` validates environments, audits runtime dependencies and
validates both Compose files. The separate, tag-only `release.yml` waits for CI,
then builds/publishes one production image and its GitHub Release assets.

## Releasing (maintainers)

After approved checks and a reviewed version-bump commit, push `main` to both
repositories and wait for CI. Cut the matching semantic-version tag:

```sh
git tag -a v1.0.0 -m "PestLord Solutions 1.0.0: portable Hono release"
git push origin v1.0.0
git push remote v1.0.0
```

For later releases, replace the version after updating `package.json` and its
lockfile together. Image tags are full version, minor version and `latest`;
deployments explicitly pin `PESTLORD_VERSION`. See [the release SOP record](docs/RELEASE.md)
for approvals, portability verdicts, verification and host migration.

## Routes and integration contracts

- Public pages: `/`, `/services`, `/booking`, `/contact`.
- `/admin`: existing UI only; no authentication or privileged API was added.
- `POST /api/chat`, `POST /api/booking`, `POST /api/quote`: validated same-origin requests.
- `GET /health`: process health without upstream calls.
- `GET /api/openapi.json`: generated spec, development only.

The typed Hono client connects the React forms to the API. Credentials and webhook
URLs never appear in frontend environment variables or compiled browser assets.
See [chat architecture](docs/AI_CHATBOT_IMPLEMENTATION.md) and
[booking payloads](docs/Google%20Sheet.md).

## SEO

Each public route has a distinct URL, title, description, canonical, Open Graph
and Twitter metadata. Hono inserts metadata into HTML at request time using the
configured `SITE_URL`. `robots.txt` and the sitemap follow `SITE_INDEXABLE`.
Development is blocked from indexing. See [SEO implementation](docs/SEO.md).
