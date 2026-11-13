// Tells Bing (and the search engines that share IndexNow, which ChatGPT search relies on)
// about every page in the sitemap after each production deploy. Never fails the build.
import { readFile } from 'node:fs/promises';

const KEY = 'e6009607d57d426016bb5227b6b86413';
if (process.env.VERCEL_ENV !== 'production') {
  console.log('IndexNow: skipped (not a production deploy).');
  process.exit(0);
}
try {
  const origin = (process.env.PUBLIC_SITE_URL || 'https://bellabeautybrazil.com.au').replace(/\/+$/, '');
  const xml = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(origin).host, key: KEY, keyLocation: origin + '/' + KEY + '.txt', urlList }),
    signal: AbortSignal.timeout(15000),
  });
  console.log('IndexNow: submitted ' + urlList.length + ' URLs, status ' + res.status);
} catch (error) {
  console.log('IndexNow: could not submit (' + (error && error.message) + '). Build continues.');
}
