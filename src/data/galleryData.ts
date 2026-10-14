/** Real images supplied by the client. Result comparisons stay exclusively in Before & After. */
export type BellaGalleryCategory = 'Brows' | 'Lips' | 'Lashes' | 'Skin' | 'Studio' | 'Livia';
export type BellaGalleryItem = { id: string; image: string; category: BellaGalleryCategory; kind: 'result' | 'studio' | 'livia' | 'editorial'; alt: string };

const withSiteBase = (item: BellaGalleryItem): BellaGalleryItem => ({
  ...item,
  image: item.image.startsWith('/assets/') ? `${import.meta.env.BASE_URL}${item.image.slice(1)}` : item.image,
});

export const clientGallery: BellaGalleryItem[] = [
  { id: 'lashes-result-01', image: '/assets/bella/gallery/lashes-result-01.webp', category: 'Lashes', kind: 'result', alt: 'Eyelash treatment comparison showing eyes before and after' },
  { id: 'lashes-result-02', image: '/assets/bella/gallery/lashes-result-02.webp', category: 'Lashes', kind: 'result', alt: 'Close-up eyelash treatment comparison' },
  { id: 'lashes-result-03', image: '/assets/bella/gallery/lashes-result-03.webp', category: 'Lashes', kind: 'result', alt: 'Eyelash and eyebrow styling results in comparison photos' },
  { id: 'lips-result-01', image: '/assets/bella/gallery/lips-result-01.webp', category: 'Lips', kind: 'result', alt: 'Lip treatment comparison in natural light' },
  { id: 'brows-result-01', image: '/assets/bella/gallery/brows-result-01.webp', category: 'Brows', kind: 'result', alt: 'Facial and brow styling comparison in two images' },
  { id: 'brows-result-02', image: '/assets/bella/gallery/brows-result-02.webp', category: 'Brows', kind: 'result', alt: 'Close-up eyebrow treatment comparison' },
  { id: 'brows-result-03', image: '/assets/bella/gallery/brows-result-03.webp', category: 'Brows', kind: 'result', alt: 'Eyebrow treatment result shown above and below' },
  { id: 'brows-result-04', image: '/assets/bella/gallery/brows-result-04.webp', category: 'Brows', kind: 'result', alt: 'Brow styling results comparison' },
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

export const bellaGallery: BellaGalleryItem[] = uniqueImages([
  { id: 'brows-editorial', image: '/assets/bella/brows.png', category: 'Brows', kind: 'editorial', alt: 'Bella Beauty Brazil individual brow treatment' },
  { id: 'lips-editorial', image: '/assets/bella/cosmetic-tattooing.png', category: 'Lips', kind: 'editorial', alt: 'Bella Beauty Brazil individual lip cosmetic tattooing treatment' },
  { id: 'lashes-editorial', image: '/assets/bella/lashes.jpg', category: 'Lashes', kind: 'editorial', alt: 'Bella Beauty Brazil individual eyelash treatment' },
  { id: 'skin-editorial', image: '/assets/bella/treatments.png', category: 'Skin', kind: 'editorial', alt: 'Bella Beauty Brazil individual skin treatment preparation' },
  // Keep the brow appointment photograph for Brow Artistry, not repeated in the gallery.
  ...clientGallery.filter((item) => item.kind === 'livia' && !['livia-portrait-01', 'livia-portrait-02'].includes(item.id)),
  { id: 'studio-interior-01', image: '/assets/bella/gallery/studio-treatment-room.webp', category: 'Studio', kind: 'studio', alt: 'Bella Beauty Brazil treatment room with bed and brand wall' },
  { id: 'studio-interior-02', image: '/assets/bella/gallery/studio-mirror-area.webp', category: 'Studio', kind: 'studio', alt: 'Bella Beauty Brazil studio mirror and beauty display shelves' },
].map((item) => withSiteBase(item as BellaGalleryItem)));

export const bellaBeforeAfter = uniqueImages(clientGallery.filter((item) => item.kind === 'result'));
