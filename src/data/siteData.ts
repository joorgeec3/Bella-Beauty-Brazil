import { siteImages } from './siteImages';

export type Language = 'en' | 'es' | 'pt';

export interface Product { id: string; name: string; price: number; image: string; category: string; description: string; rating?: number; }
export interface Service {
  id: string; title: string; subtitle?: string; description: string; image: string;
  benefits?: string[]; link?: string; price?: number; duration?: string; category?: string;
}
export interface Course { id: string; title: string; description: string; duration: string; price: number; image: string; bookingUrl: string; }
export interface LocationItem { id: string; name: string; subtitle?: string; address: string; city: string; hours: string; phone: string; appointmentUrl: string; directionsUrl: string; description: string; isComingSoon?: boolean; }
export interface Testimonial { id: string; name: string; service: string; content: string; rating: number; }
export interface InstagramPost { id: string; caption: string; image: string; url: string; isVideo: boolean; }

export const BOOKING_URL = 'https://bellabrazil.gettimely.com/';
export const INSTAGRAM_URL = 'https://www.instagram.com/bellabeautybrazil/';
export const WHATSAPP_URL = 'https://wa.me/61402148437';

const copy = {
  microblading: 'Semi-permanent brow artistry designed to create realistic, natural-looking hair strokes.',
  lipBlush: 'Semi-permanent cosmetic tattooing to enhance the natural tone and shape of the lips.',
  brows: 'A personalised brow shape, sculpt and tint service tailored to your features.',
  lashes: 'Lash lifting, tinting and extensions to frame the eyes with a polished finish.',
  skin: 'Skin-focused treatments including dermaplaning, microneedling and facials.',
  waxing: 'Professional waxing services for face and body, performed with care and precision.',
};

