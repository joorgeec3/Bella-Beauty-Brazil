import type { Language } from './siteData';

// One exclusive home for every treatment. Keep each treatment and its media
// in exactly one group; deep links to individual treatments remain intact.
export const SERVICE_GROUPS = [
  {
    id: 'cosmetic-tattooing',
    title: { en: 'Cosmetic Tattooing', pt: 'Tatuagem Cosmética', es: 'Tatuaje Cosmético' },
    lead: { en: 'Nano Strokes, Shadow Brows, Lip Blush and tattoo removal.', pt: 'Nano Strokes, Shadow Brows, Lip Blush e remoção de tatuagem.', es: 'Nano Strokes, Shadow Brows, Lip Blush y eliminación de tatuaje.' },
    serviceIds: ['nano-strokes','shadow-brows','lip-blush','cosmetic-tattoo-removal'],
    photoCategory: 'Brows',
  },
  {
    id: 'brow-artistry',
    title: { en: 'Brow Artistry', pt: 'Design de Sobrancelhas', es: 'Diseño de Cejas' },
    lead: { en: 'Sculpting, tinting, hybrid dye and brow lamination.', pt: 'Design, tintura, coloração híbrida e laminação.', es: 'Diseño, tinte, tinte híbrido y laminado.' },
    serviceIds: ['brow-sculpt','brow-sculpt-tint','shadow-hybrid','brow-lamination','male-brow-sculpt','dreamy-brows'],
    photoCategory: 'Brows',
  },
  {
    id: 'lash-treatments',
    title: { en: 'Lash Treatments', pt: 'Tratamentos de Cílios', es: 'Tratamientos de Pestañas' },
    lead: { en: 'Lash lifts, tinting, extensions and removal.', pt: 'Lifting, tintura, extensões e remoção.', es: 'Lifting, tinte, extensiones y retirada.' },
    serviceIds: ['lash-lift-only','lash-lift','classic-eyelashes','hybrid-eyelashes','wet-look-lashes','lash-tint','lash-extension-removal'],
    photoCategory: 'Lashes',
  },
  {
    id: 'skin-treatments',
    title: { en: 'Skin & Lip Care', pt: 'Pele e Hidratação Labial', es: 'Piel y Cuidado de Labios' },
    lead: { en: 'Facials, dermaplaning, microneedling, lip hydration and hair care.', pt: 'Faciais, dermaplaning, microagulhamento, hidratação labial e cuidados capilares.', es: 'Faciales, dermaplaning, microneedling, hidratación labial y cuidado capilar.' },
    serviceIds: ['dermaplaning','microneedling','facial-spa','deluxe-facial','lip-bliss-hydration','grow-up-hair-brows','grow-up-hair-scalp'],
    photoCategory: 'Skin',
  },
  {
    id: 'teeth-whitening',
    title: { en: 'Teeth Whitening', pt: 'Clareamento Dental', es: 'Blanqueamiento Dental' },
    lead: { en: 'Personalised professional teeth whitening.', pt: 'Clareamento dental profissional personalizado.', es: 'Blanqueamiento dental profesional personalizado.' },
    serviceIds: ['teeth-whitening'],
    photoCategory: 'Whitening',
  },
  {
    id: 'waxing',
    title: { en: 'Waxing', pt: 'Depilação', es: 'Depilación' },
    lead: { en: 'Brazilian, underarm, leg and facial waxing options.', pt: 'Depilação brasileira, axilas, pernas e rosto.', es: 'Depilación brasileña, axilas, piernas y rostro.' },
    serviceIds: ['waxing'],
    photoCategory: 'Waxing',
  },
] as const;

export type ServiceGroupId = typeof SERVICE_GROUPS[number]['id'];
export const getServiceGroup = (id: string) => SERVICE_GROUPS.find(group => group.id === id);
export const groupOfService = (serviceId: string) => SERVICE_GROUPS.find(group => (group.serviceIds as readonly string[]).includes(serviceId));
export const groupName = (id: string, language: Language) => getServiceGroup(id)?.title[language] ?? id;
