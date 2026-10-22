import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readEnvironment } from './scripts/environment';
import { isPagePath, renderHead } from './seo/pages';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Public bundle is environment-independent. No .env, .local or VITE_* injection.
  const config = command === 'serve' ? readEnvironment(mode).config : undefined;
  return {
    envDir: false,
    envPrefix: [],
    plugins: [react(), {
      name: 'development-seo',
      transformIndexHtml: {
        order: 'pre',
        handler(html, context) {
          if (!config) return html;
          const path = (context.originalUrl ?? '/').split('?')[0];
          return html.replace('<!--seo-head-->', renderHead(isPagePath(path) ? path : '/', config.SITE_URL, false));
        },
      },
    }],
    server: config ? {
      host: config.BIND_HOST, port: config.WEB_PORT, strictPort: true,
      proxy: { '/api': `http://${process.env.API_UPSTREAM_HOST ?? config.API_UPSTREAM_HOST}:${config.API_PORT}`, '/health': `http://${process.env.API_UPSTREAM_HOST ?? config.API_UPSTREAM_HOST}:${config.API_PORT}` },
    } : undefined,
    optimizeDeps: { exclude: ['lucide-react'] },
  };
});
