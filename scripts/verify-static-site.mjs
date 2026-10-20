import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Build-time smoke test for the sitemap and generated static entry points.
// It intentionally avoids browser-only assertions: Vercel validates this before deployment.
const dir = process.env.GITHUB_PAGES === 'true' ? 'dist-pages' : 'dist';
const origin = (process.env.PUBLIC_SITE_URL || 'https://bella-beauty-brazil.vercel.app').replace(/\/+$/, '');
const xml = await readFile(join(dir, 'sitemap.xml'), 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const catalogSource = await readFile('src/data/siteData.ts', 'utf8');
const catalogStart = catalogSource.indexOf('export const SERVICES: Service[] = [');
const catalogEnd = catalogSource.indexOf('\n];', catalogStart);
if (catalogStart === -1 || catalogEnd === -1) throw new Error('Unable to inspect published service routes');
const catalogBlock = catalogSource.slice(catalogStart, catalogEnd);
const catalogIds = [...catalogBlock.matchAll(/^\s*\{\s*id:\s*'([^']+)'/gm)].map((match) => match[1]);
if (!catalogIds.length || new Set(catalogIds).size !== catalogIds.length) throw new Error('Unexpected or duplicate service IDs');
const expectedTotalPages = 1 + 5 + catalogIds.length;


if (urls.length !== expectedTotalPages || new Set(urls).size !== urls.length) {
  throw new Error(`Expected ${expectedTotalPages} unique sitemap URLs (home, 5 pages, ${catalogIds.length} services), got ${urls.length}`);
}
const services = urls.filter((url) => url.startsWith(origin + '/services/'));
if (services.length !== catalogIds.length) throw new Error(`Expected ${catalogIds.length} service routes; got ${services.length}`);
for (const id of catalogIds) {
  if (!services.includes(origin + '/services/' + id)) throw new Error(`Missing sitemap deep link for service: ${id}`);
}
if (!urls.every((url) => url.startsWith(origin + '/'))) throw new Error('Sitemap hostname differs from configured origin');

const robots = await readFile(join(dir, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) throw new Error('robots.txt sitemap host mismatch');

for (const url of urls) {
  const route = url.slice(origin.length);
  const file = route === '/' ? join(dir, 'index.html') : join(dir, route.slice(1), 'index.html');
  await access(file).catch(() => { throw new Error(`Missing pre-rendered route: ${route}`); });
}
console.log(`Static SEO smoke test passed: ${expectedTotalPages} routes, ${catalogIds.length} services, sitemap, robots and entry files.`);
