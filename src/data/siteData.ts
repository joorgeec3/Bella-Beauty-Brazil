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

// Timely's booking selector (not the public mini-site homepage).
export const BOOKING_URL = 'https://book.gettimely.com/bellabrazil/book/embed?client-login=true';
// Product-specific links require a verified Timely product ID. Never guess these IDs.
export const SERVICE_BOOKING_LINKS: Record<string, string> = {};
export const getServiceBookingUrl = (serviceId: string) => SERVICE_BOOKING_LINKS[serviceId] || BOOKING_URL;

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
  { id: 'nano-strokes', title: 'Nano Strokes / Microblading', subtitle: 'Cosmetic Tattooing', description: copy.microblading, image: siteImages.services.microblading, price: 630, duration: '2 hours, 30 mins', category: 'Brows', benefits: ['Natural-looking hair strokes', 'Personalised brow mapping', 'Professional semi-permanent finish'] },
  { id: 'shadow-brows', title: 'Shadow Brows', subtitle: 'Cosmetic Tattooing', description: 'Soft powder-style brow shading tailored to your desired shape and colour, from subtle definition to a more noticeable makeup effect.', image: siteImages.client.browTools, price: 630, category: 'Brows', benefits: ['Soft powder-style shading', 'Shape and colour planned for you', 'Touch-up at 45 days A$120'] },
  { id: 'lip-blush', title: 'Lip Blush', subtitle: 'Cosmetic Tattooing', description: copy.lipBlush, image: siteImages.services.lipBlush, price: 630, duration: '2 hours, 30 mins', category: 'Lips', benefits: ['Soft, natural-looking lip colour', 'More defined lip borders', 'Personalised shade selection', 'Colour appears stronger initially and softens as the lips heal'] },
  { id: 'cosmetic-tattoo-removal', title: 'Cosmetic Tattoo Removal', subtitle: 'Cosmetic Tattooing', description: 'A non-laser treatment using THink Pigment Remover to lighten unwanted cosmetic tattoo pigment. The number of sessions depends on your tattoo and skin response; a suitability assessment comes first.', image: siteImages.aboutMe.treatmentRoom, price: 150, category: 'Brows', benefits: ['Non-laser pigment removal', 'Individual suitability assessment', 'Sessions depend on pigment and skin response'] },
  { id: 'brow-sculpt', title: 'Brow Sculpt Signature', subtitle: 'Brows', description: 'Signature brow sculpting and shaping published in Timely.', image: siteImages.services.brows, price: 56, duration: '25 mins', category: 'Brows', benefits: ['Sculpt and shape', 'Tailored brow design', 'Official Timely booking'] },
  { id: 'brow-sculpt-tint', title: 'Brow Sculpt & Tint', subtitle: 'Brows', description: copy.brows, image: siteImages.services.brows, price: 76, duration: '35 mins', category: 'Brows', benefits: ['Sculpt and shape', 'Tint included', 'Aftercare guidance'] },
  { id: 'shadow-hybrid', title: 'Brow Sculpt & Hybrid Dye', subtitle: 'Brows', description: 'Personalised brow sculpt with hybrid dye to colour the hairs and temporarily stain the skin.', image: siteImages.services.brows, price: 79, duration: '40 mins', category: 'Brows', benefits: ['Sculpting', 'Hybrid brow finish', 'Tailored styling'] },
  { id: 'brow-lamination', title: 'Brow Lamination, Shape & Tint', subtitle: 'Brows', description: 'A structured brow lamination, shape and tint service published in Timely.', image: siteImages.services.brows, price: 133, duration: '1 hour', category: 'Brows', benefits: ['Lamination', 'Shape and tint', 'Tailored styling'] },
  { id: 'male-brow-sculpt', title: 'Male Brow Sculpt', subtitle: 'Brows', description: 'Natural brow grooming using trimming, waxing and tweezing to remove stray hairs while keeping the natural character of your brows.', image: siteImages.services.brows, price: 42, category: 'Brows', benefits: ['Natural brow grooming', 'Trimming and shaping', 'Tailored to your brow features'] },
  { id: 'dreamy-brows', title: 'Dreamy Brows – Brow Sculpt & Relaxing Massage', subtitle: 'Brows', description: 'Personalised brow sculpt followed by gentle facial lymphatic drainage and a soothing scalp massage.', image: siteImages.services.brows, price: 156, category: 'Brows', benefits: ['Personalised brow sculpt', 'Relaxing facial massage', 'Soothing scalp massage'] },
  { id: 'lash-lift-only', title: 'Lash Lift Only', subtitle: 'Lashes', description: 'Enhance the curl of your natural lashes for a lifted appearance without tint or extensions.', image: siteImages.services.lashes, price: 119, category: 'Lashes', benefits: ['Lift your natural lashes', 'No tint or extensions', 'Low-maintenance definition'] },
  { id: 'lash-lift', title: 'Lash Lift & Tint', subtitle: 'Lashes', description: 'Lift and tint services published in Timely.', image: siteImages.services.lashes, price: 133, duration: '1 hour, 10 mins', category: 'Lashes', benefits: ['Lift and tint', 'Low-maintenance finish', 'Eye-area consultation'] },
  { id: 'classic-eyelashes', title: 'Classic Eyelash Extensions', subtitle: 'Lashes', description: 'Classic eyelash extensions published in Timely.', image: siteImages.services.lashes, price: 145, duration: '1 hour, 30 mins', category: 'Lashes', benefits: ['Classic extension set', 'Professional application', 'Refills available'] },
  { id: 'hybrid-eyelashes', title: 'Hybrid Eyelash Extensions', subtitle: 'Lashes', description: 'Hybrid eyelash extensions published in Timely.', image: siteImages.services.lashes, price: 180, duration: '1 hour, 45 mins', category: 'Lashes', benefits: ['Hybrid extension set', 'Professional application', 'Refills available'] },
  { id: 'wet-look-lashes', title: 'Wet Look Lash Extensions', subtitle: 'Lashes', description: 'A darker, denser textured finish for those who enjoy defined lashes with an eye-catching wet look.', image: siteImages.services.lashes, price: 150, category: 'Lashes', benefits: ['Darker lash-line definition', 'Textured wet-look finish', 'Professional application'] },
  { id: 'lash-tint', title: 'Lash Tint', subtitle: 'Lashes', description: 'Darken your natural lashes for more definition, especially lighter lash tips. Colour only.', image: siteImages.services.lashes, price: 45, category: 'Lashes', benefits: ['Lash colour and definition', 'No lift or extensions', 'Natural lashes'] },
  { id: 'lash-extension-removal', title: 'Lash Extension Removal', subtitle: 'Lashes', description: 'Professional removal of existing lash extensions with a dedicated remover.', image: siteImages.services.lashes, price: 40, category: 'Lashes', benefits: ['Professional removal', 'Dedicated remover', 'Careful studio service'] },
  { id: 'russian-volume', title: 'Russian Volume Extensions', subtitle: 'Lashes', description: 'Russian Volume eyelash extensions published in Timely.', image: siteImages.services.lashes, duration: '2 hours, 50 mins', category: 'Lashes', benefits: ['Russian volume set', 'Professional application', 'Refills available'] },
  { id: 'dermaplaning', title: 'Dermaplaning', subtitle: 'Skin Treatments', description: 'Gentle exfoliation to remove dead skin cells and fine facial hair. Includes cleansing, assessment, skincare, moisturiser and SPF. Optional LED +A$20.', image: siteImages.services.treatments, price: 140, duration: '55 mins', category: 'Skin', benefits: ['Skin-focused protocol', 'Timely availability', 'Professional studio care'] },
  { id: 'microneedling', title: 'Microneedling', subtitle: 'Skin Treatments', description: 'A personalised skin treatment that encourages natural repair to help improve fine lines, uneven texture and the appearance of acne scars.', image: siteImages.services.treatments, price: 185, duration: '1 hour', category: 'Skin', benefits: ['Skin-focused protocol', 'Consultation-led treatment', 'Official Timely booking'] },
  { id: 'facial-spa', title: 'Facial Spa', subtitle: 'Skin Treatments', description: 'Relaxing facial cleansing, gentle exfoliation, personalised serums, a facial mask and massage movements.', image: siteImages.services.treatments, price: 150, duration: '1 hour, 20 mins', category: 'Skin', benefits: ['Facial care', 'Relaxing treatment', 'Official Timely booking'] },
  { id: 'deluxe-facial', title: 'Deluxe Facial', subtitle: 'Skin Treatments', description: 'A personalised two-hour combination of cleansing, dermaplaning, microneedling, mask and LED light therapy when suitable.', image: siteImages.services.treatments, price: 360, duration: '2 hours', category: 'Skin', benefits: ['Deluxe facial care', 'Consultation-led treatment', 'Official Timely booking'] },
  { id: 'lip-bliss-hydration', title: 'Lip Bliss Hydration', subtitle: 'Skin & Hair Treatments', description: 'A moisturising treatment for dry lips to leave them softer and smoother, without tattoo pigment or injectable volume.', image: siteImages.aboutMe.treatmentRoom, price: 99, category: 'Skin', benefits: ['Hydrating lip care', 'No pigment or injectables', 'Personalised care'] },
  { id: 'grow-up-hair-brows', title: 'Grow Up Hair – Brows', subtitle: 'Skin & Hair Treatments', description: 'Personalised care for sparse or overplucked brows, focused on the natural brow hair and skin underneath.', image: siteImages.aboutMe.treatmentRoom, price: 150, category: 'Skin', benefits: ['Brow hair and skin assessment', 'Personalised care plan', 'Aftercare guidance'] },
  { id: 'grow-up-hair-scalp', title: 'Grow Up Hair – Scalp', subtitle: 'Skin & Hair Treatments', description: 'Individual scalp assessment, targeted care and aftercare guidance for people concerned about thinning hair.', image: siteImages.aboutMe.treatmentRoom, price: 200, category: 'Skin', benefits: ['Individual scalp care', 'Consultation-led plan', 'Aftercare guidance'] },
  { id: 'teeth-whitening', title: 'Teeth Whitening', subtitle: 'Smile Treatments', description: 'Professional teeth whitening appointment listed in the official Bella Beauty Brazil Timely catalogue. Discuss suitability and aftercare with the studio.', image: siteImages.locations.greenslopes, price: 199, duration: '1 hour', category: 'Smile', benefits: ['Published Timely appointment', 'Consultation about suitability', 'Official booking and studio aftercare guidance'] },
  { id: 'waxing', title: 'Brazilian Waxing', subtitle: 'Waxing', description: 'Brazilian waxing published in Timely.', image: siteImages.services.waxing, price: 82, duration: '30 mins', category: 'Waxing', benefits: ['Professional waxing', 'Official Timely booking', 'Aftercare guidance'] },
];

