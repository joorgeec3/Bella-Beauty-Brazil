/** Real images supplied by the client. Result comparisons stay exclusively in Before & After. */
export type BellaGalleryCategory = 'Brows' | 'Lips' | 'Lashes' | 'Skin' | 'Studio' | 'Livia' | 'Waxing';
export type BellaGalleryItem = { id: string; image: string; category: BellaGalleryCategory; kind: 'result' | 'studio' | 'livia' | 'editorial'; alt: string };

const withSiteBase = (item: BellaGalleryItem): BellaGalleryItem => ({
  ...item,
  image: item.image.startsWith('/assets/') ? `${import.meta.env.BASE_URL}${item.image.slice(1)}` : item.image,
});

export const clientGallery: BellaGalleryItem[] = [
  { id: 'lashes-result-01', image: '/assets/bella/gallery/lashes-result-01.webp', category: 'Lashes', kind: 'result', alt: 'Eyelash treatment comparison showing eyes before and after' },
  { id: 'lashes-result-03', image: '/assets/bella/gallery/lashes-result-03.webp', category: 'Brows', kind: 'result', alt: 'Eyebrow styling before-and-after comparison' },
  { id: 'lips-result-01', image: '/assets/bella/gallery/lips-result-01.webp', category: 'Lips', kind: 'result', alt: 'Lip treatment comparison in natural light' },
  { id: 'brows-result-01', image: '/assets/bella/gallery/brows-result-01.webp', category: 'Brows', kind: 'result', alt: 'Facial and brow styling comparison in two images' },
  { id: 'brows-result-02', image: '/assets/bella/gallery/brows-result-02.webp', category: 'Brows', kind: 'result', alt: 'Close-up eyebrow treatment comparison' },
  { id: 'brows-result-03', image: '/assets/bella/gallery/brows-result-03.webp', category: 'Brows', kind: 'result', alt: 'Eyebrow treatment result shown above and below' },
  { id: 'lashes-result-04', image: '/assets/bella/gallery/lashes-result-04.webp', category: 'Lashes', kind: 'result', alt: 'Eyelash styling close-up comparison' },
  { id: 'brows-result-05', image: '/assets/bella/gallery/brows-result-05.webp', category: 'Brows', kind: 'result', alt: 'Brow design comparison photographed from two angles' },
  { id: 'lips-result-02', image: '/assets/bella/gallery/lips-result-02.webp', category: 'Lips', kind: 'result', alt: 'Lip blush service comparison' },
  { id: 'lashes-result-05', image: '/assets/bella/gallery/lashes-result-05.webp', category: 'Lashes', kind: 'result', alt: 'Lash lift results in two images' },
  { id: 'lashes-result-06', image: '/assets/bella/gallery/lashes-result-06.webp', category: 'Lashes', kind: 'result', alt: 'Lash lift close-up comparison photographed from the front' },
  { id: 'studio-behind-scenes-01', image: '/assets/bella/gallery/studio-behind-scenes-01.webp', category: 'Brows', kind: 'editorial', alt: 'Livia Rego styling brows during a beauty appointment' },
  { id: 'studio-behind-scenes-02', image: '/assets/bella/gallery/studio-behind-scenes-02.webp', category: 'Livia', kind: 'livia', alt: 'Livia Rego preparing beauty content' },
  { id: 'livia-portrait-01', image: '/assets/bella/gallery/livia-portrait-01.webp', category: 'Livia', kind: 'livia', alt: 'Livia Rego seated on a sofa' },
  { id: 'livia-portrait-02', image: '/assets/bella/gallery/livia-portrait-02.webp', category: 'Livia', kind: 'livia', alt: 'Livia Rego portrait in a pink blazer' },
  { id: 'livia-portrait-03', image: '/assets/bella/gallery/livia-portrait-03.webp', category: 'Livia', kind: 'livia', alt: 'Livia Rego at a laptop in a workplace' },
  { id: 'livia-portrait-04', image: '/assets/bella/gallery/livia-portrait-04.webp', category: 'Livia', kind: 'livia', alt: 'Livia Rego portrait in a pink blazer' },
].map((item) => withSiteBase(item as BellaGalleryItem));

const uniqueImages = (items: BellaGalleryItem[]) => items.filter((item, index) => items.findIndex((candidate) => candidate.image === item.image) === index);

