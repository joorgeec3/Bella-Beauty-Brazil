import type { Language } from './siteData';

// One exclusive home for every treatment. Keep each treatment and its media
// in exactly one group; deep links to individual treatments remain intact.
export const SERVICE_GROUPS = [
  {
    id: 'cosmetic-tattooing',
    title: { en: 'Cosmetic Tattooing', pt: 'Tatuagem Cosmética', es: 'Tatuaje Cosmético' },
    lead: { en: 'Nano Strokes, Shadow Brows, Lip Blush and tattoo removal.', pt: 'Nano Strokes, Shadow Brows, Lip Blush e remoção de tatuagem.', es: 'Nano Strokes, Shadow Brows, Lip Blush y eliminación de tatuaje.' },
    serviceIds: ['nano-strokes','shadow-brows','lip-blush','cosmetic-tattoo-removal'],
    photoCategory: 'Lips',
  },
  {
    id: 'brow-artistry',
    title: { en: 'Brow Artistry', pt: 'Design de Sobrancelhas', es: 'Diseño de Cejas' },
    lead: { en: 'Brow styling, lamination and personalised Exos Hair care for brows and scalp.', pt: 'Design, laminação e cuidados personalizados Exos Hair para sobrancelhas e couro cabeludo.', es: 'Diseño, laminado y cuidado personalizado Exos Hair para cejas y cuero cabelludo.' },
    serviceIds: ['brow-sculpt','brow-sculpt-tint','shadow-hybrid','brow-lamination','male-brow-sculpt','dreamy-brows','grow-up-hair-brows','grow-up-hair-scalp'],
    photoCategory: 'Brows',
  },
  {
    id: 'lash-treatments',
    title: { en: 'Lash Lift & Tint', pt: 'Lash Lift e Tintura', es: 'Lifting y Tinte de Pestañas' },
    lead: { en: 'Lash lifts and tinting for your natural lashes, with no extensions.', pt: 'Lifting e tintura para os seus cílios naturais, sem extensões.', es: 'Lifting y tinte para tus pestañas naturales, sin extensiones.' },
    serviceIds: ['lash-lift-only','lash-lift','lash-tint'],
    photoCategory: 'Lashes',
  },
  {
    // Lash extensions are a separate service from lash lifts (client request, Nov 2026).
    id: 'lash-extensions',
    title: { en: 'Lash Extensions', pt: 'Extensões de Cílios', es: 'Extensiones de Pestañas' },
    lead: { en: 'Classic, Hybrid and Wet Look lash extensions, infills and removal.', pt: 'Extensões Classic, Hybrid e Wet Look, manutenção e remoção.', es: 'Extensiones Classic, Hybrid y Wet Look, mantenimiento y retirada.' },
    serviceIds: ['classic-eyelashes','hybrid-eyelashes','wet-look-lashes','lash-extension-removal'],
    photoCategory: 'Lashes',
  },
  {
    id: 'skin-treatments',
    title: { en: 'Skin Treatments', pt: 'Tratamentos de Pele', es: 'Tratamientos de Piel' },
    lead: { en: 'Facials, dermaplaning, microneedling and lip hydration.', pt: 'Faciais, dermaplaning, microagulhamento e hidratação labial.', es: 'Faciales, dermaplaning, microneedling e hidratación labial.' },
    serviceIds: ['dermaplaning','microneedling','facial-spa','deluxe-facial','lip-bliss-hydration'],
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

/**
 * Small extra services shown as a simple text line (not a full card) under
 * the main service they belong with — Livia's request, Nov 2026.
 */
export const ADD_ON_LINES: Record<string, string> = {
  'lash-lift': 'lash-tint',
  'classic-eyelashes': 'lash-extension-removal',
  'hybrid-eyelashes': 'lash-extension-removal',
  'wet-look-lashes': 'lash-extension-removal',
};
export const ADD_ON_IDS = new Set(Object.values(ADD_ON_LINES));
export const ADD_ON_NOTES: Record<string, string> = {
  'lash-tint': 'colour for your natural lashes, no lift',
  'lash-extension-removal': 'safe professional removal of lash extensions',
};
