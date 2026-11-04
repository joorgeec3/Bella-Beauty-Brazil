import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { SERVICES } from '../src/data/siteData.ts';
import { SERVICE_GROUPS } from '../src/data/serviceGroups.ts';

// Check the final generated files, not just React metadata. Crawlers must be
// able to read every service, its copy and photos with JavaScript disabled.
const output = process.env.GITHUB_PAGES === 'true' ? 'dist-pages' : 'dist';
const origin = (process.env.PUBLIC_SITE_URL || 'https://bellabeautybrazil.com.au').replace(/\/+$/, '');
const languages = { en: { html: 'en-AU', prefix: '' }, pt: { html: 'pt-BR', prefix: '/pt' },
  es: { html: 'es', prefix: '/es' } };
const routes = ['/', '/about', '/services', '/courses', '/locations', '/contact',
  ...SERVICE_GROUPS.map((g) => '/services/categories/' + g.id),
  ...SERVICES.map((s) => '/services/' + s.id)];
const expected = routes.length * Object.keys(languages).length;
const read = (route) => readFile(route === '/' ? join(output, 'index.html') :
  join(output, route.replace(/^\//, ''), 'index.html'), 'utf8');
const localized = (lang, route) => languages[lang].prefix + (route === '/' ? '' : route) || '/';
const xml = await readFile(join(output, 'sitemap.xml'), 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (routes.length !== 38 || SERVICES.length !== 26 || SERVICE_GROUPS.length !== 6) {
  throw new Error('Service catalogue changed. Review and update expected SEO route counts.');
}
if (urls.length !== expected || new Set(urls).size !== expected) {
  throw new Error('Sitemap must have ' + expected + ' unique localised route URLs, found ' + urls.length);
}
const expectedUrls = new Set();
for (const lang of Object.keys(languages)) {
  for (const route of routes) {
    const path = localized(lang, route), url = origin + path;
    expectedUrls.add(url);
    const html = await read(path);
    if (!html.includes('<html lang="' + languages[lang].html + '">')) {
      throw new Error('Wrong HTML language: ' + path);
    }
    if (!html.includes('<div id="root"><main class="bella-seo">') || !/<h1>[^<]+<\/h1>/.test(html)) {
      throw new Error('No readable HTML body when JavaScript is disabled: ' + path);
    }
    if (!html.includes('<link rel="canonical" href="' + url + '"')) {
      throw new Error('Wrong canonical: ' + path);
    }
    if ((html.match(/<link rel="canonical"/g) || []).length !== 1) {
      throw new Error('Duplicate canonical: ' + path);
    }
    for (const [alt, code] of [['en-AU', 'en'], ['pt-BR', 'pt'], ['es', 'es'], ['x-default', 'en']]) {
      const altUrl = origin + localized(code, route);
      if (!html.includes('hreflang="' + alt + '" href="' + altUrl + '"')) {
        throw new Error('Missing hreflang ' + alt + ': ' + path);
      }
    }
    if (route === '/' || route === '/services' || route.startsWith('/services/')) {
      if (!/<img [^>]*src="[^"]+"[^>]*alt="[^"]+"/.test(html)) {
        throw new Error('Missing static photography: ' + path);
      }
    }
    if (route.startsWith('/services/') && !route.startsWith('/services/categories/')) {
      const id = route.split('/')[2];
      const service = SERVICES.find((s) => s.id === id);
      if (!service || !html.includes(service.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'))) {
        throw new Error('Missing service name/body: ' + path);
      }
      if (!html.includes('Book on Timely') && !html.includes('Agendar pelo Timely') &&
          !html.includes('Reservar en Timely')) {
        throw new Error('Missing booking action: ' + path);
      }
    }
  }
}
if (expectedUrls.size !== expected || urls.some((url) => !expectedUrls.has(url))) {
  throw new Error('Sitemap includes missing, duplicate or unexpected localized URLs');
}
const robots = await readFile(join(output, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap: ' + origin + '/sitemap.xml')) {
  throw new Error('robots.txt points at the wrong sitemap');
}

// Verify that the newly supplied Wet Look media arrives in dist byte-for-byte
// identical to the originals. Neither image nor video is transformed.
const originalAssets = [
  ['IMG_9777.JPEG', '72561ed4ee064c0a35b02afd3ca39f2378c329ef1bd5bae326da55f25e13c94f'],
  ['IMG_9781.MP4', '05cb48eb655bf444d31f80d5eda943928f1de850f63cf398d4b5dd1c06e6d0e8'],
];
for (const [filename, expectedSha256] of originalAssets) {
  const bytes = await readFile(join(output, 'assets', 'bella', 'wet-eyelash-extensions', filename));
  if (createHash('sha256').update(bytes).digest('hex') !== expectedSha256) {
    throw new Error('Wet Look original media changed during build: ' + filename);
  }
}
for (const lang of Object.keys(languages)) {
  const wetPage = await read(localized(lang, '/services/wet-look-lashes'));
  if (!wetPage.includes('/assets/bella/wet-eyelash-extensions/IMG_9777.JPEG')) {
    throw new Error('Wet Look original photo missing in HTML: ' + lang);
  }
  const hybridPage = await read(localized(lang, '/services/hybrid-eyelashes'));
  if (hybridPage.includes('/assets/bella/wet-eyelash-extensions/')) {
    throw new Error('Wet Look media incorrectly linked to Hybrid: ' + lang);
  }
}


const exosScalpOriginalSha = 'fc2a7a9f1735798aa74cdf9f4e7b3cfa5135dfc7221a1390a54767ec74784240';
const exosScalpBytes = await readFile(join(output, 'assets', 'bella', 'exos-hair-scalp', 'IMG_3674.PNG'));
if (exosScalpBytes.length !== 3862643 ||
    createHash('sha256').update(exosScalpBytes).digest('hex') !== exosScalpOriginalSha) {
  throw new Error('Exos Hair Scalp photo was modified or not copied to the build');
}
for (const lang of Object.keys(languages)) {
  const scalpPage = await read(localized(lang, '/services/grow-up-hair-scalp'));
  if (!scalpPage.includes('/assets/bella/exos-hair-scalp/IMG_3674.PNG')) {
    throw new Error('Exos Hair Scalp photo missing from prerendered HTML: ' + lang);
  }
}

console.log('SEO static HTML passed: ' + expected + ' pages (' + SERVICES.length +
  ' treatments x EN/PT/ES + categories and informational pages).');
