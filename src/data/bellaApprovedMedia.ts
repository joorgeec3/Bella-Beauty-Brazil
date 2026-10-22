import { siteImages } from './siteImages';

// Approved source: Site Bella.zip, preserving each original folder exactly.
// Generic folders never become evidence of a named procedure.
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
  return {photos:supplementary[serviceId]||[],illustrative:false};
};
export const servicePhotosFor=(serviceId:string):TreatmentPhoto[] => serviceGalleryFor(serviceId).photos;
export const categoryPhotosFor=(category:'skin-treatments-geral'|'lip-treatments-geral')=>PHOTO_FOLDERS[category];
