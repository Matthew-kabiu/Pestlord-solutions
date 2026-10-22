# Technical SEO

## Implemented

- Public pages have distinct paths with crawlable navigation and working direct entry.
- `seo/pages.ts` defines route-specific titles and descriptions.
- Hono injects canonical, robots, Open Graph and Twitter metadata into the initial
  HTML. Client navigation updates the same metadata; it does not determine the
  initial server response's metadata.
- Canonicals, robots and sitemap URLs use runtime `SITE_URL`, never a baked domain.
- Development and non-indexable deployments disallow crawling. Production's
  sitemap contains only public canonical pages and excludes administration/API.
- Unknown production paths return an actual HTTP not-found status.
- The broken starter favicon reference is replaced with a local SVG.

## Remaining content work

The body is still a client-rendered React app; this change adds server-rendered
head metadata, not full server rendering or prerendered page content. Non-JavaScript
crawlers may not see the body. A rendering migration needs separate scope.

Business phone numbers and some social links in the existing UI are placeholders.
Verify real contact details and claims before adding LocalBusiness structured data.
No ratings, certifications, business hours or addresses were invented for schema.

After deployment, verify rendered pages in Search Console and Rich Results Test,
submit the sitemap, and measure real mobile Core Web Vitals. No live indexing,
ranking, structured-data eligibility or performance score is claimed by local tests.
