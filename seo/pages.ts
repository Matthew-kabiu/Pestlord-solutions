export const pages = {
  '/': { id: 'home', title: 'Pest Control & Fumigation in Kenya | PestLord Solutions', description: 'Protect your home or business with PestLord Solutions. Explore pest control and fumigation services across Kenya, request a quote, or book a property inspection.' },
  '/services': { id: 'services', title: 'Pest Control & Fumigation Services | PestLord Solutions', description: 'Explore residential, commercial and institutional pest management, including termite control, rodent management and fumigation. Request a tailored service quote.' },
  '/booking': { id: 'booking', title: 'Book a Pest Control Inspection | PestLord Solutions', description: 'Request a property inspection with PestLord Solutions. Choose your preferred date and service, and our team will contact you to confirm your pest control booking.' },
  '/contact': { id: 'contact', title: 'Contact & Pest Control Quotes | PestLord Solutions', description: 'Contact PestLord Solutions for pest management across Kenya. Tell us about your property and pest concerns to request a quote from our pest control team.' },
  '/admin': { id: 'admin', title: 'Administration | PestLord Solutions', description: 'PestLord Solutions administration.', private: true },
} satisfies Record<string, { id: string; title: string; description: string; private?: boolean }>;

export type PagePath = keyof typeof pages;
export type Page = (typeof pages)[PagePath]['id'];
export function isPagePath(path: string): path is PagePath { return Object.hasOwn(pages, path); }
export function pagePath(id: string): PagePath {
  return (Object.keys(pages) as PagePath[]).find((path) => pages[path].id === id) ?? '/';
}

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

export function renderHead(path: PagePath, siteUrl: string, indexable: boolean) {
  const page = pages[path];
  const url = new URL(path, siteUrl).href;
  const robots = indexable && !('private' in page && page.private) ? 'index, follow, max-image-preview:large' : 'noindex, nofollow';
  return `<title>${escapeHtml(page.title)}</title>
<meta name="description" content="${escapeHtml(page.description)}">
<meta name="robots" content="${robots}">
<meta name="site-url" content="${escapeHtml(siteUrl)}">
<meta name="site-indexable" content="${indexable}">
<link rel="canonical" href="${escapeHtml(url)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="PestLord Solutions">
<meta property="og:title" content="${escapeHtml(page.title)}">
<meta property="og:description" content="${escapeHtml(page.description)}">
<meta property="og:url" content="${escapeHtml(url)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(page.title)}">
<meta name="twitter:description" content="${escapeHtml(page.description)}">`;
}

export function renderSitemap(siteUrl: string) {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${(Object.keys(pages) as PagePath[]).filter((path) => path !== '/admin').map((path) => `<url><loc>${escapeHtml(new URL(path, siteUrl).href)}</loc></url>`).join('')}</urlset>`;
}
