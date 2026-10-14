import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const buildDir = isGitHubPages ? 'dist-pages' : 'dist';
const host = (process.env.PUBLIC_SITE_URL || 'https://bella-beauty-brazil.vercel.app').replace(/\/+$/, '');
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const xml = await readFile(join(buildDir, 'sitemap.xml'), 'utf8');
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(paths.length === 23, `Expected 23 unique sitemap URLs, got ${paths.length}`);
assert(new Set(paths).size === paths.length, 'Sitemap includes duplicate URLs');

for (const url of paths) {
  assert(url.startsWith(host + '/'), `Unexpected canonical host: ${url}`);
  const route = url.slice(host.length);
  const file = route === '/' ? join(buildDir, 'index.html')
    : route.startsWith('/services/') && !isGitHubPages
      ? join(buildDir, route.slice(1))
      : join(buildDir, route.slice(1), 'index.html');
  let html;
  try { html = await readFile(file, 'utf8'); }
  catch { errors.push(`Missing indexable page for ${route}: ${file}`); continue; }

  const titles = [...html.matchAll(/<title\b[^>]*>[^<]*<\/title>/gi)];
  const descriptions = [...html.matchAll(/<meta\s+name="description"\b[^>]*>/gi)];
  // name="description" is usually followed by a blank rather than a word boundary.
  const actualDescriptions = [...html.matchAll(/<meta\s+name="description"[^>]*>/gi)];
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"[^>]*>/gi)];
  const ogUrls = [...html.matchAll(/<meta\s+property="og:url"[^>]*>/gi)];
  assert(titles.length === 1, `${route}: expected one HTML title, found ${titles.length}`);
  assert(actualDescriptions.length === 1, `${route}: expected one meta description, found ${actualDescriptions.length}`);
  assert(canonicals.length === 1, `${route}: expected one canonical, found ${canonicals.length}`);
  assert(ogUrls.length === 1, `${route}: expected one Open Graph URL, found ${ogUrls.length}`);
  assert(canonicals[0]?.includes(`href="${url}"`), `${route}: canonical does not match URL`);
  assert(ogUrls[0]?.includes(`content="${url}"`), `${route}: Open Graph URL does not match`);
  if (route !== '/') assert(/<h1[\s>]/i.test(html), `${route}: missing indexable heading`);
  if (route.startsWith('/services/') || route === '/services') {
    assert(html.includes('https://bellabrazil.gettimely.com/'), `${route}: missing booking link`);
  }
}
const robot = await readFile(join(buildDir, 'robots.txt'), 'utf8');
assert(robot.includes(`Sitemap: ${host}/sitemap.xml`), 'robots.txt points to another host');
if (errors.length) {
  console.error('STATIC SITE QA FAILED:\n' + errors.map((error) => '- ' + error).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Static site QA passed: ${paths.length} unique indexable routes, matching canonical URLs, meta tags and robots.`);
}