export const SERVICES: Service[] = [
  { id: 'nano-strokes', title: 'Nano Strokes / Microblading', subtitle: 'Cosmetic Tattooing', description: copy.microblading, image: siteImages.services.microblading, price: 615, duration: '2 hours, 30 mins', category: 'Brows', benefits: ['Natural-looking hair strokes', 'Personalised brow mapping', 'Professional semi-permanent finish'] },
  { id: 'cosmetic-tattooing', title: 'Cosmetic Tattooing', subtitle: 'Semi-permanent makeup', description: 'Cosmetic tattooing services published in the official Timely catalogue. View available options and book through Timely.', image: siteImages.services.lipBlush, category: 'Brows', benefits: ['Consultation-led service', 'Timely availability', 'Official booking required'] },
  { id: 'lip-blush', title: 'Lip Blush', subtitle: 'Cosmetic Tattooing', description: copy.lipBlush, image: siteImages.services.lipBlush, price: 615, duration: '2 hours, 30 mins', category: 'Lips', benefits: ['Natural-looking lip colour', 'Shape enhancement', 'Consultation-led treatment'] },
  { id: 'brow-sculpt', title: 'Brow Sculpt Signature', subtitle: 'Brows', description: 'Signature brow sculpting and shaping published in Timely.', image: siteImages.services.brows, price: 56, duration: '25 mins', category: 'Brows', benefits: ['Sculpt and shape', 'Tailored brow design', 'Official Timely booking'] },
  { id: 'brow-sculpt-tint', title: 'Brow Sculpt & Tint', subtitle: 'Brows', description: copy.brows, image: siteImages.services.brows, price: 76, duration: '35 mins', category: 'Brows', benefits: ['Sculpt and shape', 'Tint included', 'Aftercare guidance'] },
  { id: 'shadow-hybrid', title: 'Brow Sculpt & Hybrid Brow', subtitle: 'Brows', description: 'Brow Sculpt & Hybrid Brow styling published in the official Timely catalogue.', image: siteImages.services.brows, price: 79, duration: '40 mins', category: 'Brows', benefits: ['Sculpting', 'Hybrid brow finish', 'Tailored styling'] },
  { id: 'brow-lamination', title: 'Brow Lamination, Shape & Tint', subtitle: 'Brows', description: 'A structured brow lamination, shape and tint service published in Timely.', image: siteImages.services.brows, price: 133, duration: '1 hour', category: 'Brows', benefits: ['Lamination', 'Shape and tint', 'Tailored styling'] },
  { id: 'lash-lift', title: 'Lash Lift & Tint', subtitle: 'Lashes', description: 'Lift and tint services published in Timely.', image: siteImages.services.lashes, price: 133, duration: '1 hour, 10 mins', category: 'Lashes', benefits: ['Lift and tint', 'Low-maintenance finish', 'Eye-area consultation'] },
  { id: 'classic-eyelashes', title: 'Classic Eyelash Extensions', subtitle: 'Lashes', description: 'Classic eyelash extensions published in Timely.', image: siteImages.services.lashes, price: 145, duration: '1 hour, 30 mins', category: 'Lashes', benefits: ['Classic extension set', 'Professional application', 'Refills available'] },
  { id: 'hybrid-eyelashes', title: 'Hybrid Eyelash Extensions', subtitle: 'Lashes', description: 'Hybrid eyelash extensions published in Timely.', image: siteImages.services.lashes, price: 175, duration: '1 hour, 45 mins', category: 'Lashes', benefits: ['Hybrid extension set', 'Professional application', 'Refills available'] },
  { id: 'russian-volume', title: 'Russian Volume Extensions', subtitle: 'Lashes', description: 'Russian Volume eyelash extensions published in Timely.', image: siteImages.services.lashes, price: 200, duration: '2 hours, 50 mins', category: 'Lashes', benefits: ['Russian volume set', 'Professional application', 'Refills available'] },
  { id: 'dermaplaning', title: 'Dermaplaning', subtitle: 'Skin Treatments', description: 'Skin-focused dermaplaning treatment published in Timely.', image: siteImages.services.treatments, price: 140, duration: '55 mins', category: 'Skin', benefits: ['Skin-focused protocol', 'Timely availability', 'Professional studio care'] },
  { id: 'microneedling', title: 'Microneedling', subtitle: 'Skin Treatments', description: 'Microneedling treatment published in Timely.', image: siteImages.services.treatments, price: 185, duration: '1 hour', category: 'Skin', benefits: ['Skin-focused protocol', 'Consultation-led treatment', 'Official Timely booking'] },
  { id: 'facial-spa', title: 'Facial Spa', subtitle: 'Skin Treatments', description: 'Facial Spa treatment published in Timely.', image: siteImages.services.treatments, price: 150, duration: '1 hour, 20 mins', category: 'Skin', benefits: ['Facial care', 'Relaxing treatment', 'Official Timely booking'] },
  { id: 'deluxe-facial', title: 'Deluxe Facial', subtitle: 'Skin Treatments', description: 'Deluxe Facial treatment published in Timely.', image: siteImages.services.treatments, price: 360, duration: '1 hour, 50 mins', category: 'Skin', benefits: ['Deluxe facial care', 'Consultation-led treatment', 'Official Timely booking'] },
  { id: 'waxing', title: 'Brazilian Waxing', subtitle: 'Waxing', description: 'Brazilian waxing published in Timely.', image: siteImages.services.waxing, price: 82, duration: '30 mins', category: 'Waxing', benefits: ['Professional waxing', 'Official Timely booking', 'Aftercare guidance'] },
];