const SERVICE_COPY: Record<string, { pt: string; es: string }> = {
  'cosmetic-tattoo-removal': { pt: 'Remoção não a laser de pigmento de tatuagem cosmética com THink Pigment Remover, mediante avaliação de indicação.', es: 'Eliminación no láser de pigmento de tatuaje cosmético con THink Pigment Remover, previa evaluación.' },
  'male-brow-sculpt': { pt: 'Modelagem masculina para retirar fios fora do desenho, mantendo a aparência natural.', es: 'Diseño de cejas masculinas que elimina pelos sueltos y mantiene la apariencia natural.' },
  'dreamy-brows': { pt: 'Modelagem personalizada com massagem facial relaxante e massagem no couro cabeludo.', es: 'Diseño de cejas personalizado con masaje facial relajante y masaje en el cuero cabelludo.' },
  'lash-lift-only': { pt: 'Curvatura dos cílios naturais, sem tintura ou extensão.', es: 'Elevación de pestañas naturales, sin tinte ni extensiones.' },
  'wet-look-lashes': { pt: 'Extensão de cílios de aparência mais escura, densa e texturizada.', es: 'Extensiones de pestañas con acabado oscuro, denso y texturizado.' },
  'lash-tint': { pt: 'Tintura para dar cor e definição aos cílios naturais, sem lifting.', es: 'Tinte para dar color y definición a las pestañas naturales, sin lifting.' },
  'lash-extension-removal': { pt: 'Remoção profissional de extensões de cílios com produto específico.', es: 'Retirada profesional de extensiones de pestañas con producto específico.' },
  'nano-strokes': { pt: 'Arte semipermanente para sobrancelhas, com fios realistas e naturais.', es: 'Arte semipermanente para cejas, con trazos realistas y naturales.' },
  'shadow-brows': { pt: 'Sombreamento suave com efeito de maquiagem para sobrancelhas, com formato e cor personalizados.', es: 'Sombreado suave de cejas con efecto maquillaje, forma y color personalizados.' },
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
  'lip-bliss-hydration': { pt: 'Hidratação para lábios secos, sem pigmento de tatuagem ou volume injetável.', es: 'Hidratación para labios secos, sin pigmento de tatuaje ni volumen inyectable.' },
  'grow-up-hair-brows': { pt: 'Cuidados personalizados para sobrancelhas ralas ou com falhas, focados nos fios naturais e na pele.', es: 'Cuidado personalizado para cejas escasas, centrado en el pelo natural y la piel.' },
  'grow-up-hair-scalp': { pt: 'Avaliação e cuidados individuais do couro cabeludo, com orientações de cuidados posteriores.', es: 'Evaluación y cuidados personalizados del cuero cabelludo, con orientación de seguimiento.' },
  'teeth-whitening': { pt: 'Clareamento dental profissional publicado no catálogo oficial Timely da Bella Beauty Brazil. Confirme indicação e cuidados com o estúdio.', es: 'Blanqueamiento dental profesional publicado en el catálogo oficial Timely de Bella Beauty Brazil. Consulta la idoneidad y los cuidados con el estudio.' },
  waxing: { pt: 'Serviço profissional de waxing, realizado com cuidado e precisão.', es: 'Servicio profesional de waxing, realizado con cuidado y precisión.' },
};

