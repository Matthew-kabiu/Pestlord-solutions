# Docker environments and releases

## Production: pull the released artifact

Download `docker-compose.yml` and `production.env.example` from a GitHub Release.
Copy the example to `.env.production`, fill every blank, and set `APP_IMAGE` to
the chosen repository's lowercase GHCR image base. `PESTLORD_VERSION` selects the
release tag. The production file contains no `build:` section or source mounts.

```sh
docker compose --env-file .env.production config --quiet
docker compose --env-file .env.production pull
docker compose --env-file .env.production up -d --wait
```

Updating or rolling back means selecting a published `PESTLORD_VERSION` and
repeating pull/up. No Node/npm installation or checkout is required on the host.
Private organization packages require authorized registry login; public anonymous
access is verified separately for each package.

Hono serves the built frontend and same-origin API. Public traffic maps
`APP_HOST:APP_PORT` to `API_PORT`, all read from the private environment file.
Terminate HTTPS at the platform/reverse proxy with the matching HTTPS `SITE_URL`.
The container runs as the Node user with a read-only filesystem, dropped
capabilities, bounded memory/processes, health checks and graceful shutdown.

## Development: build with hot reload

From the source checkout, follow [ENVIRONMENT.md](ENVIRONMENT.md), then:

```sh
npm ci
npm run compose:dev -- up -d --build --wait
npm run compose:dev -- ps
npm run compose:dev -- logs --tail=50
npm run compose:dev -- down
```

Vite publishes `APP_HOST:APP_PORT` to `WEB_PORT`. Hono's `API_PORT` is internal;
`API_UPSTREAM_HOST` points the Vite proxy at that service. Source mounts are
read-only. Rebuild after dependency changes and recreate after env changes.

The source wrapper validates and explicitly selects its private file:

| Wrapper | Compose file | Environment |
| --- | --- | --- |
| `npm run compose:dev -- <args>` | `docker-compose.dev.yml` | `.env.development` |
| `npm run compose:prod -- <args>` | `docker-compose.yml` | `.env.production` |

For source maintainers only, an approved local production build is:

```sh
docker build --platform linux/amd64 --target production -t "${APP_IMAGE}:${PESTLORD_VERSION}" .
```

Load those two values from the chosen env file in your shell before this command.
The production Compose file never builds. Never share resolved Compose output
without redaction; use `config --quiet` for validation.

## CI and releases

`ci.yml` runs lint, all TypeScript projects, Vitest, frontend/backend builds,
client-secret checks, runtime dependency audit, env/Compose validation and workflow
YAML parsing on pushes/PRs. `release.yml` runs only for version tags, checks the
manifest/tag match, waits for tag CI, builds one `linux/amd64` artifact per
repository and publishes full/minor/latest GHCR tags plus a GitHub Release.

Release assets contain the pull file and a blank env template with the correct
repository image base. The image digest appears in the release notes. Both
repositories use the same reviewed source. No live deployment or package visibility
change is implied by artifact publication. See [RELEASE.md](RELEASE.md).

## Runtime-only verification

With Matt's build approval, `npx tsx scripts/verify-docker.ts` makes an isolated,
ignored checkout, creates fake env files, validates both Compose files, builds
the production image without env files and runs HTTP smoke checks. It verifies
development and production routes, then changes the runtime site origin and
recreates the same image with `--no-build` to prove metadata is not baked.
No model credits or real submissions are used. Test containers/networks and the
temporary checkout are cleaned up.

Use `--production-only` when running the compiled smoke script to verify the
release artifact without starting a second development server on a busy workstation.

The bounded rate limiter is per process/socket peer, intentionally not trusting
forwarded headers. A proxy therefore shares its budget; multi-replica deployments
need separately approved shared/edge rate limiting.
