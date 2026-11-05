import { siteImages } from './siteImages';
// Sources: Site Bella.zip and the client's later "fotos site bella.rar".
 // RAR review (2026-10-22) explicitly identifies the previously generic lip
 // photos as Lip Hydration and the facial folder as Facial/Dermaplaning.
 // Keep all previously verified, correctly assigned treatment collections intact.
 // Do not copy assets, fabricate results, or reuse a photo in multiple services.
export type TreatmentPhoto = { src: string; alt: string; caption: string };
export type TreatmentGallery = { photos: TreatmentPhoto[]; illustrative: boolean };
const root = `${import.meta.env?.BASE_URL || '/'}assets/bella/media-alinhada-2026-10`;
const collection = (folder: string, count: number, title: string): TreatmentPhoto[] =>
  Array.from({length:count}, (_,i)=>({
    src: `${root}/${folder}/${String(i+1).padStart(2,'0')}.webp`,
    alt: `${title} — Bella Beauty Brazil, photo ${i+1}`,
    caption: `${title} · ${i+1} / ${count}`,
  }));

export const PHOTO_FOLDERS = {
  'nano-strokes': collection('nano-strokes',10,'Microblading – Nano Strokes'),
  'shadow-brows': collection('shadow-brows',7,'Shadow Brows'),
  'lip-blush': collection('lip-blush',14,'Lip Blush'),
  'cosmetic-tattoo-removal': collection('cosmetic-tattoo-removal',2,'Cosmetic Tattoo Removal'),
  'brow-sculpt': collection('brow-sculpt',7,'Brow Sculpt'),
  'brow-tint': collection('brow-tint',3,'Brow Tint'),
  'brow-dye': collection('brow-dye',6,'Brow Dye'),
  'brow-lamination': collection('brow-lamination',7,'Brow Lamination'),
  'lash-lift': collection('lash-lift',8,'Lash Lift'),
  'lash-extensions': collection('lash-extensions',3,'Lash Extensions (style not specified)'),
  'teeth-whitening': collection('teeth-whitening',3,'Teeth Whitening'),
  'skin-treatments-geral': collection('skin-treatments-geral',3,'Skin Treatments (general)'),
  'lip-treatments-geral': collection('lip-treatments-geral',3,'Lip Treatments (general)'),
} as const;

const exactFolderByService: Record<string, keyof typeof PHOTO_FOLDERS> = {
  'nano-strokes':'nano-strokes',
  'shadow-brows':'shadow-brows',
  'lip-blush':'lip-blush',
  'cosmetic-tattoo-removal':'cosmetic-tattoo-removal',
  'brow-sculpt':'brow-sculpt',
  'brow-sculpt-tint':'brow-tint',
  'shadow-hybrid':'brow-dye',
  'brow-lamination':'brow-lamination',
  'lash-lift':'lash-lift',
  'teeth-whitening':'teeth-whitening',
};
// The studio confirmed the six supplied Brow Dye photos are correctly assigned.
const dyeReferencePhotos: TreatmentPhoto[] = PHOTO_FOLDERS['brow-dye'].map((photo, i) => ({
  ...photo,
  alt: `Brow Sculpt & Hybrid Dye — Bella Beauty Brazil photograph ${i + 1}`,
  caption: `Brow Sculpt & Hybrid Dye · ${i + 1} / ${PHOTO_FOLDERS['brow-dye'].length}`,
}));
// Photos in the generic Lash Extensions folder are not verified as Classic,
// Hybrid or Wet Look. Avoid assigning them to a specific technique until
// Bella Beauty Brazil confirms which exact service each image shows.
const labelledPhotos = (photos: TreatmentPhoto[], treatment: string): TreatmentPhoto[] =>
  photos.map((photo, index) => ({
    ...photo,
    alt: `${treatment} — real Bella Beauty Brazil photograph ${index + 1}`,
    caption: `${treatment} · ${index + 1} / ${photos.length}`,
  }));
