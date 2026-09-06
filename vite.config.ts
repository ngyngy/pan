import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

// 专门为独立 SEO/GEO 资源页提供独立页面直出与 Clean URL 支持插件
function seoCleanUrlPlugin(): Plugin {
  return {
    name: 'seo-clean-url-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const urlPath = req.url.split('?')[0];

        // 1. 响应 sitemap.xml
        if (urlPath === '/sitemap.xml') {
          const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
          if (fs.existsSync(sitemapPath)) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.end(fs.readFileSync(sitemapPath, 'utf8'));
            return;
          }
        }

        // 2. 响应 robots.txt
        if (urlPath === '/robots.txt') {
          const robotsPath = path.resolve(__dirname, 'public', 'robots.txt');
          if (fs.existsSync(robotsPath)) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(fs.readFileSync(robotsPath, 'utf8'));
            return;
          }
        }

        // 3. 响应 sitemap.html
        if (urlPath === '/sitemap.html') {
          const sitemapHtmlPath = path.resolve(__dirname, 'public', 'sitemap.html');
          if (fs.existsSync(sitemapHtmlPath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(sitemapHtmlPath, 'utf8'));
            return;
          }
        }
        
        // 4. 匹配 /resource/:id 或 /resource/:id.html
        if (urlPath.startsWith('/resource/')) {
          const cleanPath = urlPath.endsWith('.html') ? urlPath : `${urlPath}.html`;
          const targetHtml = path.resolve(__dirname, 'public', cleanPath.slice(1));
          if (fs.existsSync(targetHtml)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(targetHtml, 'utf8'));
            return;
          }
        }

        // 5. 匹配 /category/:id 或 /category/:id.html
        if (urlPath.startsWith('/category/')) {
          const cleanPath = urlPath.endsWith('.html') ? urlPath : `${urlPath}.html`;
          const targetHtml = path.resolve(__dirname, 'public', cleanPath.slice(1));
          if (fs.existsSync(targetHtml)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(targetHtml, 'utf8'));
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoCleanUrlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
