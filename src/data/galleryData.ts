/** Real images supplied by the client. Result comparisons stay exclusively in Before & After. */
export type BellaGalleryCategory = 'Brows' | 'Lips' | 'Lashes' | 'Skin' | 'Whitening' | 'Studio' | 'Livia' | 'Waxing';
export type BellaGalleryItem = { id: string; image: string; category: BellaGalleryCategory; kind: 'result' | 'studio' | 'livia' | 'editorial'; alt: string; serviceName?: string };

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
  'brow-styling.webp',
  'brow-tools.webp',
  'lip-blush-procedure.webp',
  'lip-blush-palette.webp',
  'lip-blush-photography.webp',
  'waxing-treatment.webp',
  'about-livia-02.webp',
  'about-livia-03.webp',
  'salon-brand-wall.webp',
  'salon-details.webp',
  'salon-consultation.webp',
  'salon-client-experience.webp',
  'salon-celebration.webp',
]);
// Media from the client's categorised archive: 43 distinct original photographs.
// Keep one photo in one service folder; do not clone photos to fill unrelated services.
const newPhotoFolders: { slug: string; name: string; category: BellaGalleryCategory; count: number }[] = [
  { slug: 'brow-sculpt', name: 'Brow Sculpt', category: 'Brows', count: 7 },
  { slug: 'brow-sculpt-tint', name: 'Brow Sculpt & Tint', category: 'Brows', count: 2 },
  { slug: 'male-brow-sculpt', name: 'Male Brow Sculpt', category: 'Brows', count: 1 },
  { slug: 'shadow-brows', name: 'Shadow Brows', category: 'Brows', count: 5 },
  { slug: 'brow-lamination', name: 'Brow Lamination & Lash Lift', category: 'Brows', count: 3 },
  { slug: 'lash-lift', name: 'Lash Lift & Tint', category: 'Lashes', count: 9 },
  { slug: 'lip-blush', name: 'Lip Blush', category: 'Lips', count: 6 },
  { slug: 'lip-bliss-hydration', name: 'Lip Hydration', category: 'Lips', count: 3 },
  { slug: 'dermaplaning', name: 'Dermaplaning', category: 'Skin', count: 2 },
  { slug: 'facial-spa', name: 'Facial Spa', category: 'Skin', count: 2 },
  { slug: 'teeth-whitening', name: 'Teeth Whitening', category: 'Whitening', count: 3 },
];
const mediaRoot = '/assets/bella/client-2026-10-v2';
// Captions and filters reviewed against the actual 43 published images,
// not inferred from the archive folder name. Folder names were frequently wrong.
// Labels only describe visible content; no unverified procedure is claimed.
const verifiedPhotoDescriptions: Record<string, [BellaGalleryCategory, string, string][]> = {
  "brow-sculpt": [
    [
      "Lashes",
      "Natural Lashes",
      "Close-up of a blue eye with long curled eyelashes and a softly defined eyebrow"
    ],
    [
      "Brows",
      "Brow Portrait",
      "Client portrait showing softly groomed eyebrows"
    ],
    [
      "Brows",
      "Brow Comparison",
      "Two side-by-side portraits showing a client's brows and eye area"
    ],
    [
      "Lashes",
      "Lash Detail",
      "Side-by-side close-ups of an eye showing lash curl and the eyebrow"
    ],
    [
      "Lashes",
      "Lash Comparison",
      "Upper and lower photos comparing the eyes, eyelashes and eyebrows"
    ],
    [
      "Brows",
      "Brow Comparison",
      "Two close-up portraits showing the appearance of defined eyebrows"
    ],
    [
      "Lips",
      "Lip Close-Up",
      "Close-up side profile of a client's pink, glossy lips"
    ]
  ],
  "brow-sculpt-tint": [
    [
      "Brows",
      "Brow Comparison",
      "Upper and lower photographs comparing eyebrow shape and definition on the same face"
    ],
    [
      "Brows",
      "Brow Detail",
      "Close-up of a shaped eyebrow and natural lashes beside a brown eye"
    ]
  ],
  "male-brow-sculpt": [
    [
      "Lashes",
      "Lash Comparison",
      "Two close-up views of grey-blue eyes showing a difference in lash curl and length"
    ]
  ],
  "shadow-brows": [
    [
      "Brows",
      "Defined Brows",
      "Client portrait showing strong, dark eyebrows"
    ],
    [
      "Brows",
      "Brow Portrait",
      "Portrait of a client with curly hair and naturally defined eyebrows"
    ],
    [
      "Brows",
      "Men's Brows",
      "Close-up portrait of a man highlighting the eyebrow and eye area"
    ],
    [
      "Brows",
      "Brow Comparison",
      "Side-by-side close-ups showing the eyebrows and eye area from two views"
    ],
    [
      "Brows",
      "Brow Comparison",
      "Two side-by-side portraits showing differences in brow shape and definition"
    ]
  ],
  "brow-lamination": [
    [
      "Brows",
      "Brow Portrait",
      "Angled portrait showing a client's eyebrows and eyes"
    ],
    [
      "Brows",
      "Brow Shaping Process",
      "Three stacked photographs showing eyebrow outlines and their finished appearance"
    ],
    [
      "Whitening",
      "Teeth Whitening Session",
      "A client wearing protective glasses beneath a pink-lit teeth-whitening lamp"
    ]
  ],
  "lash-lift": [
    [
      "Brows",
      "Brow Portrait",
      "Close-up portrait of a client lying down with styled eyebrows"
    ],
    [
      "Lips",
      "Lip Blush Comparison",
      "Two close-up lip photographs labelled Lip Blushing, showing different lip tones"
    ],
    [
      "Lips",
      "Lip Colour Portrait",
      "Client portrait with glossy rosy lips"
    ],
    [
      "Lips",
      "Lip Close-Up",
      "Close-up of naturally textured lips with a glossy finish"
    ],
    [
      "Lips",
      "Lip Colour Comparison",
      "Side-by-side close-ups comparing pale lips with a brighter pink lip colour"
    ],
    [
      "Lips",
      "Lip Colour Comparison",
      "Side-by-side close-ups of lips showing differences in colour and definition"
    ],
    [
      "Lips",
      "Lip Treatment in Progress",
      "A beauty professional using a handheld cosmetic device on a client's lips"
    ],
    [
      "Lips",
      "Lip Treatment Tools",
      "Cosmetic lip-treatment supplies and colour products arranged on a metal tray"
    ],
    [
      "Lips",
      "Lip Treatment Collage",
      "A collage showing a lip procedure and close-ups of the lips"
    ]
  ],
  "lip-blush": [
    [
      "Whitening",
      "Smile Comparison",
      "Two close-up photographs of a smile showing lips and teeth"
    ],
    [
      "Whitening",
      "Teeth Comparison",
      "Four close-up images of a smile showing the teeth from different angles"
    ],
    [
      "Waxing",
      "Facial Hair Removal",
      "A professional wearing black gloves applies a product above a client's upper lip"
    ],
    [
      "Skin",
      "Dermaplaning",
      "A professional carrying out a facial treatment with a flat blade near the cheek"
    ],
    [
      "Skin",
      "Dermaplaning Close-Up",
      "A gloved professional using a small flat blade on the side of a client's nose"
    ],
    [
      "Skin",
      "Facial Treatment",
      "A three-part collage showing cleansing and treatment of a client's face"
    ]
  ],
  "lip-bliss-hydration": [
    [
      "Brows",
      "Brow Comparison",
      "Side-by-side images of closed eyes showing changes in eyebrow shape and density"
    ],
    [
      "Brows",
      "Brow Comparison",
      "Two photographs of closed eyes showing styled eyebrow arches"
    ],
    [
      "Brows",
      "Brow Detail",
      "Paired close-up photographs of closed eyes and defined eyebrows"
    ]
  ],
  "dermaplaning": [
    [
      "Brows",
      "Brow Comparison",
      "Side-by-side client portraits highlighting differences in eyebrow definition"
    ],
    [
      "Lashes",
      "Eye and Brow Comparison",
      "Side-by-side eye close-ups highlighting lashes and eyebrow definition"
    ]
  ],
  "facial-spa": [
    [
      "Brows",
      "Brow Close-Up",
      "Detailed close-up of a brushed and styled eyebrow beside an eye"
    ],
    [
      "Lashes",
      "Lash Comparison",
      "Two stacked close-up photographs of the same client's eyes and eyelashes"
    ]
  ],
  "teeth-whitening": [
    [
      "Brows",
      "Brow Portrait",
      "Client portrait highlighting the eyebrows and eyes after a beauty appointment"
    ],
    [
      "Brows",
      "Brow Portrait",
      "Front-facing portrait of a client with shaped eyebrows"
    ],
    [
      "Brows",
      "Natural Brow Detail",
      "Close-up of a softly groomed eyebrow above a light-coloured eye"
    ]
  ]
};

