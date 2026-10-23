import { siteImages } from './siteImages';
// Sources: Site Bella.zip and the client's later "fotos site bella.rar".
 // RAR review (2026-10-22) explicitly identifies the previously generic lip
 // photos as Lip Hydration and the facial folder as Facial/Dermaplaning.
 // Keep all previously verified, correctly assigned treatment collections intact.
 // Do not copy assets, fabricate results, or reuse a photo in multiple services.
export type TreatmentPhoto = { src: string; alt: string; caption: string };
export type TreatmentGallery = { photos: TreatmentPhoto[]; illustrative: boolean };
const root = `${import.meta.env.BASE_URL}assets/bella/media-alinhada-2026-10`;
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
  // The new RAR explicitly names "Lip Hydration treatment"; only rename
  // captions here. Source images are unchanged, not copied or repeated.
  'lip-bliss-hydration': labelledPhotos(PHOTO_FOLDERS['lip-treatments-geral'], 'Lip Bliss Hydration'),
  // The RAR labels this folder Facial/Dermaplaning; individual source photos
  // were visually checked before assigning the procedure-specific ones.
  'dermaplaning': labelledPhotos(PHOTO_FOLDERS['skin-treatments-geral'].slice(1, 3), 'Dermaplaning'),
  'facial-spa': labelledPhotos([PHOTO_FOLDERS['skin-treatments-geral'][0]], 'Facial Spa'),
  // This real screenshot is from the uniquely labelled DREAM BROW massage video,
  // not a generic Brow Sculpt photo and not a cosmetic tattoo result.
  'dreamy-brows': [{
    src: `${import.meta.env.BASE_URL}assets/bella/media-rar-review-2026-10/dreamy-brows-cover.webp`,
    alt: 'Dreamy Brows head and face massage — still from the client-supplied Dream Brow video',
    caption: 'Dreamy Brows · Treatment demonstration',
  }],
};
// The photo of Livia with wax equipment is in the homepage/founder gallery.
// The new axilla photograph was provided separately in attachments.zip.
// It is an illustrative waxing photo, not a verified before/after client result.
const supplementary: Record<string,TreatmentPhoto[]> = {
  waxing: [{
    src: siteImages.waxingPhotos.underarms,
    alt: 'Professional waxing demonstration: a spatula applying wax to an underarm',
    caption: 'Underarm waxing · representative photograph',
  }],
};
export const serviceGalleryFor = (serviceId: string): TreatmentGallery => {
  const folder = exactFolderByService[serviceId];
  if(folder)return {photos:PHOTO_FOLDERS[folder],illustrative:serviceId==='shadow-hybrid'};
  if(newerFolderLabels[serviceId])return {photos:newerFolderLabels[serviceId],illustrative:false};
  return {photos:supplementary[serviceId]||[],illustrative:serviceId === 'waxing'};
};
export const servicePhotosFor=(serviceId:string):TreatmentPhoto[] => serviceGalleryFor(serviceId).photos;
export const categoryPhotosFor=(category:'skin-treatments-geral'|'lip-treatments-geral')=>PHOTO_FOLDERS[category];
