# Changelog

This changelog records notable changes in a public-safe, project-agnostic format.
Keep the newest entries at the top. Do not include secrets, private customer
data, confidential business context, or internal-only incident details.

## How to Use This File

- Add an entry for user-facing behavior changes, API or data contract changes,
  migrations, operational process changes, dependency upgrades with risk, and
  important fixes.
- Skip noisy implementation-only changes that do not affect users, operators,
  integrators, or future contributors.
- Prefer plain language over commit-log detail.
- Link to public releases, pull requests, or issue tracker items only when those
  links are safe for the audience of this repository.

## Entry Format

```markdown
## YYYY-MM-DD - <Short Release or Change Title>

Status: Planned | In Progress | Released | Rolled Back
Owner: <Name or team>
References: <Issue, PR, release, or "None">

### Added
- <New capability, integration, endpoint, workflow, or document>

### Changed
- <Behavior, contract, copy, process, or dependency that changed>

### Fixed
- <Bug, regression, data issue, or operational problem resolved>

### Removed
- <Deprecated behavior, endpoint, flag, dependency, or workflow removed>

### Migration Notes
- <Required setup, data migration, env var, rollout, or rollback note>

### Verification
- Passed: <command/check>
- Not run: <check> (<reason>)
```

Remove sections that do not apply to a specific entry.

## 2026-10-22 - Prepare v1.0.0 portable release for both repositories

Status: In Progress (local checks passed; remote publication pending)
Owner: OpenCode, approved by Matt
References: Obsidian Templates/Build-Release-SOP.md

### Changed
- Manifest/lockfile version is 1.0.0. Separate CI and tag-only release workflows.
- Root production Compose now only pulls; development remains the only source-building Compose environment.
- Release workflow publishes lowercase repository-specific GHCR images with full/minor/latest tags and attaches the run file and blank env template.
- README starts with a Docker-only adopter quickstart; docs/RELEASE.md records the portability verdicts and release procedure.

### Migration Notes
- Every legacy frontend integration key maps to its server-only replacement in docs/RELEASE.md.
- APP_IMAGE is now the registry image base; PESTLORD_VERSION selects the tag. The approved private production fields were updated without changing secrets or missing business configuration.
- Coolify/other hosts must switch from building to the pull-only root Compose after environment migration. No live host was changed.

### Verification
- Passed: lint, all type checks, 11 tests, production build, client-secret check, runtime audit (zero), both Compose validations and workflow YAML parsing.
- Passed: production Docker build without env files and runtime-only HTTP probe, including alternate SITE_URL from the same image. Development HTTP checks passed before the runtime-origin probe; later workstation process interruptions were cleaned up, and the release-critical production-only probe passed.
- Pending: main/tag CI, release runs, GitHub releases and anonymous package probes on both repositories.

## 2026-10-22 - Hono gateway, environment isolation, container checks and SEO

Status: Released (local implementation; deployment not performed)
Owner: OpenCode
References: Matt's environment/CI/SEO request and Hono approval

### Added
- Hono TypeScript gateway with typed RPC client, strict schemas, server-only integrations, request limits and graceful shutdown.
- Separate private development/production environment files, centralized validation, safe initializer and runtime-only configuration.
- GitHub Actions quality checks, isolated Docker smoke tests and version-tag GHCR/GitHub Release delivery.
- Crawlable public paths, server-generated head metadata, runtime robots/sitemap and a local favicon.

### Changed
- Development uses Vite plus Hono; production uses Hono for static files and API in one non-root container.
- Removed legacy Nginx/generic Compose setup and browser-side provider credentials.
- Updated Docker/Git ignores and setup/integration documentation.

### Migration Notes
- Fill the quote webhook in both private files and the production site origin; the old environment did not contain these values.
- Existing integration values were migrated privately. Historically exposed credentials still need operator rotation.
- CD publishes a pullable artifact; no live deployment target was supplied or configured.

### Verification
- Passed: lint, all TypeScript projects, 11 mocked tests, frontend/backend builds and production dependency audit (zero findings).
- Passed: both environment contracts and Compose configurations using fake fixtures; development/production Docker HTTP smoke checks.
- Not run: live provider/webhook calls, browser visual checks or GitHub-hosted workflow execution.

## 2026-08-24 - Anti-slop UI redesign and security hardening

Status: Released
Owner: Spooky Spectre
References: None

### Added
- Custom Tailwind design system: `brand` and `surface` color tokens, `Outfit`/`Inter` fonts, soft/brand shadows, reveal/float/scale animations.
- Scroll-reveal animations via `IntersectionObserver` with reduced-motion support.
- Glass morphism (`.glass`) for navigation and modals on scroll.
- 4-column footer with business hours, social icon tiles, and contact info.
- Dark cinematic hero sections on all pages with gradient overlays and status badges.
- Clean card layouts for CompanyStats, CoreValues, CertificationsTeam, ExperienceHighlight, FAQ.
- Rounded-xl form inputs with `bg-surface-50`, focus ring, and consistent spacing.
- Card-style FAB menu items with icon badges and labels.
- Chatbot redesigned as mobile-first bottom sheet with branded empty state.
- Navigation underline hover effect replacing background-fill pattern.

### Changed
- All 15+ components redesigned: removed generic green-700 palette, identical card patterns, thick borders, animated dots.
- Navigation uses glass morphism on scroll and underline hover links.
- Footer expanded from single-column to 4-column layout with hours and social links.
- Forms use rounded-xl inputs with surface-50 backgrounds instead of default browser styling.
- Hero sections use dark backgrounds with gradient overlays instead of plain white.
- Chatbot modal uses rounded-t-3xl bottom sheet on mobile instead of centered dialog.
- FAB menu uses card-style items with labels instead of bare icon buttons.
- Package dependencies updated to resolve all 14 vulnerabilities to 0.

### Fixed
- `CheckCircle` unused import removed from HomePage.tsx.
- Missing catch variable in ChatbotModal.tsx error handler.
- Useless escapes in markdownUtils.ts.
- OpenRouter URL validation restricted to `https://` + `openrouter.ai` only.
- FAB menu text wrapping fixed with `whitespace-nowrap`.

### Removed
- Obsolete `X-XSS-Protection` header from nginx.conf (replaced by CSP).

### Migration Notes
- Custom brand/surface color tokens require `tailwind.config.js` to be present.
- Google Fonts (`Outfit`, `Inter`) loaded via CSS `@import` in `index.css`.
- All scroll-reveal classes (`.reveal`, `.stagger-children`) depend on the IntersectionObserver in `App.tsx`.

### Verification
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm audit --json` (zero vulnerabilities).
- Not run: build checks (excluded by Matt).

## 2026-08-23 - Initial security remediation

Status: Released
Owner: Spooky Spectre
References: None

### Changed
- Expanded `.gitignore` to exclude all `.env*` files, local operating documents, and backups.
- Hardened `nginx.conf` with `server_tokens off`, `client_max_body_size 16k`, CSP, Referrer-Policy, and Permissions-Policy headers.
- Patched vulnerable transitive dependencies without changing declared dependency ranges.

### Fixed
- Removed `.env` and `.env.example` from local Git history via `git filter-branch`.
- Restored lint compatibility after dependency patching and resolved existing lint errors.

## YYYY-MM-DD - Initial Template Adoption

Status: Released
Owner: Project team
References: None

### Added
- Added a reusable changelog structure for release notes, notable changes,
  migrations, and verification evidence.

### Verification
- Passed: template reviewed for public-safe, project-agnostic language.