const photoGroups = newPhotoFolders.map(({ slug, count }) => {
  const descriptions = verifiedPhotoDescriptions[slug];
  if (!descriptions || descriptions.length !== count) {
    throw new Error(`Gallery metadata missing for ${slug}`);
  }
  return descriptions.map(([category, label, alt], index) => ({
    id: `new-${slug}-${index + 1}`,
    image: `${mediaRoot}/${slug}/${slug}-${String(index + 1).padStart(2, '0')}.webp`,
    category,
    kind: 'editorial' as const,
    alt,
    serviceName: label,
  }));
});

// Rotate verified categories rather than showing a long sequence of one type.
// All original image paths are preserved; only the correct metadata and order change.
const orderedCategories: BellaGalleryCategory[] = ['Brows', 'Lashes', 'Lips', 'Skin', 'Whitening', 'Waxing'];
const allVerifiedPhotos = photoGroups.flat();
const photosInOrder = Array.from(
  { length: Math.max(...orderedCategories.map(category => allVerifiedPhotos.filter(photo => photo.category === category).length)) },
  (_, index) => orderedCategories.flatMap(category => {
    const photo = allVerifiedPhotos.filter(item => item.category === category)[index];
    return photo ? [photo] : [];
  })
).flat();

export const newBellaServiceGallery: BellaGalleryItem[] = photosInOrder.map(item => withSiteBase(item));

