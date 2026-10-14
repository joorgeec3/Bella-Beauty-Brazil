import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const services = {
  'nano-strokes': { title: 'Nano Strokes / Microblading', description: 'Semi-permanent brow artistry designed to create realistic, natural-looking hair strokes.', image: '/assets/bella/cosmetic-tattooing.png', price: '615', duration: '2 hours, 30 mins' },
  'shadow-hybrid': { title: 'Brow Sculpt & Hybrid Brow', description: 'Brow Sculpt & Hybrid Brow styling published in the official Timely catalogue.', image: '/assets/bella/brows.png', price: '79', duration: '40 mins' },
  'lip-blush': { title: 'Lip Blush', description: 'Semi-permanent cosmetic tattooing to enhance the natural tone and shape of the lips.', image: '/assets/bella/cosmetic-tattooing.png', price: '615', duration: '2 hours, 30 mins' },
  'brow-sculpt-tint': { title: 'Brow Sculpt & Tint', description: 'A personalised brow shape, sculpt and tint service tailored to your features.', image: '/assets/bella/brows.png', price: '76', duration: '35 mins' },
  'brow-lamination': { title: 'Brow Lamination, Shape & Tint', description: 'A structured brow lamination, shape and tint service published in Timely.', image: '/assets/bella/brows.png', price: '133', duration: '1 hour' },
  'lash-lift': { title: 'Lash Lift & Tint', description: 'Lift and tint services published in Timely.', image: '/assets/bella/lashes.jpg', price: '133', duration: '1 hour, 10 mins' },
  dermaplaning: { title: 'Dermaplaning', description: 'Skin-focused dermaplaning treatment published in Timely.', image: '/assets/bella/treatments.png', price: '140', duration: '55 mins' },
};

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const buildDir = isGitHubPages ? 'dist-pages' : 'dist';
const publicAsset = (path) => isGitHubPages ? `/Bella-Beauty-Brazil${path}` : path;
const source = await readFile(join(buildDir, 'index.html'), 'utf8');
const scriptSrc = source.match(/<script type="module"[^>]+src="([^"]+)"/)?.[1] || '/src/main.tsx';
const cssLinks = [...source.matchAll(/<link rel="stylesheet"[^>]+href="([^"]+)"/g)].map((match) => `<link rel="stylesheet" href="${match[1]}">`).join('');

for (const [slug, service] of Object.entries(services)) {
  const url = `https://www.bellabeautybrazil.com.au/services/${slug}`;
  const title = `${service.title} | Bella Beauty Brazil Greenslopes`;
  const description = `${service.description} Confirmed Timely details and official booking at Bella Beauty Brazil in Greenslopes, Brisbane.`;
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.description, provider: { '@type': 'BeautySalon', name: 'Bella Beauty Brazil', telephone: '+61 402 148 437', address: { '@type': 'PostalAddress', streetAddress: 'Suite 3, 412 Logan Road', addressLocality: 'Greenslopes', addressRegion: 'QLD', postalCode: '4120', addressCountry: 'AU' } }, areaServed: ['Greenslopes', 'Brisbane Southside', 'Greater Brisbane'], offers: { '@type': 'Offer', priceCurrency: 'AUD', price: service.price, url: 'https://bellabrazil.gettimely.com/' } };
  const body = `<main><article><p>Bella Beauty Brazil · Greenslopes, Brisbane</p><h1>${escapeHtml(service.title)}</h1><p>${escapeHtml(service.description)}</p><img src="${publicAsset(service.image)}" alt="${escapeHtml(service.title)} at Bella Beauty Brazil in Greenslopes" /><h2>About this treatment</h2><p>Explore the confirmed service details, suitability information, preparation and aftercare guidance, FAQs and official Timely booking for Bella Beauty Brazil.</p><h2>Book this service</h2><p>A$${service.price} · ${service.duration}</p><p><a href="https://bellabrazil.gettimely.com/">Book on Timely</a></p></article></main>`;
  const html = source.replace(/<html[^>]*>/, '<html lang="en-AU">').replace(/<head>([\s\S]*?)<\/head>/, `<head>$1<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${url}">${cssLinks}<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`).replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`).replace(/<script type="module"[^>]+><\/script>/, `<script type="module" src="${scriptSrc}"></script>`);
  const target = isGitHubPages ? join(buildDir, 'services', slug, 'index.html') : join(buildDir, 'services', slug);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}
console.log(`Prerendered ${Object.keys(services).length} service routes with indexable HTML.`);