const SERVICE_COPY: Record<string, { pt: string; es: string }> = {
  'nano-strokes': { pt: 'Arte semipermanente para sobrancelhas, com fios realistas e naturais.', es: 'Arte semipermanente para cejas, con trazos realistas y naturales.' },
  'cosmetic-tattooing': { pt: 'Serviços de tatuagem cosmética publicados no catálogo oficial Timely. Consulte as opções e reserve pelo Timely.', es: 'Servicios de tatuaje cosmético publicados en el catálogo oficial de Timely. Consulta las opciones y reserva por Timely.' },
  'lip-blush': { pt: 'Tatuagem cosmética semipermanente para realçar o tom e o formato natural dos lábios.', es: 'Tatuaje cosmético semipermanente para realzar el tono y la forma natural de los labios.' },
  'brow-sculpt': { pt: 'Escultura e modelagem de sobrancelhas da Bella Beauty, publicada no Timely.', es: 'Esculpido y diseño de cejas de Bella Beauty, publicado en Timely.' },
  'brow-sculpt-tint': { pt: 'Formato, escultura e coloração de sobrancelhas personalizados para seus traços.', es: 'Diseño, esculpido y tinte de cejas personalizados para tus facciones.' },
  'shadow-hybrid': { pt: 'Brow Sculpt & Hybrid Brow publicado no catálogo oficial Timely por A$79.', es: 'Brow Sculpt & Hybrid Brow publicado en el catálogo oficial de Timely por A$79.' },
  'brow-lamination': { pt: 'Laminação, formato e coloração de sobrancelhas com acabamento estruturado.', es: 'Laminado, diseño y tinte de cejas con acabado estructurado.' },
  'lash-lift': { pt: 'Elevação e coloração dos cílios para um acabamento elegante e prático.', es: 'Lifting y tinte de pestañas para un acabado elegante y práctico.' },
  'classic-eyelashes': { pt: 'Extensões Classic aplicadas profissionalmente, com opções de manutenção.', es: 'Extensiones Classic aplicadas profesionalmente, con opciones de mantenimiento.' },
  'hybrid-eyelashes': { pt: 'Extensões Hybrid aplicadas profissionalmente, com opções de manutenção.', es: 'Extensiones Hybrid aplicadas profesionalmente, con opciones de mantenimiento.' },
  'russian-volume': { pt: 'Extensões Russian Volume aplicadas profissionalmente, com opções de manutenção.', es: 'Extensiones Russian Volume aplicadas profesionalmente, con opciones de mantenimiento.' },
  'dermaplaning': { pt: 'Tratamento de dermaplaning focado na pele, publicado no catálogo Timely.', es: 'Tratamiento de dermaplaning enfocado en la piel, publicado en el catálogo Timely.' },
  'microneedling': { pt: 'Tratamento de microneedling publicado no catálogo oficial Timely.', es: 'Tratamiento de microneedling publicado en el catálogo oficial de Timely.' },
  'facial-spa': { pt: 'Tratamento Facial Spa publicado no catálogo oficial Timely.', es: 'Tratamiento Facial Spa publicado en el catálogo oficial de Timely.' },
  'deluxe-facial': { pt: 'Tratamento Deluxe Facial publicado no catálogo oficial Timely.', es: 'Tratamiento Deluxe Facial publicado en el catálogo oficial de Timely.' },
  waxing: { pt: 'Serviço profissional de waxing, realizado com cuidado e precisão.', es: 'Servicio profesional de waxing, realizado con cuidado y precisión.' },
};

const SERVICE_BENEFITS: Record<string, { pt: string[]; es: string[] }> = {
  'nano-strokes': { pt: ['Fios de aparência natural', 'Mapeamento personalizado das sobrancelhas', 'Acabamento semipermanente profissional'], es: ['Trazos de apariencia natural', 'Diseño personalizado de cejas', 'Acabado semipermanente profesional'] },
  'shadow-hybrid': { pt: ['Escultura e modelagem', 'Acabamento Hybrid', 'Styling personalizado'], es: ['Esculpido y diseño', 'Acabado Hybrid', 'Styling personalizado'] },
  'lip-blush': { pt: ['Cor natural dos lábios', 'Realce do formato', 'Tratamento orientado por consulta'], es: ['Color natural de labios', 'Realce de la forma', 'Tratamiento guiado por consulta'] },
  'brow-sculpt-tint': { pt: ['Escultura e formato', 'Tintura incluída', 'Orientação de cuidados'], es: ['Esculpido y diseño', 'Tinte incluido', 'Orientación de cuidados'] },
  'brow-lamination': { pt: ['Laminação', 'Formato e tintura', 'Styling personalizado'], es: ['Laminado', 'Diseño y tinte', 'Styling personalizado'] },
  'lash-lift': { pt: ['Elevação e tintura', 'Acabamento prático', 'Consulta para a área dos olhos'], es: ['Lifting y tinte', 'Acabado práctico', 'Consulta para el área de los ojos'] },
  dermaplaning: { pt: ['Protocolo focado na pele', 'Disponibilidade no Timely', 'Cuidado profissional no estúdio'], es: ['Protocolo enfocado en la piel', 'Disponibilidad en Timely', 'Cuidado profesional en el estudio'] },
};