const SERVICE_BENEFITS: Record<string, { pt: string[]; es: string[] }> = {
  'nano-strokes': { pt: ['Fios de aparência natural', 'Mapeamento personalizado das sobrancelhas', 'Acabamento semipermanente profissional'], es: ['Trazos de apariencia natural', 'Diseño personalizado de cejas', 'Acabado semipermanente profesional'] },
  'shadow-hybrid': { pt: ['Escultura e modelagem', 'Acabamento Hybrid', 'Styling personalizado'], es: ['Esculpido y diseño', 'Acabado Hybrid', 'Styling personalizado'] },
  'lip-blush': { pt: ['Cor natural dos lábios', 'Realce do formato', 'Tratamento orientado por consulta'], es: ['Color natural de labios', 'Realce de la forma', 'Tratamiento guiado por consulta'] },
  'brow-sculpt-tint': { pt: ['Escultura e formato', 'Tintura incluída', 'Orientação de cuidados'], es: ['Esculpido y diseño', 'Tinte incluido', 'Orientación de cuidados'] },
  'brow-lamination': { pt: ['Laminação', 'Formato e tintura', 'Styling personalizado'], es: ['Laminado', 'Diseño y tinte', 'Styling personalizado'] },
  'lash-lift': { pt: ['Elevação e tintura', 'Acabamento prático', 'Consulta para a área dos olhos'], es: ['Lifting y tinte', 'Acabado práctico', 'Consulta para el área de los ojos'] },
  'teeth-whitening': { pt: ['Atendimento publicado no Timely', 'Avaliação da indicação', 'Agendamento e orientações de cuidados oficiais'], es: ['Cita publicada en Timely', 'Consulta de idoneidad', 'Reserva y consejos de cuidado oficiales'] },
  dermaplaning: { pt: ['Protocolo focado na pele', 'Disponibilidade no Timely', 'Cuidado profissional no estúdio'], es: ['Protocolo enfocado en la piel', 'Disponibilidad en Timely', 'Cuidado profesional en el estudio'] },
};