/** Only the 17 newest original photos supplied by the client appear in the main gallery.
 * Previously received comparison images remain exclusively in Before & After.
 * No editorial image is labelled as a treatment result.
 */
export const bellaGallery: BellaGalleryItem[] = uniqueImages([
  { id: 'brow-tools-2026', image: '/assets/bella/client-2026-10/brow-tools.webp', category: 'Brows', kind: 'editorial', alt: 'Professional brow tools at Bella Beauty Brazil' },
  { id: 'brow-styling-2026', image: '/assets/bella/client-2026-10/brow-styling.webp', category: 'Brows', kind: 'editorial', alt: 'Livia working on brows at Bella Beauty Brazil' },
  { id: 'nano-procedure-2026', image: '/assets/bella/client-2026-10/nano-strokes-procedure.webp', category: 'Brows', kind: 'editorial', alt: 'Actual Nano Strokes procedure at Bella Beauty Brazil' },
  { id: 'lip-procedure-2026', image: '/assets/bella/client-2026-10/lip-blush-procedure.webp', category: 'Lips', kind: 'editorial', alt: 'Actual Lip Blush procedure at Bella Beauty Brazil' },
  { id: 'lip-palette-2026', image: '/assets/bella/client-2026-10/lip-blush-palette.webp', category: 'Lips', kind: 'editorial', alt: 'Lip Blush pigment palette at the studio' },
  { id: 'lip-photography-2026', image: '/assets/bella/client-2026-10/lip-blush-photography.webp', category: 'Lips', kind: 'editorial', alt: 'Lip Blush appointment photographed at the studio' },
  { id: 'waxing-2026', image: '/assets/bella/client-2026-10/waxing-treatment.webp', category: 'Waxing', kind: 'editorial', alt: 'Waxing procedure with Livia' },
  { id: 'livia01-2026', image: '/assets/bella/client-2026-10/about-livia-01.webp', category: 'Livia', kind: 'livia', alt: 'Livia Rego in a pink blazer' },
  { id: 'livia02-2026', image: '/assets/bella/client-2026-10/about-livia-02.webp', category: 'Livia', kind: 'livia', alt: 'Livia Rego, founder of Bella Beauty Brazil' },
  { id: 'livia03-2026', image: '/assets/bella/client-2026-10/about-livia-03.webp', category: 'Livia', kind: 'livia', alt: 'Livia Rego portrait' },
  { id: 'salon-brand-wall-2026', image: '/assets/bella/client-2026-10/salon-brand-wall.webp', category: 'Studio', kind: 'studio', alt: 'Bella Beauty Brazil salon brand wall' },
  { id: 'salon-details-2026', image: '/assets/bella/client-2026-10/salon-details.webp', category: 'Studio', kind: 'studio', alt: 'Salon beauty products and atmosphere' },
  { id: 'salon-consultation-2026', image: '/assets/bella/client-2026-10/salon-consultation.webp', category: 'Studio', kind: 'studio', alt: 'Consultation at Bella Beauty Brazil' },
  { id: 'salon-client-experience-2026', image: '/assets/bella/client-2026-10/salon-client-experience.webp', category: 'Studio', kind: 'studio', alt: 'Inside a studio appointment' },
  { id: 'salon-celebration-2026', image: '/assets/bella/client-2026-10/salon-celebration.webp', category: 'Studio', kind: 'studio', alt: 'Bella Beauty Brazil welcoming salon experience' },
].map((item) => withSiteBase(item as BellaGalleryItem)));

/** The homepage should not show the same photos again in Services, Meet Livia or Salon.
 * All original files remain available through the underlying sections and service detail routes.
 */
const homepageFeaturedImageNames = new Set([
  'nano-strokes-procedure.webp',
  'lip-blush-procedure.webp',
  'waxing-treatment.webp',
  'about-livia-02.webp',
  'salon-brand-wall.webp',
  'salon-details.webp',
  'salon-consultation.webp',
  'salon-client-experience.webp',
  'salon-celebration.webp',
]);
export const homeGallery = bellaGallery.filter(({ image }) => !homepageFeaturedImageNames.has(image.split('/').pop() || ''));

// The featured lash-lift comparison appears above; the other results remain available without repetition.
export const bellaBeforeAfter = uniqueImages(clientGallery.filter((item) =>
  item.kind === 'result' && !item.image.endsWith('/lashes-result-05.webp')
));
