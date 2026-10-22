# Build Release SOP implementation

Authority: Obsidian `Templates/Build-Release-SOP.md`, reviewed for this release.

## Pre-flight — v1.0.0

Both `Matthew-kabiu/Pestlord-solutions` and
`Spooky-Organization/Pestlord_Solutions` have `main` at the same commit before
release preparation. Neither has existing tags or GitHub Releases. The manifest
was still the starter version. Matt approved v1.0.0 publication to both repositories,
required checks/builds, a reviewed commit, main/tag pushes, and the private
production image/version configuration change. No gstack is used.

Production previously combined `build:` and `image:` in the production Compose
file. CI and delivery were combined in one workflow. These are replaced by
separate CI/release workflows and a pull-only root Compose file. Hono/Node serves
the built React frontend and the API from one non-root image.

## Per-value portability verdict (before release edits)

| Value | Baked today? | Needed at build? | Decision |
| --- | --- | --- | --- |
| `SITE_URL` | No; Hono inserts head metadata per request | No | Keep server-runtime configuration; verify two origins using one image |
| `SITE_INDEXABLE` | No | No | Runtime robots, sitemap and metadata |
| OpenRouter URL/key/model | No; integration service reads validated runtime config | No | Server-only runtime values; never build args |
| Booking/quote webhook URLs | No | No | Server-only runtime values; redirects refused |
| Listener/published ports and bind hosts | No | No | Selected private env file drives Compose and server listeners |
| Request limits, deadlines, log level, docs flag | No | No | Centralized startup validation; no schema defaults |
| Frontend API base | Same-origin browser origin, no deployment URL | No | Keep typed same-origin calls; no public API variable |
| Legacy `VITE_*` variables | No longer loaded or referenced by browser code | No | Reject from active env contract; legacy migration only |
| `APP_IMAGE`, `PESTLORD_VERSION` | Deployment selection only | No | Pull published image using explicit image base and version |
| Business copy, stock image URLs and existing contact links | Static content | Not environment-specific | Preserve content; these are not deployment origins or integration credentials |

No build arguments, build secrets or real env files are needed. Vite emits the
environment-independent shell/assets. Hono reads runtime configuration once at
startup and inserts deployment metadata on each page request. The shell is not
pre-rendered with a deployment origin.

## Verified v1.0.0 publication

The release source is commit `3757d0e57f143ec941286d06beca5877fc98d13c` on both remotes.

| Repository | Main CI | Tag CI | Release workflow |
| --- | --- | --- | --- |
| Personal | [passed](https://github.com/Matthew-kabiu/Pestlord-solutions/actions/runs/39727822747) | [passed](https://github.com/Matthew-kabiu/Pestlord-solutions/actions/runs/39727966695) | [passed](https://github.com/Matthew-kabiu/Pestlord-solutions/actions/runs/39727966693) |
| Organization | [passed](https://github.com/Spooky-Organization/Pestlord_Solutions/actions/runs/39727829154) | [passed](https://github.com/Spooky-Organization/Pestlord_Solutions/actions/runs/39727970982) | [passed](https://github.com/Spooky-Organization/Pestlord_Solutions/actions/runs/39727971091) |

Both GitHub Releases exist with uploaded Compose and environment-template assets.
The personal `1.0.0`, `1.0` and `latest` manifests return HTTP 200 anonymously.
The organization package returns HTTP 401 anonymously; Matt explicitly selected
**keep organization private**, approving the exception to the SOP's anonymous-pull
requirement for that artifact. Its release and image publication succeeded, but
adopters need authorized package access. No visibility change or live-host
deployment was performed.

## Run a release

Download `docker-compose.yml` and `production.env.example` from the chosen GitHub
Release. Copy the example to `.env.production`, fill every blank, choose
`APP_IMAGE` for the desired owner and set `PESTLORD_VERSION` explicitly.

```sh
docker compose --env-file .env.production config --quiet
docker compose --env-file .env.production pull
docker compose --env-file .env.production up -d --wait
```

Only Docker/Compose is needed on the host. There is no clone, Node toolchain,
build context or automatic source fallback in the pull file.

For the public repository use the lowercase image base
`ghcr.io/matthew-kabiu/pestlord-solutions`; the organization image base is
`ghcr.io/spooky-organization/pestlord_solutions`. A private package requires
authorized registry login. Public visibility is verified rather than assumed.

## Maintainer releases

1. Update the manifest and lockfile version together and update migration notes.
2. Run lint, all type checks, tests, build, client-secret check, both Compose
   validations and workflow YAML parsing. Run the approved runtime-only Docker probe.
3. Commit through `.claude/hooks/do_commit.sh`; push `main` to both approved remotes.
4. Wait for both main CI runs. The tag must match the manifest exactly:

```sh
git tag -a v1.0.0 -m "PestLord Solutions 1.0.0: portable Hono release"
git push origin v1.0.0
git push remote v1.0.0
```

The tag-only release workflow waits for that repository's tag CI, builds one
`linux/amd64` production image, publishes full-version, minor-version and `latest`
tags, and creates a GitHub Release with the Compose/env-template assets and image
digest. Both remotes publish their own artifact using the same reviewed source.

Verify both CI runs, both release runs, release assets and anonymous registry
manifest access. If the organization package is private, ask Matt before changing
visibility. No live-host switch is part of publication approval.

## Host-side migration before first deployment

| Old configuration | New configuration |
| --- | --- |
| `VITE_OPENROUTER_API_URL` | `OPENROUTER_API_URL` |
| `VITE_OPENROUTER_API_KEY` | `OPENROUTER_API_KEY` (server only) |
| `VITE_OPENROUTER_MODEL_ID` | `OPENROUTER_MODEL_ID` |
| `VITE_N8N_WEBHOOK_URL` | `N8N_BOOKING_WEBHOOK_URL` |
| `VITE_N8N_QUOTE_WEBHOOK_URL` | `N8N_QUOTE_WEBHOOK_URL` |
| NewsAPI and standalone contact-webhook variables | Removed from active application contract; no matching feature exists |
| `APP_IMAGE` containing a local image and tag | Lowercase GHCR image base; tag moves to `PESTLORD_VERSION` |
| Build-from-source production Compose | Root pull-only `docker-compose.yml` |

Populate all other required runtime settings from `docs/ENVIRONMENT.md` before
deploying. The private local files still need the quote webhook, and production
needs its real site origin. Do not invent those values. Historically exposed
credentials require operator rotation. On Coolify switch the resource to the
pull-based root Compose file after the host environment is migrated; Matt must
approve or perform that deployment separately.