export const getLocalizedService = (service: Service, language: Language): Service => language === 'en' ? service : {
  ...service,
  subtitle: language === 'pt'
    ? ({ 'Cosmetic Tattooing': 'Tatuagem Cosmética', 'Semi-permanent makeup': 'Maquiagem semipermanente', Brows: 'Sobrancelhas', Lashes: 'Cílios', 'Skin Treatments': 'Tratamentos para a pele', 'Smile Treatments': 'Tratamentos para o sorriso', Waxing: 'Waxing' } as Record<string, string>)[service.subtitle || ''] || service.subtitle
    : ({ 'Cosmetic Tattooing': 'Tatuaje Cosmético', 'Semi-permanent makeup': 'Maquillaje semipermanente', Brows: 'Cejas', Lashes: 'Pestañas', 'Skin Treatments': 'Tratamientos para la piel', 'Smile Treatments': 'Tratamientos de sonrisa', Waxing: 'Waxing' } as Record<string, string>)[service.subtitle || ''] || service.subtitle,
  description: SERVICE_COPY[service.id]?.[language] || service.description,
  benefits: SERVICE_BENEFITS[service.id]?.[language] || service.benefits,
};

export const COURSES: Course[] = [
  { id: 'lash-lift-course', title: 'Lash Lift & Tint Course', description: "Learn to lift, curl and tint natural lashes through eight hours of personalised, one-on-one training with Livia. Work with two live models: one for Livia’s demonstration and one for your supervised practice. Covers consultation, lash assessment, shield selection, product application, processing times and aftercare. Includes a take-home professional starter kit, training manual, certificate of completion, all products and disposables used during training, and one year of WhatsApp support. Duration: 8 hours. Format: One-on-one, in person. Dates by arrangement.", duration: '8 hours', price: 999, image: siteImages.services.courses, bookingUrl: BOOKING_URL },
  { id: 'brow-lamination-course', title: 'Brow Lamination, Shape & Tint Course', description: "Learn to reshape, groom and tint natural brow hairs through eight hours of personalised, one-on-one training with Livia. Work with two live models: one for Livia’s demonstration and one for your supervised practice. Covers consultation, brow and hair assessment, mapping and shaping, lamination, tinting, processing times, conditioning care, safety and aftercare. Includes a take-home professional starter kit, training manual, certificate of completion, all products and disposables used during training, and one year of WhatsApp support. Duration: 8 hours. Format: One-on-one, in person. Dates by arrangement.", duration: '8 hours', price: 999, image: siteImages.services.browTreatment, bookingUrl: BOOKING_URL },
  { id: 'nano-strokes-course', title: 'Bella Nano Strokes Course', description: "Manual Cosmetic Tattooing with Tebori. Learn realistic brow hair strokes through three days of one-on-one training. Using a manual tool called Tebori, explore delicate stroke patterns designed to follow the natural movement of eyebrow hair. Covers brow mapping and facial analysis, hair-flow patterns, pigment selection, skin assessment, depth and pressure control, hygiene, consultation and aftercare. Includes synthetic-skin practice, a live demonstration by Livia and a supervised treatment on a model, with individual feedback. Includes a professional starter kit with Tebori tool, disposable blades, pigments, mapping supplies, practice skins and disposables; training manual; certificate of completion; and six months of technical support. Duration: 3 days. Format: One-on-one, in person. Dates arranged individually.", duration: '3 days', price: 4300, image: siteImages.services.microblading, bookingUrl: BOOKING_URL },
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
