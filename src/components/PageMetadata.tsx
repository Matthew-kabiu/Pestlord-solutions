import { useEffect } from 'react';
import { pages, type PagePath } from '../../seo/pages';

export default function PageMetadata({ path }: { path: PagePath | null }) {
  useEffect(() => {
    const page = path ? pages[path] : { title: 'Page Not Found | PestLord Solutions', description: 'The requested page could not be found.' };
    const siteUrl = document.querySelector<HTMLMetaElement>('meta[name="site-url"]')?.content;
    const indexable = document.querySelector<HTMLMetaElement>('meta[name="site-indexable"]')?.content === 'true';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const url = siteUrl && path ? new URL(path, siteUrl).href : '';
    document.title = page.title;
    for (const [selector, value] of [
      ['meta[name="description"]', page.description],
      ['meta[property="og:title"]', page.title], ['meta[property="og:description"]', page.description],
      ['meta[property="og:url"]', url], ['meta[name="twitter:title"]', page.title],
      ['meta[name="twitter:description"]', page.description],
      ['meta[name="robots"]', indexable && path && path !== '/admin' ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'],
    ]) document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value);
    if (canonical) {
      if (url) canonical.href = url;
      else canonical.removeAttribute('href');
    }
  }, [path]);
  return null;
}
