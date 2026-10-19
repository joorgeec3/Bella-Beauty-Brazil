import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Build-time smoke test for the sitemap and generated static entry points.
// It intentionally avoids browser-only assertions: Vercel validates this before deployment.
const dir = process.env.GITHUB_PAGES === 'true' ? 'dist-pages' : 'dist';
const origin = (process.env.PUBLIC_SITE_URL || 'https://bella-beauty-brazil.vercel.app').replace(/\/+$/, '');
const xml = await readFile(join(dir, 'sitemap.xml'), 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urls.length !== 26 || new Set(urls).size !== urls.length) {
  throw new Error(`Expected 26 unique sitemap URLs (home, 5 pages, 20 services), got ${urls.length}`);
}
const services = urls.filter((url) => url.startsWith(origin + '/services/'));
if (services.length !== 20) throw new Error(`Expected 20 service routes; got ${services.length}`);
if (!urls.every((url) => url.startsWith(origin + '/'))) throw new Error('Sitemap hostname differs from configured origin');

const robots = await readFile(join(dir, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) throw new Error('robots.txt sitemap host mismatch');

for (const url of urls) {
  const route = url.slice(origin.length);
  const file = route === '/' ? join(dir, 'index.html') : join(dir, route.slice(1), 'index.html');
  await access(file).catch(() => { throw new Error(`Missing pre-rendered route: ${route}`); });
}
console.log('Static SEO smoke test passed: 26 routes, 20 services, sitemap, robots and entry files.');
