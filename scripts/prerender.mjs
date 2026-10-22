import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { SERVICE_GUIDES } from '../src/data/serviceGuides.ts';

const services = {
  'shadow-brows': { title: 'Shadow Brows', description: 'Shadow Brows creates a soft, shaded effect, similar to the look of freshly dyed brows. The shape, colour and intensity are tailored to your features and preferences, from subtle definition to a more defined finish.', image: '/assets/bella/client-2026-10/brow-tools.webp', price: '630' },
  'cosmetic-tattoo-removal': { title: 'Cosmetic Tattoo Removal', description: 'Non-laser pigment lightening with THink Pigment Remover after an individual suitability assessment.', image: '/assets/bella/gallery/studio-treatment-room.webp', price: '150' },
  'male-brow-sculpt': { title: 'Male Brow Sculpt', description: 'Natural brow grooming, trimming, waxing and tweezing tailored to the existing shape.', image: '/assets/bella/client-2026-10/brow-styling.webp', price: '42' },
  'dreamy-brows': { title: 'Dreamy Brows – Brow Sculpt & Relaxing Massage', description: 'Personalised brow sculpt with a relaxing facial massage and scalp massage.', image: '/assets/bella/client-2026-10/brow-styling.webp', price: '156' },
  'lash-lift-only': { title: 'Lash Lift Only', description: 'A lift and curl for natural eyelashes without tint or extensions.', image: '/assets/bella/lashes.jpg', price: '119' },
  'wet-look-lashes': { title: 'Wet Look Lash Extensions', description: 'Textured lash extensions with darker, denser wet-look definition.', image: '/assets/bella/lashes.jpg', price: '150' },
  'lash-tint': { title: 'Lash Tint', description: 'Tint natural lashes for deeper colour and definition without extensions.', image: '/assets/bella/lashes.jpg', price: '45' },
  'lash-extension-removal': { title: 'Lash Extension Removal', description: 'Careful professional removal of existing lash extensions.', image: '/assets/bella/lashes.jpg', price: '40' },
  'nano-strokes': { title: 'Microblading – Nano Strokes', description: 'Manual Tebori eyebrow tattooing with delicate hair-like strokes, designed around natural hair flow.', image: '/assets/bella/client-2026-10/nano-strokes-procedure.webp', price: '630', duration: '2 hours, 30 mins' },
  'shadow-hybrid': { title: 'Brow Sculpt & Hybrid Dye', description: 'Personalised brow shaping with hybrid dye to tint hairs and temporarily stain the skin.', image: '/assets/bella/client-2026-10/brow-styling.webp', price: '79', duration: '40 mins' },
  'lip-blush': { title: 'Lip Blush – Lip Tattooing', description: 'Cosmetic lip tattoo to enhance the natural colour and definition of the lips. Colour softens as lips heal.', image: '/assets/bella/client-2026-10/lip-blush-procedure.webp', price: '630', duration: '2 hours, 30 mins' },
  'brow-sculpt-tint': { title: 'Brow Sculpt & Tint', description: 'A personalised brow shape, sculpt and tint service tailored to your features.', image: '/assets/bella/client-2026-10/brow-tools.webp', price: '76', duration: '35 mins' },
  'brow-lamination': { title: 'Brow Lamination, Shape & Tint', description: 'A structured brow lamination, shape and tint service published in Timely.', image: '/assets/bella/client-2026-10/brow-styling.webp', price: '133', duration: '1 hour' },
  'lash-lift': { title: 'Lash Lift & Tint', description: 'Lift and tint services published in Timely.', image: '/assets/bella/lashes.jpg', price: '133', duration: '1 hour, 10 mins' },
  dermaplaning: { title: 'Dermaplaning', description: 'Gentle skin exfoliation, removing dead cells and fine facial hair. Includes cleansing, skin assessment, skincare, moisturiser and SPF.', image: '/assets/bella/dermaplaning-facial-treatment.webp', price: '140', duration: '55 mins' },
  'brow-sculpt': { title: 'Brow Sculpt Signature', description: 'Personalised brow shaping with mapping, careful trimming, waxing and tweezing where needed. Each appointment enhances your natural shape while preserving fullness. Tint and dye are not included.', image: '/assets/bella/client-2026-10/brow-styling.webp', price: '56', duration: '25 mins' },
  'classic-eyelashes': { title: 'Classic Lash Extensions', description: 'Classic eyelash extensions for an elegant natural look.', image: '/assets/bella/lashes.jpg', price: '145', duration: '1 hour, 30 mins' },
  'hybrid-eyelashes': { title: 'Hybrid Lash Extensions', description: 'A combination of classic extensions and volume fans, designed for a fuller lash line.', image: '/assets/bella/lashes.jpg', price: '180', duration: '1 hour, 45 mins' },
  microneedling: { title: 'Microneedling', description: 'A customised skin treatment to help improve the appearance of fine lines, uneven skin texture and acne scars.', image: '/assets/bella/dermaplaning-facial-treatment.webp', price: '185', duration: '1 hour' },
  'facial-spa': { title: 'Facial Spa', description: 'Relaxing facial cleansing, gentle exfoliation, serums, facial mask and massage.', image: '/assets/bella/dermaplaning-facial-treatment.webp', price: '150', duration: '1 hour, 20 mins' },
  'deluxe-facial': { title: 'Deluxe Facial', description: 'Two-hour personalised facial with cleansing, dermaplaning, microneedling, facial mask and LED light therapy when suitable.', image: '/assets/bella/dermaplaning-facial-treatment.webp', price: '360', duration: '2 hours' },
  'lip-bliss-hydration': { title: 'Lip Bliss Hydration', description: 'Hydration treatment for dry lips without tattoo pigment or injectable volume.', image: '/assets/bella/gallery/studio-treatment-room.webp', price: '99' },
  'grow-up-hair-brows': { title: 'Exos Hair Brows', description: 'Personalised care for sparse or overplucked natural brows and the underlying skin.', image: '/assets/bella/gallery/studio-treatment-room.webp', price: '150' },
  'grow-up-hair-scalp': { title: 'Exos Hair Scalp', description: 'Individual scalp assessment and care for clients concerned about thinning hair.', image: '/assets/bella/gallery/studio-treatment-room.webp', price: '200' },
  'teeth-whitening': { title: 'Teeth Whitening', description: 'Teeth whitening service published by Bella Beauty Brazil in the official Timely catalogue; confirm suitability and aftercare with the studio.', image: '/assets/bella/gallery/studio-treatment-room.webp', price: '199', duration: '1 hour' },
  waxing: { title: 'Brazilian Waxing', description: 'Professional Brazilian waxing from Bella Beauty Brazil.', image: '/assets/bella/client-2026-10/waxing-treatment.webp', price: '82', duration: '30 mins' },
};

