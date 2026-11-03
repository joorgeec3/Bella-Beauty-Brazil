import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { SERVICES, COURSES, BOOKING_URL, getLocalizedService } from '../src/data/siteData.ts';
import { SERVICE_GROUPS } from '../src/data/serviceGroups.ts';
import { SERVICE_GUIDES } from '../src/data/serviceGuides.ts';
import { serviceGalleryFor } from '../src/data/bellaApprovedMedia.ts';
import { siteImages } from '../src/data/siteImages.ts';

// Produce actual HTML for search engines and browsers with JavaScript disabled.
// English uses existing URLs; Portuguese and Spanish have their own crawlable URLs.
const languages = ['en', 'pt', 'es'];
const details = {
  en: {
    html: 'en-AU', search: 'Beauty treatments in Greenslopes, Brisbane', home: 'Beauty and professional training in Greenslopes',
    intro: 'Personalised brows, lashes, cosmetic tattooing, skin treatments and waxing with Livia Rego.',
    services: 'All treatments', categories: 'Treatment categories', courses: 'Professional courses',
    about: 'About Bella Beauty Brazil', contact: 'Contact', locations: 'Location and opening hours',
    learn: 'Learn more', photo: 'Photos of this treatment', related: 'Other treatments',
    benefits: 'What this treatment offers', suitability: 'Who might this suit?',
    compare: 'Treatment comparison', faq: 'Frequently asked questions', booking: 'Book on Timely',
    price: 'Price', duration: 'Duration', studio: 'Our studio in Greenslopes, Brisbane',
    guidance: 'Discuss personal suitability, preparation and aftercare with the studio before booking.',
    disclaimer: 'These are related studio images, not guaranteed results for this specific treatment.',
    training: 'Explore practical courses and the Professional Eyebrow Design programme.',
  },
  pt: {
    html: 'pt-BR', search: 'Tratamentos de beleza em Greenslopes, Brisbane', home: 'Beleza e formação profissional em Greenslopes',
    intro: 'Sobrancelhas, cílios, tatuagem cosmética, tratamentos de pele e depilação com atendimento personalizado de Livia Rego.',
    services: 'Todos os tratamentos', categories: 'Categorias de tratamentos', courses: 'Cursos profissionais',
    about: 'Sobre a Bella Beauty Brazil', contact: 'Contato', locations: 'Localização e horários',
    learn: 'Saiba mais', photo: 'Fotos do tratamento', related: 'Outros tratamentos',
    benefits: 'Benefícios deste atendimento', suitability: 'Para quem é indicado?',
    compare: 'Comparação entre tratamentos', faq: 'Perguntas frequentes', booking: 'Agendar pelo Timely',
    price: 'Preço', duration: 'Duração', studio: 'Nosso estúdio em Greenslopes, Brisbane',
    guidance: 'Consulte o estúdio sobre indicação individual, preparação e cuidados antes de agendar.',
    disclaimer: 'Estas são imagens relacionadas do estúdio, não resultados garantidos deste tratamento.',
    training: 'Conheça as formações práticas e o programa Professional Eyebrow Design.',
  },
  es: {
    html: 'es', search: 'Tratamientos de belleza en Greenslopes, Brisbane', home: 'Belleza y formación profesional en Greenslopes',
    intro: 'Cejas, pestañas, tatuaje cosmético, cuidado de la piel y depilación con la atención personalizada de Livia Rego.',
    services: 'Todos los tratamientos', categories: 'Categorías de tratamientos', courses: 'Cursos profesionales',
    about: 'Sobre Bella Beauty Brazil', contact: 'Contacto', locations: 'Ubicación y horarios',
    learn: 'Más información', photo: 'Fotos del tratamiento', related: 'Otros tratamientos',
    benefits: 'Beneficios del tratamiento', suitability: '¿Para quién es adecuado?',
    compare: 'Comparación de tratamientos', faq: 'Preguntas frecuentes', booking: 'Reservar en Timely',
    price: 'Precio', duration: 'Duración', studio: 'Nuestro estudio en Greenslopes, Brisbane',
    guidance: 'Consulta al estudio sobre tu situación personal, preparación y cuidados antes de reservar.',
    disclaimer: 'Estas son imágenes relacionadas del estudio, no resultados garantizados de este tratamiento.',
    training: 'Conoce los cursos prácticos y el programa Professional Eyebrow Design.',
  },
};
const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const isPages = process.env.GITHUB_PAGES === 'true';
const output = isPages ? 'dist-pages' : 'dist';
const origin = (process.env.PUBLIC_SITE_URL || 'https://bellabeautybrazil.com.au').replace(/\/+$/, '');
const publicAsset = (asset) => {
  const path = String(asset || '');
  if (/^https?:\/\//i.test(path)) return path;
  const leading = path.startsWith('/') ? path : '/' + path;
  return isPages && !leading.startsWith('/Bella-Beauty-Brazil/') ? '/Bella-Beauty-Brazil' + leading : leading;
};
const absoluteImage = (asset) => origin + publicAsset(asset);
const localizedRoute = (lang, route) => lang === 'en' ? route : '/' + lang + (route === '/' ? '' : route);
const href = (lang, route) => localizedRoute(lang, route);
const anchor = (lang, route, text, klass = '') => '<a class="' + klass + '" href="' + escapeHtml(href(lang, route)) + '">' + escapeHtml(text) + '</a>';
const image = (asset, alt, eager = false) =>
  '<img src="' + escapeHtml(publicAsset(asset)) + '" alt="' + escapeHtml(alt) +
  '" width="640" height="480" loading="' + (eager ? 'eager' : 'lazy') + '" decoding="async">';
const routePaths = ['/', '/about', '/services', '/courses', '/locations', '/contact',
  ...SERVICE_GROUPS.map((group) => '/services/categories/' + group.id),
  ...SERVICES.map((service) => '/services/' + service.id)];
const serviceMap = new Map(SERVICES.map((service) => [service.id, service]));
if (serviceMap.size !== SERVICES.length || SERVICE_GROUPS.flatMap((group) => group.serviceIds).some((id) => !serviceMap.has(id))) {
  throw new Error('Static HTML catalogue does not match the services/group routes');
}
const css = '<style id="bella-prerender-style">' +
  '.bella-seo{max-width:1180px;margin:0 auto;padding:20px 22px 50px;color:#422b34;font:16px/1.6 Montserrat,Arial,sans-serif}' +
  '.bella-seo h1{font:600 clamp(30px,5vw,48px)/1.15 Raleway,Arial,sans-serif;color:#5b3239;margin:24px 0 16px}' +
  '.bella-seo h2{font:600 clamp(23px,3vw,30px)/1.25 Raleway,Arial,sans-serif;color:#5b3239;margin:30px 0 14px}' +
  '.bella-seo h3{font-weight:700;font-size:18px;margin:16px 0 8px}.bella-seo p{margin:12px 0}' +
  '.bella-seo a{color:#833e54;text-decoration:underline;text-underline-offset:3px}' +
  '.bella-seo nav{display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:12px 0;border-bottom:1px solid #dcc8cd}' +
  '.bella-seo .seo-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,235px),1fr));gap:20px;margin:22px 0}' +
  '.bella-seo .seo-card{display:block;border:1px solid #e9d8db;border-radius:14px;overflow:hidden;padding:15px;background:white}' +
  '.bella-seo .seo-card img{width:100%;height:195px;object-fit:contain;background:#f4edef;border-radius:8px}' +
  '.bella-seo .seo-media{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:14px;margin:20px 0}' +
  '.bella-seo .seo-media img{width:100%;height:240px;object-fit:contain;background:#f4edef;border-radius:12px}' +
  '.bella-seo .seo-lead{font-size:18px;color:#5f424b;max-width:950px}.bella-seo .seo-action{display:inline-block;padding:12px 19px;border-radius:40px;background:#5b3239;color:white;text-decoration:none;margin:16px 0}' +
  '.bella-seo footer{border-top:1px solid #dcc8cd;padding-top:20px;margin-top:35px;font-size:14px}' +
  '@media(max-width:640px){.bella-seo{padding:16px}.bella-seo nav{gap:10px}}' +
  '</style>';
const template = await readFile(join(output, 'index.html'), 'utf8');

const navigation = (lang) => '<nav aria-label="Bella Beauty Brazil">' +
  anchor(lang, '/', 'Bella Beauty Brazil') +
  anchor(lang, '/services', details[lang].services) +
  anchor(lang, '/courses', details[lang].courses) +
  anchor(lang, '/about', details[lang].about) +
  anchor(lang, '/locations', details[lang].locations) +
  anchor(lang, '/contact', details[lang].contact) + '</nav>';
const languagesNav = (route) => '<nav aria-label="Language / Idioma">' +
  '<a href="' + href('en', route) + '" lang="en-AU">EN</a>' +
  '<a href="' + href('pt', route) + '" lang="pt-BR">PT</a>' +
  '<a href="' + href('es', route) + '" lang="es">ES</a></nav>';
const footer = (lang) => '<footer><strong>Bella Beauty Brazil · Greenslopes, Brisbane</strong>' +
  '<p>Suite 3, 412 Logan Road, Greenslopes QLD 4120, Australia · +61 402 148 437</p>' +
  '<p><a href="' + escapeHtml(BOOKING_URL) + '">' + details[lang].booking + '</a></p></footer>';
const wrap = (lang, route, inner) => '<main class="bella-seo"><header>' + navigation(lang) +
  languagesNav(route) + '</header>' + inner + footer(lang) + '</main>';

const photosFor = (service) => {
  const gallery = serviceGalleryFor(service.id);
  const photos = gallery.photos.length ? gallery.photos : [{ src: service.image, alt: service.title, caption: service.title }];
  return { photos: photos.slice(0, 6), illustrative: gallery.illustrative };
};
const serviceCard = (service, lang) => {
  const s = getLocalizedService(service, lang);
  const first = photosFor(service).photos[0];
  return '<article class="seo-card">' + image(first.src, first.alt) +
    '<h3>' + escapeHtml(s.title) + '</h3><p>' + escapeHtml(s.description) + '</p>' +
    (s.price ? '<p><strong>A$' + escapeHtml(s.price) + '</strong></p>' : '') +
    anchor(lang, '/services/' + s.id, details[lang].learn) + '</article>';
};
const servicePage = (service, lang) => {
  const text = details[lang], s = getLocalizedService(service, lang);
  const guide = SERVICE_GUIDES[service.id]?.[lang];
  const gallery = photosFor(service);
  const media = '<section aria-label="' + escapeHtml(text.photo) + '"><h2>' + escapeHtml(text.photo) + '</h2>' +
    (gallery.illustrative ? '<p>' + escapeHtml(text.disclaimer) + '</p>' : '') +
    '<div class="seo-media">' + gallery.photos.map((photo) => image(photo.src, photo.alt)).join('') + '</div></section>';
  const benefits = s.benefits?.length ? '<h2>' + escapeHtml(text.benefits) + '</h2><ul>' +
    s.benefits.map((b) => '<li>' + escapeHtml(b) + '</li>').join('') + '</ul>' : '';
  const faq = guide ? '<section><h2>' + escapeHtml(text.suitability) + '</h2><p>' + escapeHtml(guide.idealFor) + '</p>' +
    (guide.comparison ? '<h2>' + escapeHtml(text.compare) + '</h2><p>' + escapeHtml(guide.comparison) + '</p>' : '') +
    '<h2>' + escapeHtml(text.faq) + '</h2><h3>' + escapeHtml(guide.question) + '</h3><p>' + escapeHtml(guide.answer) + '</p></section>' : '';
  const category = SERVICE_GROUPS.find((g) => g.serviceIds.includes(service.id));
  const others = category ? category.serviceIds.filter((id) => id !== service.id).slice(0, 6) : [];
  const related = others.length ? '<h2>' + escapeHtml(text.related) + '</h2><ul>' +
    others.map((id) => '<li>' + anchor(lang, '/services/' + id, serviceMap.get(id).title) + '</li>').join('') + '</ul>' : '';
  const body = '<article>' + anchor(lang, '/services', text.services) +
    '<h1>' + escapeHtml(s.title) + ' · Greenslopes</h1><p class="seo-lead">' + escapeHtml(s.description) + '</p>' +
    '<p>' + escapeHtml(text.studio) + '</p>' +
    (s.price ? '<p><strong>' + text.price + ': A$' + escapeHtml(s.price) + '</strong></p>' : '') +
    (s.duration ? '<p>' + escapeHtml(text.duration) + ': ' + escapeHtml(s.duration) + '</p>' : '') +
    '<a class="seo-action" href="' + escapeHtml(BOOKING_URL) + '">' + escapeHtml(text.booking) + '</a>' +
    media + benefits + faq + '<p>' + escapeHtml(text.guidance) + '</p>' + related + '</article>';
  const schema = {
    '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.description,
    image: absoluteImage(gallery.photos[0].src), inLanguage: text.html,
    provider: { '@type': 'BeautySalon', name: 'Bella Beauty Brazil', url: origin,
      telephone: '+61 402 148 437', address: { '@type': 'PostalAddress', streetAddress: 'Suite 3, 412 Logan Road',
        addressLocality: 'Greenslopes', addressRegion: 'QLD', postalCode: '4120', addressCountry: 'AU' } },
    areaServed: ['Greenslopes', 'Brisbane', 'Queensland'],
    offers: s.price ? { '@type': 'Offer', price: s.price, priceCurrency: 'AUD', url: BOOKING_URL } : undefined,
  };
  return { body, title: s.title + ' | Bella Beauty Brazil Greenslopes', description: s.description,
    image: gallery.photos[0].src, schema };
};
const categoryPage = (group, lang) => {
  const text = details[lang], services = group.serviceIds.map((id) => serviceMap.get(id)).filter(Boolean);
  const body = '<section><h1>' + escapeHtml(group.title[lang]) + ' · Greenslopes</h1>' +
    '<p class="seo-lead">' + escapeHtml(group.lead[lang]) + '</p><div class="seo-grid">' +
    services.map((s) => serviceCard(s, lang)).join('') + '</div></section>';
  return { title: group.title[lang] + ' | Bella Beauty Brazil Greenslopes', description: group.lead[lang],
    body, image: photosFor(services[0]).photos[0].src };
};
const infoPage = (route, lang) => {
  const t = details[lang], treatmentCards = '<div class="seo-grid">' +
    SERVICES.map((s) => serviceCard(s, lang)).join('') + '</div>';
  const groups = '<div class="seo-grid">' + SERVICE_GROUPS.map((group) => {
    const first = serviceMap.get(group.serviceIds[0]);
    return '<article class="seo-card">' + image(photosFor(first).photos[0].src, group.title[lang]) +
      '<h3>' + escapeHtml(group.title[lang]) + '</h3><p>' + escapeHtml(group.lead[lang]) + '</p>' +
      anchor(lang, '/services/categories/' + group.id, t.learn) + '</article>';
  }).join('') + '</div>';
  if (route === '/') return { title: t.home + ' | Bella Beauty Brazil', description: t.intro,
    image: siteImages.hero.mainBella, body: '<section><h1>' + escapeHtml(t.home) + '</h1>' +
    '<p class="seo-lead">' + escapeHtml(t.intro) + '</p>' +
    image(siteImages.hero.mainBella, 'Bella Beauty Brazil beauty studio in Greenslopes', true) +
    '<h2>' + escapeHtml(t.categories) + '</h2>' + groups +
    '<h2>' + escapeHtml(t.services) + '</h2>' + treatmentCards + '</section>' };
  if (route === '/services') return { title: t.search + ' | Bella Beauty Brazil', description: t.intro,
    image: siteImages.hero.mainBella, body: '<section><h1>' + escapeHtml(t.search) + '</h1>' +
    '<p class="seo-lead">' + escapeHtml(t.intro) + '</p><h2>' + escapeHtml(t.categories) +
    '</h2>' + groups + '<h2>' + escapeHtml(t.services) + '</h2>' + treatmentCards + '</section>' };
  if (route === '/courses') return { title: t.courses + ' | Bella Beauty Brazil', description: t.training,
    image: siteImages.training.heroPhoto, body: '<section><h1>' + escapeHtml(t.courses) + '</h1>' +
    '<p class="seo-lead">' + escapeHtml(t.training) + '</p>' + image(siteImages.training.heroPhoto, 'Bella Beauty Brazil Academy training') +
    '<div class="seo-grid">' + COURSES.map((course) => '<article class="seo-card">' + image(course.image, course.title) +
      '<h3>' + escapeHtml(course.title) + '</h3><p>' + escapeHtml(course.description) + '</p>' +
      '<p><strong>A$' + escapeHtml(course.price) + '</strong></p></article>').join('') + '</div>' +
    '<h2>Professional Eyebrow Design · Modules 21–27</h2><p>Client Consultation, Brow Design Worksheet, Practical Training, Common Mistakes, Client Aftercare, Professional Photography and Social Media for Brow Artists.</p>' +
    '<p>Final Examination · Certificate of Completion · Bella Beauty Brazil Academy</p></section>' };
  if (route === '/about') return { title: t.about + ' | Bella Beauty Brazil', description: t.intro,
    image: siteImages.aboutMe.liviaFeaturePhoto, body: '<section><h1>' + escapeHtml(t.about) + '</h1>' +
    image(siteImages.aboutMe.liviaFeaturePhoto, 'Livia Rego, Bella Beauty Brazil', true) +
    '<p class="seo-lead">' + escapeHtml(t.intro) + '</p><p>Livia Rego · Bella Beauty Brazil · Greenslopes, Brisbane.</p></section>' };
  if (route === '/locations') return { title: t.locations + ' | Bella Beauty Brazil', description: t.studio,
    image: siteImages.hero.mainBella, body: '<section><h1>' + escapeHtml(t.locations) + '</h1>' +
    '<p>Suite 3, 412 Logan Road, Greenslopes QLD 4120, Australia.</p>' +
    '<p>Monday to Saturday · Appointment times and availability through Timely.</p>' +
    '<a class="seo-action" href="' + escapeHtml(BOOKING_URL) + '">' + escapeHtml(t.booking) + '</a></section>' };
  return { title: t.contact + ' | Bella Beauty Brazil', description: t.studio,
    image: siteImages.hero.mainBella, body: '<section><h1>' + escapeHtml(t.contact) + '</h1>' +
    '<p>Suite 3, 412 Logan Road, Greenslopes QLD 4120, Australia.</p>' +
    '<p><a href="tel:+61402148437">+61 402 148 437</a></p>' +
    '<p><a href="https://wa.me/61402148437">WhatsApp</a></p>' +
    '<a class="seo-action" href="' + escapeHtml(BOOKING_URL) + '">' + escapeHtml(t.booking) + '</a></section>' };
};

const htmlFor = (lang, route, page) => {
  const fullRoute = localizedRoute(lang, route);
  const canonical = origin + fullRoute;
  const alternates = [
    ['en-AU', 'en'], ['pt-BR', 'pt'], ['es', 'es'], ['x-default', 'en']
  ].map(([code, value]) => '<link rel="alternate" hreflang="' + code +
    '" href="' + escapeHtml(origin + localizedRoute(value, route)) + '" />').join('\n');
  let html = template
    .replace(/<html lang="[^"]+">/i, '<html lang="' + details[lang].html + '">')
    .replace(/<title>[\s\S]*?<\/title>/i, '<title>' + escapeHtml(page.title) + '</title>')
    .replace(/<meta name="description"[^>]*>/i,
      '<meta name="description" content="' + escapeHtml(page.description) + '" />')
    .replace(/<link rel="canonical"[^>]*>/i,
      '<link rel="canonical" href="' + escapeHtml(canonical) + '" />')
    .replace(/<meta property="og:title"[^>]*>/i,
      '<meta property="og:title" content="' + escapeHtml(page.title) + '" />')
    .replace(/<meta property="og:description"[^>]*>/i,
      '<meta property="og:description" content="' + escapeHtml(page.description) + '" />')
    .replace(/<meta property="og:url"[^>]*>/i,
      '<meta property="og:url" content="' + escapeHtml(canonical) + '" />')
    .replace(/<meta property="og:image"[^>]*>/i,
      '<meta property="og:image" content="' + escapeHtml(absoluteImage(page.image)) + '" />')
    .replace(/<div id="root"><\/div>/,
      '<div id="root">' + wrap(lang, route, page.body) + '</div>');
  const extraSchema = page.schema ? '<script type="application/ld+json">' +
    JSON.stringify(page.schema).replaceAll('<', '\\u003c') + '</script>' : '';
  html = html.replace(/<\/head>/i, alternates + '<meta property="og:locale" content="' +
    details[lang].html.replace('-', '_') + '" />' + css + extraSchema + '</head>');
  return html;
};

for (const lang of languages) {
  for (const route of routePaths) {
    let page;
    if (route.startsWith('/services/categories/')) {
      const id = route.slice('/services/categories/'.length);
      const group = SERVICE_GROUPS.find((item) => item.id === id);
      if (!group) throw new Error('Missing group: ' + id);
      page = categoryPage(group, lang);
    } else if (route.startsWith('/services/')) {
      const id = route.slice('/services/'.length);
      const service = serviceMap.get(id);
      if (!service) throw new Error('Missing service: ' + id);
      page = servicePage(service, lang);
    } else {
      page = infoPage(route, lang);
    }
    const localized = localizedRoute(lang, route);
    const destination = localized === '/' ? join(output, 'index.html') :
      join(output, localized.slice(1), 'index.html');
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, htmlFor(lang, route, page));
  }
}
const urls = languages.flatMap((lang) => routePaths.map((route) => origin + localizedRoute(lang, route)));
await writeFile(join(output, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((url) => '  <url><loc>' + escapeHtml(url) + '</loc></url>').join('\n') + '\n</urlset>\n');
await writeFile(join(output, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n');
console.log('Prerendered ' + urls.length + ' HTML pages (' + routePaths.length +
  ' routes x EN/PT/ES), with treatment descriptions, verified photos and localized SEO metadata.');
