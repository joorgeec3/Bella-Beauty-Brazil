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
// The source folder only says "Lash Extensions". Its three photographs cannot
// verify a particular Classic, Hybrid, or Wet Look technique. Reserve a distinct
// representative photo per page, instead of repeating all three on every page.
const lashIllustrationByService: Record<string,TreatmentPhoto[]> = {
  'classic-eyelashes': [PHOTO_FOLDERS['lash-extensions'][0]],
  'hybrid-eyelashes': [PHOTO_FOLDERS['lash-extensions'][1]],
  'wet-look-lashes': [PHOTO_FOLDERS['lash-extensions'][2]],
};
const newerFolderLabels: Record<string,TreatmentPhoto[]> = {
  // The new RAR explicitly names "Lip Hydration treatment", matching these
  // existing photos from the old generic "lip tretments" folder (no reuploads).
  'lip-bliss-hydration': PHOTO_FOLDERS['lip-treatments-geral'],
  // The original general skin folder contains two verified dermaplaning
  // procedure close-ups and one separate facial-treatment collage.
  'dermaplaning': PHOTO_FOLDERS['skin-treatments-geral'].slice(1, 3),
  'facial-spa': [PHOTO_FOLDERS['skin-treatments-geral'][0]],
  // This real screenshot is from the uniquely labelled DREAM BROW massage video,
  // not a generic Brow Sculpt photo and not a cosmetic tattoo result.
  'dreamy-brows': [{
    src: `${import.meta.env.BASE_URL}assets/bella/media-rar-review-2026-10/dreamy-brows-cover.webp`,
    alt: 'Dreamy Brows head and face massage — still from the client-supplied Dream Brow video',
    caption: 'Dreamy Brows · Treatment demonstration',
  }],
};
const supplementary: Record<string,TreatmentPhoto[]> = {
  waxing: [{
    src:siteImages.client.waxingTreatment,
    alt:'Waxing procedure photo previously approved by Bella Beauty Brazil',
    caption:'Waxing · Existing studio photograph',
  }],
};
export const serviceGalleryFor = (serviceId: string): TreatmentGallery => {
  const folder = exactFolderByService[serviceId];
  if(folder)return {photos:PHOTO_FOLDERS[folder],illustrative:serviceId==='shadow-hybrid'};
  if(lashIllustrationByService[serviceId])return {photos:lashIllustrationByService[serviceId],illustrative:true};
  if(newerFolderLabels[serviceId])return {photos:newerFolderLabels[serviceId],illustrative:false};
  return {photos:supplementary[serviceId]||[],illustrative:false};
};
export const servicePhotosFor=(serviceId:string):TreatmentPhoto[] => serviceGalleryFor(serviceId).photos;
export const categoryPhotosFor=(category:'skin-treatments-geral'|'lip-treatments-geral')=>PHOTO_FOLDERS[category];