// Keep server-rendered service images consistent with the original client folders.
// When no matching treatment photo exists, display brand artwork rather than
// borrowing an unrelated treatment's result.
const actualMediaFolder = {
  'nano-strokes':'nano-strokes',
  'shadow-brows':'shadow-brows',
  'lip-blush':'lip-blush',
  'cosmetic-tattoo-removal':'cosmetic-tattoo-removal',
  'brow-sculpt':'brow-sculpt',
  'brow-sculpt-tint':'brow-tint',
  'shadow-hybrid':'brow-dye',
  'brow-lamination':'brow-lamination',
  'lash-lift':'lash-lift',
  'classic-eyelashes':'lash-extensions',
  'hybrid-eyelashes':'lash-extensions',
  'wet-look-lashes':'lash-extensions',
  'teeth-whitening':'teeth-whitening',
};
for (const [id,item] of Object.entries(services)) {
  const folder = actualMediaFolder[id];
  item.image = folder
    ? `/assets/bella/media-alinhada-2026-10/${folder}/01.webp`
    : id==='waxing' ? '/assets/bella/client-2026-10/waxing-treatment.webp' : '/assets/bella/logo.png';
}

// All published treatment paths must exist in the same catalogue as the client-side router.
// Missing paths caused direct links such as /services/shadow-brows to return Vercel 404.
const appServicesSource = await readFile('src/data/siteData.ts', 'utf8');
const appServicesStart = appServicesSource.indexOf('export const SERVICES: Service[] = [');
const appServicesEnd = appServicesSource.indexOf('\n];', appServicesStart);
if (appServicesStart === -1 || appServicesEnd === -1) throw new Error('Cannot locate the application service routes in siteData.ts');
const appServicesBlock = appServicesSource.slice(appServicesStart, appServicesEnd);
const appServiceIds = [...appServicesBlock.matchAll(/^\s*\{\s*id:\s*'([^']+)'/gm)].map((m) => m[1]);
const missingServicePages = appServiceIds.filter((id) => !Object.hasOwn(services, id));
const staleServicePages = Object.keys(services).filter((id) => !appServiceIds.includes(id));
if (new Set(appServiceIds).size !== appServiceIds.length || missingServicePages.length || staleServicePages.length) {
  throw new Error('Service pre-render map differs from app routes. Missing: ' + missingServicePages.join(', ') + '; Stale: ' + staleServicePages.join(', '));
}

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const buildDir = isGitHubPages ? 'dist-pages' : 'dist';
const publicAsset = (path) => isGitHubPages ? `/Bella-Beauty-Brazil${path}` : path;
const source = await readFile(join(buildDir, 'index.html'), 'utf8');
const siteOrigin = (process.env.PUBLIC_SITE_URL || 'https://bella-beauty-brazil.vercel.app').replace(/\/+$/, '');
const renderPage = ({ title, description, canonicalUrl, body, schema }) => {
  // Replace the homepage tags; adding a second title/canonical is invalid SEO.
  let html = source
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);
  if (schema) html = html.replace(/<\/head>/i, `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
  return html;
};
for (const [slug, service] of Object.entries(services)) {
  const url = `${siteOrigin}/services/${slug}`;
  const title = `${service.title} | Bella Beauty Brazil Greenslopes`;
  const description = `${service.description} Confirmed Timely details and official booking at Bella Beauty Brazil in Greenslopes, Brisbane.`;
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.description, provider: { '@type': 'BeautySalon', name: 'Bella Beauty Brazil', telephone: '+61 402 148 437', address: { '@type': 'PostalAddress', streetAddress: 'Suite 3, 412 Logan Road', addressLocality: 'Greenslopes', addressRegion: 'QLD', postalCode: '4120', addressCountry: 'AU' } }, areaServed: ['Greenslopes', 'Brisbane Southside', 'Greater Brisbane'], offers: service.price ? { '@type': 'Offer', priceCurrency: 'AUD', price: service.price, url: 'https://book.gettimely.com/bellabrazil/book/embed?client-login=true' } : undefined };
  const guide = SERVICE_GUIDES[slug]?.en;
  const treatmentInfo = guide
    ? `<h2>Who might this treatment suit?</h2><p>${escapeHtml(guide.idealFor)}</p><h2>How does it compare?</h2><p>${escapeHtml(guide.comparison)}</p><h2>Common questions</h2><h3>${escapeHtml(guide.question)}</h3><p>${escapeHtml(guide.answer)}</p>`
    : '<p>Ask Bella Beauty Brazil about suitability, preparation and aftercare before booking.</p>';
  const faqSchema = guide ? {
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question', name: guide.question,
      acceptedAnswer: { '@type': 'Answer', text: guide.answer },
    }],
  } : null;
  const schemaGraph = faqSchema ? { '@context': 'https://schema.org', '@graph': [schema, faqSchema] } : schema;
  const body = `<main><article><p>Bella Beauty Brazil · Greenslopes, Brisbane</p><h1>${escapeHtml(service.title)}</h1><p>${escapeHtml(service.description)}</p><img src="${publicAsset(service.image)}" alt="${escapeHtml(service.title)} at Bella Beauty Brazil in Greenslopes" /><h2>About this treatment</h2>${treatmentInfo}<h2>Book this service</h2>${service.price ? `<p>A$${service.price}${service.duration ? ' · ' + service.duration : ''}</p>` : ''}<p><a href="https://book.gettimely.com/bellabrazil/book/embed?client-login=true">Book on Timely</a></p></article></main>`;
  const html = renderPage({ title, description, canonicalUrl: url, body, schema: schemaGraph });
  const target = join(buildDir, 'services', slug, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}
// Keep all public entry pages crawlable as well; React takes over after hydration.
const simplePages = {
  about: ['Meet Livia Rego', 'Discover Bella Beauty Brazil, a personalised beauty studio in Greenslopes, Brisbane.'],
  services: ['Beauty Treatments in Greenslopes, Brisbane', 'Personalised beauty treatments in Greenslopes, Brisbane. Explore brows, lashes, cosmetic tattooing and skin treatments, with care tailored to you.'],
  courses: ['Professional Beauty Courses', 'Explore one-on-one Lash Lift & Tint, Brow Lamination and Bella Nano Strokes training in Brisbane.'],
  locations: ['Find Us & Opening Hours', 'Visit Bella Beauty Brazil at Suite 3, 412 Logan Road, Greenslopes QLD 4120.'],
  contact: ['Contact & Book', 'Contact Bella Beauty Brazil or book an appointment via the official Timely booking page.'],
};
for (const [slug, [title, description]] of Object.entries(simplePages)) {
  const canonicalUrl = `${siteOrigin}/${slug}`;
  const catalogueLinks = slug === 'services' ? `<h2>Our treatments</h2><ul>${Object.entries(services).map(([id, service]) => `<li><a href="${siteOrigin}/services/${id}">${escapeHtml(service.title)}</a></li>`).join('')}</ul>` : '';
  const body = `<main><article><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${catalogueLinks}<a href="https://book.gettimely.com/bellabrazil/book/embed?client-login=true">Book with Bella Beauty Brazil</a></article></main>`;
  const html = renderPage({ title: `${title} | Bella Beauty Brazil`, description, canonicalUrl, body });
  // Use directories for informational routes on every host. /services already exists
  // as a directory for individual treatment pages; writing dist/services as a file
  // throws EISDIR and fails the Vercel build.
  const target = join(buildDir, slug, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}
// The sitemap is generated from the actual routes so no service can be accidentally omitted.
const siteRoutes = ['/', ...Object.keys(simplePages).map((slug) => `/${slug}`), ...Object.keys(services).map((slug) => `/services/${slug}`)];
const sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  siteRoutes.map((route) => `  <url><loc>${siteOrigin}${route}</loc></url>`).join('\n') +
  '\n</urlset>\n';
await writeFile(join(buildDir, 'sitemap.xml'), sitemapXml);
await writeFile(join(buildDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteOrigin}/sitemap.xml\n`);
console.log(`Prerendered ${Object.keys(services).length} service routes, ${Object.keys(simplePages).length} informational routes and ${siteRoutes.length} sitemap URLs.`);