export const getLocalizedService = (service: Service, language: Language): Service => language === 'en' ? service : {
  ...service,
  subtitle: language === 'pt'
    ? ({ 'Cosmetic Tattooing': 'Tatuagem Cosmética', 'Semi-permanent makeup': 'Maquiagem semipermanente', Brows: 'Sobrancelhas', Lashes: 'Cílios', 'Skin Treatments': 'Tratamentos para a pele', Waxing: 'Waxing' } as Record<string, string>)[service.subtitle || ''] || service.subtitle
    : ({ 'Cosmetic Tattooing': 'Tatuaje Cosmético', 'Semi-permanent makeup': 'Maquillaje semipermanente', Brows: 'Cejas', Lashes: 'Pestañas', 'Skin Treatments': 'Tratamientos para la piel', Waxing: 'Waxing' } as Record<string, string>)[service.subtitle || ''] || service.subtitle,
  description: SERVICE_COPY[service.id]?.[language] || service.description,
  benefits: SERVICE_BENEFITS[service.id]?.[language] || service.benefits,
};

export const COURSES: Course[] = [
  { id: 'lash-lift-course', title: 'Lash Lift Course 1:1', description: 'One-to-one Lash Lift training.', duration: '8 hours', price: 950, image: siteImages.services.courses, bookingUrl: BOOKING_URL },
  { id: 'brow-lamination-course', title: 'Brow Lamination Course 1:1', description: 'One-to-one Brow Lamination training.', duration: '8 hours, 5 mins', price: 950, image: siteImages.services.courses, bookingUrl: BOOKING_URL },
  { id: 'classic-eyelashes-course', title: 'Classic Eyelashes Extensions Course 1:1', description: 'One-to-one classic eyelash extensions training.', duration: '6 hours, 30 mins', price: 1400, image: siteImages.services.courses, bookingUrl: BOOKING_URL },
  { id: 'nano-strokes-course', title: 'Microblading Course — Nano Strokes', description: 'Realistic Micro Nano Strokes training.', duration: '16 hours', price: 4200, image: siteImages.services.courses, bookingUrl: BOOKING_URL },
];

export const PRODUCTS: Product[] = [
  { id: 'elleeplex', name: 'Elleeplex Advanced Aftercare Formula', price: 38, image: siteImages.services.lashes, category: 'Aftercare', description: 'Advanced aftercare formula for Lash Lift.' },
  { id: 'elleevate', name: 'Elleevate Mascara by Elleebana', price: 38, image: siteImages.services.lashes, category: 'Lashes', description: 'Mascara by Elleebana.' },
  { id: 'lip-gloss', name: 'Lip Gloss', price: 24, image: siteImages.services.lipBlush, category: 'Lips', description: 'Lip gloss available through Timely.' },
  { id: 'brow-gel', name: 'Brow Gel', price: 32, image: siteImages.services.brows, category: 'Brows', description: 'Brow gel available through Timely.' },
  { id: 'lash-serum', name: 'Growth Lashes Serum', price: 75, image: siteImages.services.lashes, category: 'Lashes', description: 'Lash growth serum available through Timely.' },
];

export const LOCATIONS: LocationItem[] = [{
  id: 'greenslopes', name: 'Greenslopes', subtitle: 'Bella Beauty Brazil', address: 'Suite 3, 412 Logan Road', city: 'Greenslopes, QLD 4120, Australia', hours: 'Mon 11:00am–5:30pm · Tue 9:15am–7:30pm · Wed 1:30pm–3:30pm · Thu 9:15am–7:30pm · Fri 9:15am–4:00pm · Sat 8:30am–3:30pm', phone: '+61 402 148 437', appointmentUrl: BOOKING_URL, directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Suite+3%2C+412+Logan+Road%2C+Greenslopes+QLD+4120+Australia', description: 'Beauty studio in Greenslopes, Brisbane.'
}];

export const TESTIMONIALS: Testimonial[] = [];
export const GALLERY_IMAGES: string[] = [siteImages.services.brows, siteImages.services.lipBlush, siteImages.services.lashes, siteImages.services.treatments, siteImages.gallery.livia];
export const INSTAGRAM_POSTS: InstagramPost[] = [];
