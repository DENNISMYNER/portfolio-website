import react from '@vitejs/plugin-react';
import { loadEnv, type Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

/**
 * Replaces %SITE_URL% in index.html with VITE_SITE_URL so social-preview tags
 * (og:image, ...) get absolute URLs, which Facebook/LinkedIn/X require.
 */
function siteUrl(url: string): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url.replace(/\/$/, '')),
  };
}

// In development the browser talks to Vite, and Vite forwards /api/* to the
// Express server. That means no CORS setup is needed while developing.
const apiProxy = { '/api': { target: 'http://localhost:4000', changeOrigin: true } };

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react(), siteUrl(env.VITE_SITE_URL ?? '')],
    server: { port: 5173, proxy: apiProxy },
    preview: { port: 4173, proxy: apiProxy },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      // Needed so Testing Library's automatic unmount-after-each-test hook has
      // a global afterEach to attach to.
      globals: true,
    },
  };
});
