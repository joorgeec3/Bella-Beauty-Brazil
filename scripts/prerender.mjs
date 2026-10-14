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
  'cosmetic-tattooing': { title: 'Cosmetic Tattooing', description: 'Cosmetic tattooing treatments from the Bella Beauty Brazil Timely catalogue.', image: '/assets/bella/cosmetic-tattooing.png' },
  'brow-sculpt': { title: 'Brow Sculpt Signature', description: 'Personalised brow sculpting and shaping in Greenslopes.', image: '/assets/bella/brows.png', price: '56', duration: '25 mins' },
  'classic-eyelashes': { title: 'Classic Eyelash Extensions', description: 'Classic eyelash extensions for an elegant natural look.', image: '/assets/bella/lashes.jpg', price: '145', duration: '1 hour, 30 mins' },
  'hybrid-eyelashes': { title: 'Hybrid Eyelash Extensions', description: 'Hybrid eyelash extension service at Bella Beauty Brazil.', image: '/assets/bella/lashes.jpg', price: '175', duration: '1 hour, 45 mins' },
  'russian-volume': { title: 'Russian Volume Extensions', description: 'Russian Volume eyelash extension service.', image: '/assets/bella/lashes.jpg', price: '200', duration: '2 hours, 50 mins' },
  microneedling: { title: 'Microneedling', description: 'Skin-focused microneedling treatment from Bella Beauty Brazil.', image: '/assets/bella/treatments.png', price: '185', duration: '1 hour' },
  'facial-spa': { title: 'Facial Spa', description: 'Bella Beauty Brazil professional facial spa treatments.', image: '/assets/bella/treatments.png', price: '150', duration: '1 hour, 20 mins' },
  'deluxe-facial': { title: 'Deluxe Facial', description: 'Deluxe facial treatment at Bella Beauty Brazil in Greenslopes.', image: '/assets/bella/treatments.png', price: '360', duration: '1 hour, 50 mins' },
  waxing: { title: 'Brazilian Waxing', description: 'Professional Brazilian waxing from Bella Beauty Brazil.', image: '/assets/bella/waxing.png', price: '82', duration: '30 mins' },
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
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.description, provider: { '@type': 'BeautySalon', name: 'Bella Beauty Brazil', telephone: '+61 402 148 437', address: { '@type': 'PostalAddress', streetAddress: 'Suite 3, 412 Logan Road', addressLocality: 'Greenslopes', addressRegion: 'QLD', postalCode: '4120', addressCountry: 'AU' } }, areaServed: ['Greenslopes', 'Brisbane Southside', 'Greater Brisbane'], offers: service.price ? { '@type': 'Offer', priceCurrency: 'AUD', price: service.price, url: 'https://bellabrazil.gettimely.com/' } : undefined };
  const body = `<main><article><p>Bella Beauty Brazil · Greenslopes, Brisbane</p><h1>${escapeHtml(service.title)}</h1><p>${escapeHtml(service.description)}</p><img src="${publicAsset(service.image)}" alt="${escapeHtml(service.title)} at Bella Beauty Brazil in Greenslopes" /><h2>About this treatment</h2><p>Explore the confirmed service details, suitability information, preparation and aftercare guidance, FAQs and official Timely booking for Bella Beauty Brazil.</p><h2>Book this service</h2>${service.price ? `<p>A${service.price} · ${service.duration}</p>` : ''}<p><a href="https://bellabrazil.gettimely.com/">Book on Timely</a></p></article></main>`;
  const html = source.replace(/<html[^>]*>/, '<html lang="en-AU">').replace(/<head>([\s\S]*?)<\/head>/, `<head>$1<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${url}">${cssLinks}<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`).replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`).replace(/<script type="module"[^>]+><\/script>/, `<script type="module" src="${scriptSrc}"></script>`);
  const target = isGitHubPages ? join(buildDir, 'services', slug, 'index.html') : join(buildDir, 'services', slug);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}
// Keep all public entry pages crawlable as well; React takes over after hydration.
const simplePages = {
  about: ['Meet Livia Rego', 'Discover Bella Beauty Brazil, a personalised beauty studio in Greenslopes, Brisbane.'],
  services: ['Beauty Services', 'Explore brow, lash, lip and skin treatments at Bella Beauty Brazil in Greenslopes.'],
  courses: ['Professional Beauty Courses', 'Explore one-to-one Lash Lift, Brow Lamination, Eyelash Extensions and Nano Strokes training in Brisbane.'],
  locations: ['Find Us & Opening Hours', 'Visit Bella Beauty Brazil at Suite 3, 412 Logan Road, Greenslopes QLD 4120.'],
  contact: ['Contact & Book', 'Contact Bella Beauty Brazil or book an appointment via the official Timely booking page.'],
};
for (const [slug, [title, description]] of Object.entries(simplePages)) {
  const canonicalUrl = `https://www.bellabeautybrazil.com.au/${slug}`;
  const body = `<main><article><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><a href="https://bellabrazil.gettimely.com/">Book with Bella Beauty Brazil</a></article></main>`;
  const html = source.replace(/<html[^>]*>/, '<html lang="en-AU">').replace(/<head>([\\s\\S]*?)<\\/head>/, `<head>$1<title>${escapeHtml(title)} | Bella Beauty Brazil</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${canonicalUrl}">${cssLinks}</head>`).replace(/<div id="root"><\\/div>/, `<div id="root">${body}</div>`);
  const target = isGitHubPages ? join(buildDir, slug, 'index.html') : join(buildDir, slug);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}
console.log(`Prerendered ${Object.keys(services).length} service routes and ${Object.keys(simplePages).length} informational routes with indexable HTML.`);
