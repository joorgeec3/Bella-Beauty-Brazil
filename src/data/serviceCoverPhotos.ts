import { siteImages, siteAsset } from './siteImages';
import { getServicePhotos } from '../components/ServicePhotoGallery';

// 'specific' means the supplied photo is from the named treatment itself.
// A photo of a related technique must never be presented as proof of that specific treatment.
export type ServiceCover = { src: string; specific: boolean };
const approved = (path: string, specific = false): ServiceCover => ({ src: siteAsset(path), specific });
const family = (id: string): ServiceCover | undefined => {
  const img = getServicePhotos(id)[0]?.src;
  return img ? { src: img, specific: true } : undefined;
};
const covers: Record<string, ServiceCover> = {
  'cosmetic-tattoo-removal': approved('assets/bella/client-2026-10-v3/tattoo-removal/tattoo-removal-cover.webp', true),
  'shadow-hybrid': approved('assets/bella/client-2026-10-v3/brow-dye/brow-dye-cover.webp'),
  'classic-eyelashes': approved('assets/bella/client-2026-10-v3/lash-extensions/lash-extensions-cover.webp'),
  'hybrid-eyelashes': approved('assets/bella/client-2026-10-v3/lash-extensions/lash-extensions-cover.webp'),
  'wet-look-lashes': approved('assets/bella/client-2026-10-v3/lash-extensions/lash-extensions-cover.webp'),
  'russian-volume': approved('assets/bella/client-2026-10-v3/lash-extensions/lash-extensions-cover.webp'),
  'lash-extension-removal': approved('assets/bella/client-2026-10-v3/lash-extensions/lash-extensions-cover.webp'),
  'lash-lift-only': { src: getServicePhotos('lash-lift')[0]!.src, specific: false },
  'lash-tint': { src: getServicePhotos('lash-lift')[1]!.src, specific: false },
  'dreamy-brows': { src: getServicePhotos('brow-sculpt')[0]!.src, specific: false },
  'microneedling': { src: getServicePhotos('facial-spa')[0]!.src, specific: false },
  'deluxe-facial': { src: getServicePhotos('facial-spa')[1]!.src, specific: false },
  'grow-up-hair-brows': { src: getServicePhotos('brow-sculpt')[1]!.src, specific: false },
  'grow-up-hair-scalp': { src: siteImages.aboutMe.treatmentRoom, specific: false },
};
export const serviceCoverFor = (serviceId: string): ServiceCover | undefined => family(serviceId) || covers[serviceId];