const newerFolderLabels: Record<string,TreatmentPhoto[]> = {
  // Original user-provided photographs for the Exos Hair Brows page.
  // They show eyebrow detail and a studio brow-care session. Do not
  // describe the 3-panel photo as proof of Exos regrowth or efficacy.
  'grow-up-hair-brows': [
    {
      src: `${import.meta.env?.BASE_URL || '/'}assets/bella/exos-hair-brows-2026-11/exos-hair-brows-results.webp`,
      alt: 'Exos Hair Brows — three close-up photos of the same natural eyebrow',
      caption: 'Exos Hair Brows · Brow progress',
    },
  ],

  // Original untouched client photo. Side-by-side comparison is descriptive
  // only; do not imply that the Exos Hair Scalp service caused regrowth.
  'grow-up-hair-scalp': [
    {
      src: `${import.meta.env?.BASE_URL || '/'}assets/bella/exos-hair-scalp/IMG_3674.PNG`,
      alt: 'Two side-by-side scalp photographs supplied by Bella Beauty Brazil',
      caption: 'Exos Hair Scalp · Scalp photography supplied by the studio',
    },
  ],
  // Client-provided Classic set: one lash close-up plus two honest
  // behind-the-scenes studio photographs. Original PNG bytes are unchanged.
  'classic-eyelashes': [
    {
      src: `${import.meta.env?.BASE_URL || '/'}assets/bella/classic-eyelash-extensions/IMG_3669.PNG`,
      alt: 'Classic Eyelash Extensions — close-up of the lashes at Bella Beauty Brazil',
      caption: 'Classic Eyelash Extensions · Lash close-up',
    },
  ],
  // Client-supplied Hybrid Eyelash Extensions photos, labelled by the studio.
  // The collage shows a before-and-after comparison; the other is a result portrait.
  'hybrid-eyelashes': [
    {
      src: `${import.meta.env?.BASE_URL || '/'}assets/bella/hybrid-eyelash-extensions/hybrid-before-after.webp`,
      alt: 'Hybrid lash extensions before and after — Bella Beauty Brazil',
      caption: 'Hybrid Eyelash Extensions · Before & after',
    },
    {
      src: `${import.meta.env?.BASE_URL || '/'}assets/bella/hybrid-eyelash-extensions/hybrid-result.webp`,
      alt: 'Hybrid lash extensions result close-up — Bella Beauty Brazil',
      caption: 'Hybrid Eyelash Extensions · Client result',
    },
  ],
  // The client supplied the original (unaltered) JPEG for Wet Look Lash Extensions.
  // The companion iPhone Live Photo MOV is not needed as a second, duplicate clip.
  'wet-look-lashes': [
    {
      src: `${import.meta.env?.BASE_URL || '/'}assets/bella/wet-eyelash-extensions/IMG_9777.JPEG`,
      alt: 'Wet Look Lash Extensions — original photograph from Bella Beauty Brazil',
      caption: 'Wet Look Lash Extensions · Original client photograph',
    },
    {
      src: `${import.meta.env?.BASE_URL || '/'}assets/bella/wet-eyelash-extensions/IMG_3675.PNG`,
      alt: 'Wet Look Lash Extensions — original close-up photograph from Bella Beauty Brazil',
      caption: 'Wet Look Lash Extensions · Additional original photograph',
    },
  ],
  // The new RAR explicitly names "Lip Hydration treatment"; only rename
  // captions here. Source images are unchanged, not copied or repeated.
  'lip-bliss-hydration': labelledPhotos(PHOTO_FOLDERS['lip-treatments-geral'], 'Lip Bliss Hydration'),
  // The RAR labels this folder Facial/Dermaplaning; individual source photos
  // were visually checked before assigning the procedure-specific ones.
  'dermaplaning': labelledPhotos(PHOTO_FOLDERS['skin-treatments-geral'].slice(1, 3), 'Dermaplaning'),
  'facial-spa': labelledPhotos([PHOTO_FOLDERS['skin-treatments-geral'][0]], 'Facial Spa'),
  // This real screenshot is from the uniquely labelled DREAM BROW massage video,
  // not a generic Brow Sculpt photo and not a cosmetic tattoo result.
  'male-brow-sculpt': labelledPhotos([PHOTO_FOLDERS['brow-sculpt'][6]], 'Male Brow Sculpt'),
  'dreamy-brows': [{
    src: `${import.meta.env?.BASE_URL || '/'}assets/bella/media-rar-review-2026-10/dreamy-brows-cover.webp`,
    alt: 'Dreamy Brows head and face massage — still from the client-supplied Dream Brow video',
    caption: 'Dreamy Brows · Treatment demonstration',
  }],
};
// The photo of Livia with wax equipment is in the homepage/founder gallery.
// The new axilla photograph was provided separately in attachments.zip.
// It is an illustrative waxing photo, not a verified before/after client result.
const supplementary: Record<string,TreatmentPhoto[]> = {
  // Verified category-level photography: not attributed to a particular
  // extension style or a particular Microneedling/Deluxe Facial outcome.
  ...Object.fromEntries(
    ['classic-eyelashes', 'hybrid-eyelashes', 'wet-look-lashes', 'lash-extension-removal'].map((id) => [
      id, PHOTO_FOLDERS['lash-extensions'].map((photo, i) => ({
        ...photo, alt: 'Lash extensions studio photograph ' + (i + 1),
        caption: 'Bella Beauty Brazil · Lash Extensions',
      })),
    ])
  ),
  ...Object.fromEntries(
    ['microneedling', 'deluxe-facial'].map((id) => [
      id, PHOTO_FOLDERS['skin-treatments-geral'].map((photo, i) => ({
        ...photo, alt: 'Skin treatment studio photograph ' + (i + 1),
        caption: 'Bella Beauty Brazil · Skin Treatments',
      })),
    ])
  ),
  waxing: [
    { src: siteImages.waxingPhotos.underarms, alt: 'Waxing applied to an underarm', caption: 'Underarm waxing · illustrative photograph' },
    { src: siteImages.waxingPhotos.legs, alt: 'Waxing strip being applied to a leg', caption: 'Leg waxing · illustrative photograph' },
    { src: siteImages.waxingPhotos.face, alt: 'Wax applied to facial hair near the cheek', caption: 'Facial waxing · illustrative photograph' },
  ],
};
// Livia's own skin-treatment photos (Nov 2026). When a treatment is listed
// here, only these photos are shown for it.
const skinRoot = `${import.meta.env?.BASE_URL || '/'}assets/bella/skin-2026-11`;
const LIVIA_SKIN_PHOTOS: Record<string, TreatmentPhoto[]> = {
  'microneedling': [
    { src: `${skinRoot}/microneedling-01.webp`, alt: 'Livia Rego performing microneedling at Bella Beauty Brazil', caption: 'Microneedling · Bella Beauty Brazil' },
  ],
  'deluxe-facial': [
    { src: `${skinRoot}/deluxe-facial-01.webp`, alt: 'Deluxe Facial at Bella Beauty Brazil — facial massage, cleansing and LED light mask', caption: 'Deluxe Facial · Bella Beauty Brazil' },
  ],
};
export const serviceGalleryFor = (serviceId: string): TreatmentGallery => {
  if (LIVIA_SKIN_PHOTOS[serviceId]) return {photos:LIVIA_SKIN_PHOTOS[serviceId],illustrative:false};
  // Lash Tint and Lash Extension Removal are shown without photos (Livia, Nov 2026).
  if (serviceId === 'lash-tint' || serviceId === 'lash-extension-removal') return {photos:[],illustrative:false};
  const folder = exactFolderByService[serviceId];
  if(folder)return {photos:serviceId === 'shadow-hybrid' ? dyeReferencePhotos : PHOTO_FOLDERS[folder],illustrative:false};
  if(newerFolderLabels[serviceId])return {photos:newerFolderLabels[serviceId],illustrative:false};
  return {photos:supplementary[serviceId]||[],illustrative:Boolean(supplementary[serviceId])};
};
export const servicePhotosFor=(serviceId:string):TreatmentPhoto[] => serviceGalleryFor(serviceId).photos;
export const categoryPhotosFor=(category:'skin-treatments-geral'|'lip-treatments-geral')=>PHOTO_FOLDERS[category];
