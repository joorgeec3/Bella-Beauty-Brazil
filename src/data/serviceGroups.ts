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
    title: { en: 'Lash Treatments', pt: 'Tratamentos de Cílios', es: 'Tratamientos de Pestañas' },
    lead: { en: 'Lash lifts, tinting, extensions and removal.', pt: 'Lifting, tintura, extensões e remoção.', es: 'Lifting, tinte, extensiones y retirada.' },
    serviceIds: ['lash-lift-only','lash-lift','classic-eyelashes','hybrid-eyelashes','wet-look-lashes','lash-tint','lash-extension-removal'],
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