// Keep two verified studio photographs in the main gallery so the dedicated
// salon-gallery section can be removed without losing all studio imagery.
const featuredStudioPhotos = new Set(['salon-brand-wall.webp', 'salon-client-experience.webp']);
// Livia's photo with her waxing workstation belongs to the studio story,
// not to the Waxing treatment results.
// Client-selected waxing illustrations: underarms first, then legs and face.
// These pictures illustrate waxing only; they are not presented as salon results.
export const newWaxingGallery: BellaGalleryItem[] = [
  { id:'waxing-underarms-2026', image:'/assets/bella/waxing-2026-10/underarms.webp', category:'Waxing', kind:'editorial', alt:'Illustrative photograph of waxing on an underarm', serviceName:'Underarm Waxing' },
  { id:'waxing-legs-2026', image:'/assets/bella/waxing-2026-10/legs.webp', category:'Waxing', kind:'editorial', alt:'Illustrative photograph of a waxing strip applied to a leg', serviceName:'Leg Waxing' },
  { id:'waxing-face-2026', image:'/assets/bella/waxing-2026-10/face.webp', category:'Waxing', kind:'editorial', alt:'Illustrative photograph of warm wax being applied to the face', serviceName:'Facial Waxing' },
].map(withSiteBase);

export const homeGallery = uniqueImages([
  withSiteBase({
    id: 'livia-waxing-preparation',
    image: '/assets/bella/client-2026-10/waxing-treatment.webp',
    category: 'Livia',
    kind: 'livia',
    alt: 'Livia Rego holding a waxing spatula beside her professional wax heater',
    serviceName: 'Meet Livia',
  }),
  ...newWaxingGallery,
  ...newBellaServiceGallery,
  ...bellaGallery.filter(({ image }) => {
    const fileName = image.split('/').pop() || '';
    // The portrait at the wax heater belongs only in Meet Livia, not Waxing.
    if (fileName === 'waxing-treatment.webp') return false;
    return featuredStudioPhotos.has(fileName) || !homepageFeaturedImageNames.has(fileName);
  }),
]);

export type BellaGalleryVideo = { id: string; src: string; category: BellaGalleryCategory; serviceName: string };
const newVideoFolders: { slug: string; name: string; category: BellaGalleryCategory; count: number }[] = [
  { slug: 'brow-sculpt', name: 'Brow Sculpt', category: 'Brows', count: 2 },
  { slug: 'brow-lamination', name: 'Brow Lamination & Lash Lift', category: 'Brows', count: 5 },
  { slug: 'dreamy-brows', name: 'Dreamy Brows — Massage', category: 'Brows', count: 1 },
  { slug: 'shadow-brows', name: 'Shadow Brows', category: 'Brows', count: 1 },
  { slug: 'dermaplaning', name: 'Dermaplaning', category: 'Skin', count: 1 },
  { slug: 'facial-spa', name: 'Facial Spa', category: 'Skin', count: 2 },
  { slug: 'lip-blush', name: 'Lip Blush', category: 'Lips', count: 1 },
  { slug: 'lip-bliss-hydration', name: 'Lip Hydration', category: 'Lips', count: 1 },
  { slug: 'teeth-whitening', name: 'Teeth Whitening', category: 'Whitening', count: 1 },
];
export const galleryVideos: BellaGalleryVideo[] = newVideoFolders.flatMap(({ slug, name, category, count }) =>
  Array.from({ length: count }, (_, index) => ({
    id: `gallery-video-${slug}-${index + 1}`,
    src: `${import.meta.env.BASE_URL}assets/bella/client-2026-10-v2/${slug}/${slug}-video-${String(index + 1).padStart(2, '0')}.mp4`,
    category,
    serviceName: name,
  }))
);

// The featured lash-lift comparison appears above; the other results remain available without repetition.
export const bellaBeforeAfter = uniqueImages(clientGallery.filter((item) =>
  item.kind === 'result' && !item.image.endsWith('/lashes-result-05.webp') && !item.image.endsWith('/lips-result-01.webp')
));
